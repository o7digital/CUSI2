<?php
// Run only inside the isolated WordPress development container.
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev') {
    throw new RuntimeException('Restricted to the isolated CUSI development database.');
}
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$products = [
    [
        'slug' => 'canasto-con-nochebuenas-premium',
        'title' => 'Canasto con Nochebuenas Premium',
        'image' => 'canasto-nochebuenas-premium.webp',
        'alt' => 'Canasto con nochebuenas rojas y moño rojo con detalles dorados',
        'description' => 'Nochebuenas rojas en canasto con moño rojo y detalles dorados. Disponible en cuatro tamaños para celebrar la Navidad.',
        'sizes' => [
            ['code' => 'E Gde', 'height' => 80, 'diameter' => 60, 'price' => 3000],
            ['code' => 'Gde', 'height' => 65, 'diameter' => 55, 'price' => 2500],
            ['code' => 'Med', 'height' => 55, 'diameter' => 45, 'price' => 2225],
            ['code' => 'Ch', 'height' => 45, 'diameter' => 45, 'price' => 1530],
        ],
    ],
    [
        'slug' => 'maceta-de-barro-con-nochebuena-premium',
        'title' => 'Maceta de Barro con Nochebuena Premium',
        'image' => 'maceta-barro-nochebuena-premium.webp',
        'alt' => 'Nochebuena roja premium en maceta de barro',
        'description' => 'Nochebuena roja premium en maceta de barro para celebrar la Navidad.',
        'sizes' => [
            ['code' => 'Ch', 'height' => 35, 'diameter' => 30, 'price' => 1500],
        ],
    ],
];

foreach ($products as $product) {
    $existing = get_page_by_path($product['slug'], OBJECT, 'cusi_navidad');
    if ($existing) {
        echo json_encode(['id' => $existing->ID, 'already_exists' => true]) . PHP_EOL;
        continue;
    }
    $image = media_handle_sideload([
        'name' => $product['image'],
        'tmp_name' => '/tmp/' . $product['image'],
    ], 0, $product['title']);
    if (is_wp_error($image)) {
        throw new RuntimeException($image->get_error_message());
    }
    update_post_meta($image, '_wp_attachment_image_alt', $product['alt']);

    $post_id = wp_insert_post([
        'post_type' => 'cusi_navidad',
        'post_status' => 'publish',
        'post_name' => $product['slug'],
        'post_title' => $product['title'],
        'post_content' => '<!-- wp:paragraph --><p>' . esc_html($product['description']) . '</p><!-- /wp:paragraph -->',
    ], true);
    if (is_wp_error($post_id)) {
        throw new RuntimeException($post_id->get_error_message());
    }
    set_post_thumbnail($post_id, $image);
    update_post_meta($post_id, 'cusi_sizes', $product['sizes']);
    echo json_encode(['id' => $post_id, 'image_id' => $image, 'sizes' => get_post_meta($post_id, 'cusi_sizes', true)]) . PHP_EOL;
}
