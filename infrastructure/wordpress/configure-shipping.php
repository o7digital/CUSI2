<?php
// Apply the requested 400 MXN delivery charge only to the isolated CUSI dev shop.
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev' || get_woocommerce_currency() !== 'MXN') {
    throw new RuntimeException('Restricted to the CUSI dev shop in MXN.');
}
$zone = new WC_Shipping_Zone(1);
$mexico = array_filter($zone->get_zone_locations(), static fn ($location) => $location->type === 'country' && $location->code === 'MX');
if (!$mexico) {
    throw new RuntimeException('Expected Mexico delivery zone not found.');
}
$instance = null;
foreach ($zone->get_shipping_methods() as $method) {
    if ($method->id === 'flat_rate' && $method->enabled === 'yes') {
        $instance = $method->instance_id;
        break;
    }
}
$instance = $instance ?? $zone->add_shipping_method('flat_rate');
if (!$instance) {
    throw new RuntimeException('Could not create the delivery rate.');
}
$rate = new WC_Shipping_Flat_Rate($instance);
$settings = $rate->instance_settings;
$settings['title'] = 'Envío a domicilio';
$settings['cost'] = '400';
// The requested delivery charge is 400 MXN total; bouquet IVA stays unchanged.
$settings['tax_status'] = 'none';
update_option($rate->get_instance_option_key(), $settings);
foreach ($zone->get_shipping_methods() as $method) {
    if ($method->id === 'free_shipping') {
        $zone->delete_shipping_method($method->instance_id);
    }
}
WC_Cache_Helper::get_transient_version('shipping', true);
echo json_encode(['zone' => $zone->get_zone_name(), 'shipping_mxn' => 400, 'method' => 'flat_rate:' . $instance]) . PHP_EOL;
