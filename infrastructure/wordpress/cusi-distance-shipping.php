<?php
/**
 * Plugin Name: CUSI distance delivery
 * Description: Configurable 400 MXN base plus road kilometers from the Lomas boutique.
 */
defined('ABSPATH') || exit;
require_once __DIR__ . '/cusi-distance-pricing.php';

function cusi_distance_settings(): array {
    return [
        'enabled' => get_option('cusi_distance_enabled', 'no') === 'yes',
        'origin' => trim((string) get_option('cusi_distance_origin', 'Bosques de Robles 32, Lomas de Chapultepec, Ciudad de México, México')),
        'rate' => (string) get_option('cusi_distance_rate', ''),
        'scope' => (string) get_option('cusi_distance_scope', 'outside_cdmx'),
        'included_km' => (string) get_option('cusi_distance_included_km', '0'),
        'api_key' => trim((string) get_option('cusi_distance_api_key', '')),
    ];
}

function cusi_distance_meters(array $destination, array $settings) {
    if (!$settings['api_key'] || !$settings['origin']) {
        return new WP_Error('cusi_distance_configuration', 'El cálculo de envío aún no está configurado.');
    }
    foreach (['address', 'city', 'postcode', 'state'] as $field) {
        if (empty($destination[$field])) {
            return new WP_Error('cusi_distance_address', 'Completa la dirección de entrega para calcular el envío.');
        }
    }
    $states = WC()->countries->get_states('MX');
    if (!isset($states[$destination['state']])) {
        return new WP_Error('cusi_distance_state', 'Selecciona un estado válido para la entrega.');
    }
    $address = implode(', ', [
        $destination['address'], $destination['city'],
        $states[$destination['state']], $destination['postcode'], 'México',
    ]);
    // Neither the address nor the API key appears in cache names or public checkout data.
    $cache_key = 'cusi_route_' . hash_hmac('sha256', $settings['origin'] . '|' . $address . '|' . $settings['api_key'], wp_salt('auth'));
    $cached = get_transient($cache_key);
    if (is_int($cached) && $cached >= 0) {
        return $cached;
    }
    $response = wp_remote_post('https://routes.googleapis.com/directions/v2:computeRoutes', [
        'timeout' => 10,
        'redirection' => 0,
        'headers' => [
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => $settings['api_key'],
            'X-Goog-FieldMask' => 'routes.distanceMeters',
        ],
        'body' => wp_json_encode([
            'origin' => ['address' => $settings['origin']],
            'destination' => ['address' => $address],
            'travelMode' => 'DRIVE',
            'routingPreference' => 'TRAFFIC_UNAWARE',
            'computeAlternativeRoutes' => false,
            'units' => 'METRIC',
            'languageCode' => 'es-MX',
        ]),
    ]);
    if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
        return new WP_Error('cusi_distance_unavailable', 'No pudimos calcular la ruta. Revisa la dirección de entrega o contacta a CUSI.');
    }
    $data = json_decode(wp_remote_retrieve_body($response), true);
    $meters = $data['routes'][0]['distanceMeters'] ?? null;
    if (!is_int($meters) || $meters < 0) {
        return new WP_Error('cusi_distance_no_route', 'No encontramos una ruta a esa dirección.');
    }
    set_transient($cache_key, $meters, 15 * MINUTE_IN_SECONDS);
    return $meters;
}

add_filter('woocommerce_package_rates', static function ($rates, $package) {
    $settings = cusi_distance_settings();
    if (!$settings['enabled']) {
        return $rates;
    }
    $destination = $package['destination'] ?? [];
    if (($destination['country'] ?? '') !== 'MX' || empty($destination['state'])) {
        return [];
    }
    $flat = array_filter($rates, static fn ($rate) => $rate->get_method_id() === 'flat_rate');
    if (!$flat) {
        return [];
    }
    $rate = clone reset($flat);
    $rate->set_taxes([]);
    if (!in_array($settings['scope'], ['radius', 'outside_cdmx'], true)) {
        return [];
    }
    if ($destination['state'] === 'DF' && $settings['scope'] === 'outside_cdmx') {
        $rate->set_cost(400);
        $rate->set_label('Envío a domicilio — CDMX');
    } else {
        if (!is_numeric($settings['rate']) || (float) $settings['rate'] <= 0 || !is_numeric($settings['included_km']) || (float) $settings['included_km'] < 0) {
            return [];
        }
        $meters = cusi_distance_meters($destination, $settings);
        // Never let an API failure or incomplete address turn into a 400 MXN outside-city quote.
        if (is_wp_error($meters)) {
            return [];
        }
        $per_km_minor = (int) round((float) $settings['rate'] * 100);
        if ($per_km_minor <= 0) {
            return [];
        }
        try {
            $minor = cusi_distance_price_minor($meters, $per_km_minor, (int) round((float) $settings['included_km'] * 1000));
        } catch (InvalidArgumentException $error) {
            return [];
        }
        $km = number_format_i18n($meters / 1000, 3);
        $rate->set_cost($minor / 100);
        $label = $settings['scope'] === 'radius' ? 'Envío desde Lomas' : 'Envío fuera de CDMX';
        $rate->set_label($label . ' — ' . $km . ' km desde la boutique');
        $rate->add_meta_data('Distancia desde Lomas (km)', $meters / 1000);
        $rate->add_meta_data('Base de envío (MXN)', '400.00');
        $rate->add_meta_data('Kilómetros incluidos', $settings['included_km']);
        $rate->add_meta_data('Tarifa por km (MXN)', number_format($per_km_minor / 100, 2, '.', ''));
    }
    return [$rate->get_id() => $rate];
}, 100, 2);

