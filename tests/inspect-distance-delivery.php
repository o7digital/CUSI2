<?php
// Read-only diagnostic for the isolated CUSI dev shop. Does not call Google,
// change options, create a cart/order, or print any provider credential.
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev') {
    throw new RuntimeException('Restricted to the isolated CUSI development shop.');
}
if (!function_exists('cusi_distance_settings') || !function_exists('cusi_distance_price_minor')) {
    throw new RuntimeException('Install the CUSI distance plugins before checking delivery.');
}
$settings = cusi_distance_settings();
$store = trim(implode(', ', array_filter([
    get_option('woocommerce_store_address'), get_option('woocommerce_store_address_2'),
    get_option('woocommerce_store_city'), get_option('woocommerce_store_postcode'),
])));
$problems = [];
if (!$settings['api_key']) $problems[] = 'Google Routes server key is missing.';
if (!$settings['enabled']) $problems[] = 'Automatic distance pricing is disabled.';
if (!$settings['origin']) $problems[] = 'Dispatch origin is missing.';
if (!is_numeric($settings['rate']) || (float) $settings['rate'] <= 0) $problems[] = 'Kilometer rate is invalid.';
if (!is_numeric($settings['included_km']) || (float) $settings['included_km'] < 0) $problems[] = 'Included kilometers are invalid.';

$examples = [];
if (is_numeric($settings['rate']) && (float) $settings['rate'] > 0 && is_numeric($settings['included_km']) && (float) $settings['included_km'] >= 0) {
    foreach ([5, 10, 20, 25, 30] as $km) {
        $examples[] = [
            'road_km' => $km,
            'shipping_mxn' => cusi_distance_price_minor($km * 1000, (int) round((float) $settings['rate'] * 100), (int) round((float) $settings['included_km'] * 1000)) / 100,
        ];
    }
}
echo json_encode([
    'environment' => wp_get_environment_type(),
    'currency' => get_woocommerce_currency(),
    'dispatch_origin' => $settings['origin'],
    'woocommerce_store_address' => $store,
    'origin_geocoding_checked' => false,
    'calculator_enabled' => $settings['enabled'],
    'google_routes_key_configured' => $settings['api_key'] !== '',
    'live_route_check_performed' => false,
    'scope' => $settings['scope'],
    'base_mxn' => 400,
    'included_km' => $settings['included_km'],
    'mxn_per_extra_km' => $settings['rate'],
    'configuration_problems' => $problems,
    'tariff_examples_only' => $examples,
    'settings_url' => 'https://wp-cusi.o7digitalgroup.com/dev/wp-admin/admin.php?page=wc-settings&tab=shipping&section=cusi_distance',
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL;
