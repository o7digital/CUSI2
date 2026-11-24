<?php
// CLI only: dry-run by default; --apply converts images on either CUSI installation.
if (PHP_SAPI !== 'cli') exit(1);
// Production WooCommerce extensions exceed PHP CLI's default 128 MiB limit.
ini_set('memory_limit', '256M');
require '/var/www/html/wp-load.php';
if (!in_array(untrailingslashit(home_url()), ['https://wp-cusi.o7digitalgroup.com', 'https://wp-cusi.o7digitalgroup.com/dev'], true)) {
    throw new RuntimeException('Restricted to the two CUSI installations.');
}
if (!class_exists('Cusi_Media_Optimizer')) throw new RuntimeException('Install cusi-media-optimizer.php first.');
$apply = in_array('--apply', $argv, true);
$restore = in_array('--restore', $argv, true);
$ids = array_values(array_filter(array_slice($argv, 1), 'ctype_digit'));
if ($restore && (!$ids || $apply)) throw new RuntimeException('--restore requires explicit attachment IDs and cannot use --apply.');
$query = ['post_type' => 'attachment', 'post_status' => 'inherit', 'post_mime_type' => 'image', 'posts_per_page' => -1, 'orderby' => 'ID', 'order' => 'ASC'];
if ($ids) $query['post__in'] = array_map('intval', $ids);
$totals = ['optimized' => 0, 'skipped' => 0, 'errors' => 0, 'before_bytes' => 0, 'after_bytes' => 0];
foreach (get_posts($query) as $post) {
    $path = get_attached_file($post->ID);
    if ($restore) {
        $original = get_post_meta($post->ID, '_cusi_media_original', true);
        if (!$original || !is_file(wp_get_upload_dir()['basedir'] . '/' . $original['file'])) {
            throw new RuntimeException('Original image record or file is missing for ' . $post->ID);
        }
        wp_update_post(['ID' => $post->ID, 'post_mime_type' => $original['mime']]);
        update_post_meta($post->ID, '_wp_attached_file', $original['file']);
        wp_update_attachment_metadata($post->ID, $original['metadata']);
        delete_post_meta($post->ID, '_cusi_media_optimized');
        echo wp_json_encode(['id' => $post->ID, 'status' => 'restored']) . PHP_EOL;
        continue;
    }
    if (!$apply) {
        echo wp_json_encode(['id' => $post->ID, 'mime' => $post->post_mime_type, 'file' => basename($path), 'bytes' => is_file($path) ? filesize($path) : null]) . PHP_EOL;
        continue;
    }
    $result = Cusi_Media_Optimizer::optimize($post->ID);
    if (is_wp_error($result)) {
        $totals['errors']++;
        echo wp_json_encode(['id' => $post->ID, 'status' => 'error', 'reason' => $result->get_error_message()]) . PHP_EOL;
        continue;
    }
    unset($result['metadata']);
    $totals[$result['status'] === 'optimized' ? 'optimized' : 'skipped']++;
    $totals['before_bytes'] += $result['before_bytes'] ?? 0;
    $totals['after_bytes'] += $result['after_bytes'] ?? 0;
    echo wp_json_encode(['id' => $post->ID] + $result) . PHP_EOL;
}
echo wp_json_encode(['site' => home_url(), 'apply' => $apply, 'totals' => $totals]) . PHP_EOL;
exit($totals['errors'] ? 1 : 0);
