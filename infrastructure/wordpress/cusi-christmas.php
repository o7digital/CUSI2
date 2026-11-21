<?php
/**
 * Plugin Name: CUSI — Colección de Navidad
 * Description: Editable seasonal products for the isolated development website.
 */

add_action('init', static function () {
    register_post_type('cusi_navidad', [
        'labels' => [
            'name' => 'Colección de Navidad',
            'singular_name' => 'Producto de Navidad',
            'add_new_item' => 'Añadir producto de Navidad',
            'edit_item' => 'Editar producto de Navidad',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'rest_base' => 'cusi-navidad',
        'menu_icon' => 'dashicons-palmtree',
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    ]);

    register_post_meta('cusi_navidad', 'cusi_sizes', [
        'type' => 'array',
        'single' => true,
        'show_in_rest' => ['schema' => [
            'type' => 'array',
            'items' => [
                'type' => 'object',
                'properties' => [
                    'code' => ['type' => 'string'],
                    'height' => ['type' => 'number', 'minimum' => 1],
                    'diameter' => ['type' => 'number', 'minimum' => 1],
                    'price' => ['type' => 'number', 'minimum' => 1],
                ],
                'required' => ['code', 'height', 'diameter', 'price'],
                'additionalProperties' => false,
            ],
        ]],
        'auth_callback' => static function ($allowed, $key, $post_id) {
            return current_user_can('edit_post', $post_id);
        },
    ]);
});

add_action('add_meta_boxes_cusi_navidad', static function () {
    add_meta_box('cusi_sizes', 'Tamaños y precios (MXN)', static function ($post) {
        wp_nonce_field('cusi_save_sizes', 'cusi_sizes_nonce');
        $sizes = get_post_meta($post->ID, 'cusi_sizes', true);
        if (!is_array($sizes) || !$sizes) {
            $sizes = array_map(static function ($code) {
                return ['code' => $code, 'height' => '', 'diameter' => '', 'price' => ''];
            }, ['E Gde', 'Gde', 'Med', 'Ch']);
        }
        echo '<p>Precios finales en pesos mexicanos. Dimensiones en centímetros.</p>';
        echo '<table class="widefat"><thead><tr><th>Tamaño</th><th>Altura (cm)</th><th>Diámetro (cm)</th><th>Precio (MXN)</th></tr></thead><tbody>';
        foreach ($sizes as $index => $size) {
            echo '<tr>';
            foreach (['code', 'height', 'diameter', 'price'] as $field) {
                $type = $field === 'code' ? 'text' : 'number';
                echo '<td><input style="width:100%" type="' . esc_attr($type) . '" name="cusi_sizes[' . (int) $index . '][' . esc_attr($field) . ']" value="' . esc_attr($size[$field] ?? '') . '" aria-label="' . esc_attr($field . ' ' . ($size['code'] ?? '')) . '"' . ($type === 'number' ? ' min="1" step="0.01"' : '') . ' required></td>';
            }
            echo '</tr>';
        }
        echo '</tbody></table>';
    }, 'cusi_navidad', 'normal', 'high');
});

add_action('save_post_cusi_navidad', static function ($post_id) {
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id) ||
        !current_user_can('edit_post', $post_id) ||
        !isset($_POST['cusi_sizes_nonce']) ||
        !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['cusi_sizes_nonce'])), 'cusi_save_sizes')) {
        return;
    }
    $submitted = isset($_POST['cusi_sizes']) && is_array($_POST['cusi_sizes']) ? wp_unslash($_POST['cusi_sizes']) : [];
    $sizes = [];
    foreach ($submitted as $row) {
        if (!is_array($row) || empty($row['code']) || !is_numeric($row['height'] ?? null) ||
            !is_numeric($row['diameter'] ?? null) || !is_numeric($row['price'] ?? null) ||
            (float) $row['height'] <= 0 || (float) $row['diameter'] <= 0 || (float) $row['price'] <= 0) {
            return;
        }
        $sizes[] = [
            'code' => sanitize_text_field($row['code']),
            'height' => (float) $row['height'],
            'diameter' => (float) $row['diameter'],
            'price' => round((float) $row['price'], 2),
        ];
    }
    if ($sizes) {
        update_post_meta($post_id, 'cusi_sizes', $sizes);
    }
});