add_filter('woocommerce_get_sections_shipping', static function ($sections) {
    $sections['cusi_distance'] = 'CUSI — Envíos por distancia';
    return $sections;
});
add_filter('woocommerce_get_settings_shipping', static function ($settings, $section) {
    if ($section !== 'cusi_distance') {
        return $settings;
    }
    return [
        ['type' => 'title', 'id' => 'cusi_distance', 'title' => 'Envíos desde Lomas', 'desc' => '400 MXN de base + kilómetros por carretera no incluidos × tarifa/km. El total se calcula antes del pago.'],
        ['type' => 'text', 'id' => 'cusi_distance_origin', 'title' => 'Dirección de salida', 'default' => 'Bosques de Robles 32, Lomas de Chapultepec, Ciudad de México, México', 'css' => 'width: 600px;'],
        ['type' => 'select', 'id' => 'cusi_distance_scope', 'title' => 'Aplicar cálculo', 'default' => 'outside_cdmx', 'options' => ['radius' => 'Desde la boutique, incluyendo destinos en CDMX', 'outside_cdmx' => 'Solo fuera de CDMX; CDMX se mantiene en 400 MXN']],
        ['type' => 'number', 'id' => 'cusi_distance_included_km', 'title' => 'Kilómetros incluidos en los 400 MXN', 'default' => '0', 'custom_attributes' => ['min' => '0', 'step' => '0.1']],
        ['type' => 'price', 'id' => 'cusi_distance_rate', 'title' => 'Tarifa por km (MXN)', 'default' => '', 'desc' => 'Importe final por kilómetro de trayecto de ida, sin IVA adicional.'],
        ['type' => 'password', 'id' => 'cusi_distance_api_key', 'title' => 'Google Routes API key', 'default' => '', 'desc' => 'Clave del servidor con Routes API habilitada. Se guarda únicamente en WordPress.'],
        ['type' => 'checkbox', 'id' => 'cusi_distance_enabled', 'title' => 'Cálculo automático', 'default' => 'no', 'desc' => 'Activar después de configurar la tarifa/km y conectar Google Routes API. Si no se puede calcular una ruta fuera de CDMX, no se ofrece un importe incorrecto.'],
        ['type' => 'sectionend', 'id' => 'cusi_distance'],
    ];
}, 10, 2);
foreach (['cusi_distance_origin', 'cusi_distance_rate', 'cusi_distance_scope', 'cusi_distance_included_km', 'cusi_distance_api_key', 'cusi_distance_enabled'] as $option) {
    foreach (['add_option_', 'update_option_', 'delete_option_'] as $event) {
        add_action($event . $option, static function () {
            if (class_exists('WC_Cache_Helper')) {
                WC_Cache_Helper::get_transient_version('shipping', true);
            }
        });
    }
}
add_filter('pre_update_option_cusi_distance_enabled', static function ($value) {
    $settings = cusi_distance_settings();
    if ($value === 'yes' && (!$settings['origin'] || !$settings['api_key'] || !is_numeric($settings['rate']) || (float) $settings['rate'] < 0.01 || !is_numeric($settings['included_km']) || (float) $settings['included_km'] < 0 || !in_array($settings['scope'], ['radius', 'outside_cdmx'], true))) {
        if (class_exists('WC_Admin_Settings')) {
            WC_Admin_Settings::add_error('Configure la dirección de salida, la tarifa/km y la clave de Google Routes antes de activar el cálculo.');
        }
        return 'no';
    }
    return $value;
});
