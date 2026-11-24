<?php
/**
 * Plugin Name: CUSI — Optimización de fotografías
 * Description: Serves lightweight WebP photos and keeps the original files and attachment IDs.
 */

defined('ABSPATH') || exit;

final class Cusi_Media_Optimizer {
    private static $running = [];

    private static function animated($path, $mime) {
        $stream = fopen($path, 'rb');
        if (!$stream) return true;
        try {
            if ($mime === 'image/webp') {
                $header = fread($stream, 21);
                return strlen($header) === 21 && substr($header, 12, 4) === 'VP8X' && (ord($header[20]) & 2);
            }
            if ($mime === 'image/png') {
                fseek($stream, 8);
                while (!feof($stream)) {
                    $header = fread($stream, 8);
                    if (strlen($header) !== 8) break;
                    $type = substr($header, 4);
                    if ($type === 'acTL') return true;
                    if ($type === 'IDAT' || $type === 'IEND') break;
                    $length = unpack('Nlength', substr($header, 0, 4))['length'];
                    if (fseek($stream, $length + 4, SEEK_CUR) !== 0) break;
                }
            }
            return false;
        } finally { fclose($stream); }
    }

    public static function metadata($metadata, $id) {
        if (isset(self::$running[$id])) return $metadata;
        $result = self::optimize($id, $metadata);
        if (is_wp_error($result)) {
            error_log('CUSI image optimization failed for attachment ' . (int) $id . ': ' . $result->get_error_code());
            return $metadata;
        }
        return $result['metadata'] ?? $metadata;
    }

    public static function optimize($id, $metadata = null) {
        if (isset(self::$running[$id])) return ['status' => 'busy'];
        $post = get_post($id);
        if (!$post || $post->post_type !== 'attachment') return new WP_Error('cusi_attachment', 'Not an attachment.');
        $source = get_attached_file($id);
        $metadata = $metadata ?? wp_get_attachment_metadata($id);
        $mime = get_post_mime_type($id);
        if (!in_array($mime, ['image/jpeg', 'image/png', 'image/webp'], true)) return ['status' => 'skipped'];
        $uploads = wp_get_upload_dir();
        $real = $source ? realpath($source) : false;
        $root = realpath($uploads['basedir']);
        if (!$real || !$root || !str_starts_with($real, $root . DIRECTORY_SEPARATOR) || !is_readable($real)) {
            return new WP_Error('cusi_source', 'Image is missing or outside uploads.');
        }
        $source = $real;
        $previous = get_post_meta($id, '_cusi_media_optimized', true);
        if (is_array($previous) && ($previous['file'] ?? '') === get_post_meta($id, '_wp_attached_file', true)) {
            return ['status' => 'already_optimized'];
        }
        $dimensions = wp_getimagesize($source);
        if (!$dimensions) return new WP_Error('cusi_dimensions', 'Invalid image.');
        // Animated WebP and APNG must retain their animation; GIF and SVG are excluded above.
        if (self::animated($source, $mime)) return ['status' => 'animated'];
        if ($mime === 'image/webp' && filesize($source) <= 300 * 1024 && max($dimensions[0], $dimensions[1]) <= 1600) {
            return ['status' => 'already_lightweight'];
        }
        if (!wp_image_editor_supports(['mime_type' => 'image/webp'])) return new WP_Error('cusi_webp', 'WebP is unsupported.');

        $lock = fopen(sys_get_temp_dir() . '/cusi-media-' . md5($root) . '-' . (int) $id . '.lock', 'c');
        if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) {
            if ($lock) fclose($lock);
            return new WP_Error('cusi_busy', 'Image is being optimized.');
        }
        self::$running[$id] = true;
        $before = ['file' => get_post_meta($id, '_wp_attached_file', true), 'metadata' => $metadata, 'mime' => $mime];
        $mutated = false;
        try {
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $editor = wp_get_image_editor($source);
            if (is_wp_error($editor)) return $editor;
            if (max($dimensions[0], $dimensions[1]) > 1600) {
                $resized = $editor->resize(1600, 1600, false);
                if (is_wp_error($resized)) return $resized;
            }
            $editor->set_quality(80);
            $filename = wp_unique_filename(dirname($source), pathinfo($source, PATHINFO_FILENAME) . '-cusi.webp');
            $saved = $editor->save(dirname($source) . '/' . $filename, 'image/webp');
            if (is_wp_error($saved)) return $saved;
            $target = $saved['path'];
            clearstatcache(true, $target);
            // Small, already efficient JPEGs need no recompression.
            if (filesize($target) >= filesize($source) && max($dimensions[0], $dimensions[1]) <= 1600) {
                wp_delete_file($target);
                return ['status' => 'already_lightweight'];
            }
            if (filesize($target) > 300 * 1024) {
                $editor->set_quality(72);
                $retry = $editor->save($target, 'image/webp');
                if (is_wp_error($retry)) return $retry;
                clearstatcache(true, $target);
            }
            // Retain a restorable record before WP writes intermediate size metadata.
            if (!metadata_exists('post', $id, '_cusi_media_original')) {
                if (!add_post_meta($id, '_cusi_media_original', $before, true)) {
                    return new WP_Error('cusi_backup', 'Unable to preserve image metadata.');
                }
            }
            $mutated = true;
            $generated = wp_generate_attachment_metadata($id, $target);
            if (empty($generated['file']) || empty($generated['width']) || empty($generated['height'])) {
                throw new RuntimeException('Unable to generate WebP metadata.');
            }
            foreach ($generated['sizes'] ?? [] as $size) {
                $path = dirname($target) . '/' . $size['file'];
                if (!is_file($path) || wp_get_image_mime($path) !== 'image/webp') {
                    throw new RuntimeException('Invalid WebP thumbnail.');
                }
            }
            $generated['original_image'] = $metadata['original_image'] ?? basename($source);
            if (isset($metadata['image_meta'])) $generated['image_meta'] = $metadata['image_meta'];
            $updated = wp_update_post(['ID' => $id, 'post_mime_type' => 'image/webp'], true);
            if (is_wp_error($updated) || !update_attached_file($id, $target)) {
                throw new RuntimeException('Unable to update attachment.');
            }
            wp_update_attachment_metadata($id, $generated);
            if (get_post_meta($id, '_wp_attachment_metadata', true) !== $generated) {
                throw new RuntimeException('Unable to save WebP metadata.');
            }
            $stats = ['file' => $generated['file'], 'before_bytes' => filesize($source), 'after_bytes' => filesize($target), 'version' => 1];
            update_post_meta($id, '_cusi_media_optimized', $stats);
            return ['status' => 'optimized', 'metadata' => $generated] + $stats;
        } catch (Throwable $error) {
            if ($mutated) {
                update_post_meta($id, '_wp_attached_file', $before['file']);
                update_post_meta($id, '_wp_attachment_metadata', $before['metadata']);
                wp_update_post(['ID' => $id, 'post_mime_type' => $before['mime']]);
            }
            return new WP_Error('cusi_conversion', $error->getMessage());
        } finally {
            unset(self::$running[$id]);
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }
}

add_filter('wp_generate_attachment_metadata', ['Cusi_Media_Optimizer', 'metadata'], 20, 2);
add_filter('wp_editor_set_quality', static function ($quality, $mime) {
    return $mime === 'image/webp' ? min(80, $quality) : $quality;
}, 20, 2);
