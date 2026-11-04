<?php
// Save the approved tariff; API connection and activation are separate settings.
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev' || get_woocommerce_currency() !== 'MXN') {
    throw new RuntimeException('Restricted to the CUSI dev shop in MXN.');
}
update_option('cusi_distance_origin', 'Bosques de Robles 32, Lomas de Chapultepec, Ciudad de México, México');
update_option('cusi_distance_scope', 'radius');
update_option('cusi_distance_included_km', '5');
update_option('cusi_distance_rate', '15');
WC_Cache_Helper::get_transient_version('shipping', true);
$settings = cusi_distance_settings();
echo json_encode([
    'origin' => $settings['origin'],
    'base_mxn' => 400,
    'included_km' => $settings['included_km'],
    'mxn_per_extra_km' => $settings['rate'],
    'scope' => $settings['scope'],
    'api_key_present' => $settings['api_key'] !== '',
    'calculator_enabled' => $settings['enabled'],
]) . PHP_EOL;
