<?php
// Real upload pipeline checks in the isolated CUSI dev database only.
if (PHP_SAPI !== 'cli') exit(1);
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev') {
    throw new RuntimeException('Media fixtures are restricted to the isolated CUSI dev shop.');
}
require_once ABSPATH . 'wp-admin/includes/image.php';
if (!class_exists('Cusi_Media_Optimizer')) throw new RuntimeException('Install the optimizer first.');
function media_check($ok, $message) {
    if (!$ok) throw new RuntimeException($message);
    echo 'PASS ' . $message . PHP_EOL;
}
$dir = wp_get_upload_dir()['basedir'] . '/cusi-media-test-' . bin2hex(random_bytes(6));
wp_mkdir_p($dir);
$ids = [];
try {
    foreach (['jpeg', 'png'] as $format) {
        $file = $dir . '/upload.' . ($format === 'jpeg' ? 'jpg' : 'png');
        $image = imagecreatetruecolor($format === 'jpeg' ? 2200 : 180, $format === 'jpeg' ? 1700 : 180);
        if ($format === 'png') {
            imagealphablending($image, false);
            imagesavealpha($image, true);
            imagefill($image, 0, 0, imagecolorallocatealpha($image, 0, 0, 0, 127));
            imagefilledrectangle($image, 50, 50, 130, 130, imagecolorallocatealpha($image, 180, 20, 50, 0));
            imagepng($image, $file);
        } else {
            for ($y = 0; $y < 1700; $y++) {
                imageline($image, 0, $y, 2199, $y, imagecolorallocate($image, $y % 256, 110, 150));
            }
            imagejpeg($image, $file, 95);
        }
        $hash = hash_file('sha256', $file);
        media_check(wp_get_image_editor($file) instanceof WP_Image_Editor_GD, $format . ' uses the memory-bounded GD editor');
        $id = wp_insert_attachment(['post_title' => 'CUSI temporary image test', 'post_mime_type' => 'image/' . $format, 'post_status' => 'inherit'], $file, 0, true);
        if (is_wp_error($id)) throw new RuntimeException($id->get_error_message());
        $ids[] = $id;
        update_post_meta($id, '_wp_attachment_image_alt', 'Preserved CUSI photo alt');
        // The same generation/update sequence used by WP uploads and sideloads.
        wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $file));
        $current = get_attached_file($id);
        media_check(get_post_mime_type($id) === 'image/webp' && wp_get_image_mime($current) === 'image/webp', $format . ' upload automatically becomes WebP');
        $meta = wp_get_attachment_metadata($id);
        media_check(max($meta['width'], $meta['height']) <= 1600, $format . ' dimensions are bounded without cropping');
        media_check(hash_file('sha256', $file) === $hash, $format . ' original is preserved byte for byte');
        media_check(get_post_meta($id, '_wp_attachment_image_alt', true) === 'Preserved CUSI photo alt', $format . ' attachment identity and alt are preserved');
        media_check(str_ends_with(wp_get_attachment_url($id), '.webp'), $format . ' attachment URL uses the compressed file');
        foreach ($meta['sizes'] as $size) {
            media_check(is_file(dirname($current) . '/' . $size['file']) && $size['mime-type'] === 'image/webp', $format . ' thumbnail ' . $size['file'] . ' exists as WebP');
        }
        $count = count(glob($dir . '/*'));
        $again = Cusi_Media_Optimizer::optimize($id);
        media_check(!is_wp_error($again) && $again['status'] === 'already_optimized' && count(glob($dir . '/*')) === $count, $format . ' repeat run creates no duplicates');
        if ($format === 'png') {
            $decoded = imagecreatefromwebp($current);
            media_check((imagecolorat($decoded, 0, 0) >> 24) >= 120, 'PNG transparency survives WebP conversion');
        }
        $backup = get_post_meta($id, '_cusi_media_original', true);
        media_check($backup['mime'] === 'image/' . $format && !empty($backup['metadata']), $format . ' restoration metadata is recorded');
    }
    $missing = wp_insert_attachment(['post_title' => 'CUSI temporary missing image', 'post_mime_type' => 'image/png', 'post_status' => 'inherit'], $dir . '/missing.png');
    $ids[] = $missing;
    $result = Cusi_Media_Optimizer::optimize($missing);
    media_check(is_wp_error($result) && $result->get_error_code() === 'cusi_source' && get_post_mime_type($missing) === 'image/png', 'missing images fail without changing the attachment');

    $failure_file = $dir . '/conversion-failure.jpg';
    copy($dir . '/upload.jpg', $failure_file);
    $failure_id = wp_insert_attachment(['post_title' => 'CUSI temporary failure test', 'post_mime_type' => 'image/jpeg', 'post_status' => 'inherit'], $failure_file);
    $ids[] = $failure_id;
    $initial = ['file' => _wp_relative_upload_path($failure_file), 'width' => 2200, 'height' => 1700, 'sizes' => [], 'image_meta' => []];
    wp_update_attachment_metadata($failure_id, $initial);
    $fail_metadata = static function ($meta, $id) use ($failure_id) { return $id === $failure_id ? [] : $meta; };
    add_filter('wp_generate_attachment_metadata', $fail_metadata, 99, 2);
    $failed = Cusi_Media_Optimizer::optimize($failure_id);
    remove_filter('wp_generate_attachment_metadata', $fail_metadata, 99);
    media_check(is_wp_error($failed) && $failed->get_error_code() === 'cusi_conversion', 'invalid generated metadata triggers a recoverable failure');
    media_check(get_attached_file($failure_id) === $failure_file && get_post_mime_type($failure_id) === 'image/jpeg' && wp_get_attachment_metadata($failure_id) === $initial, 'failure restores the original file, MIME type and metadata');
    wp_update_attachment_metadata($failure_id, array_merge($initial, ['file' => _wp_relative_upload_path($dir . '/interrupted-cusi.webp')]));
    $resumed = Cusi_Media_Optimizer::optimize($failure_id);
    media_check(!is_wp_error($resumed) && $resumed['status'] === 'optimized' && get_post_meta($failure_id, '_cusi_media_original', true)['metadata'] === $initial, 'resuming an interrupted conversion repairs partial metadata and keeps the original backup');
    echo 'All real WordPress media checks passed.' . PHP_EOL;
} finally {
    foreach ($ids as $id) wp_delete_attachment($id, true);
    foreach (glob($dir . '/*') as $file) if (is_file($file)) unlink($file);
    rmdir($dir);
}
