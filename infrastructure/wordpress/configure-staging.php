<?php
// Run inside the isolated staging container with: php configure-staging.php
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev') {
    throw new RuntimeException('This configuration is restricted to the isolated CUSI development database.');
}
$base = 'https://wp-cusi.o7digitalgroup.com/dev';
update_option('home', $base);
update_option('siteurl', $base);
update_option('blog_public', '0');
update_option('blogname', 'CUSI — Test');
update_option('active_plugins', ['woocommerce/woocommerce.php', 'woocommerce-gateway-stripe/woocommerce-gateway-stripe.php']);
foreach ([
    'woocommerce_calc_taxes' => 'yes',
    'woocommerce_prices_include_tax' => 'no',
    'woocommerce_tax_display_shop' => 'incl',
    'woocommerce_tax_display_cart' => 'incl',
    'woocommerce_tax_based_on' => 'base',
    'woocommerce_default_country' => 'MX:DF',
    'woocommerce_currency' => 'MXN',
    'woocommerce_price_display_suffix' => 'IVA incluido (16 %)',
] as $key => $value) {
    update_option($key, $value);
}
// The cloned shop's old rates must not add a second tax. Production is untouched.
global $wpdb;
$wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_tax_rate_locations");
$wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_tax_rates");
WC_Tax::_insert_tax_rate([
    'tax_rate_country' => 'MX', 'tax_rate_state' => '',
    'tax_rate' => '16.0000', 'tax_rate_name' => 'IVA',
    'tax_rate_priority' => 1, 'tax_rate_compound' => 0,
    'tax_rate_shipping' => 0, 'tax_rate_order' => 0, 'tax_rate_class' => '',
]);
$products = wc_get_products(['limit' => -1, 'status' => 'publish']);
foreach ($products as $product) {
    $product->set_tax_status('taxable');
    $product->set_tax_class('');
    $product->save();
}
$stripe = get_option('woocommerce_stripe_settings', []);
$stripe['enabled'] = 'yes';
$stripe['testmode'] = 'yes';
foreach (['publishable_key', 'secret_key', 'webhook_secret'] as $key) {
    $stripe[$key] = '';
}
update_option('woocommerce_stripe_settings', $stripe);
// Rewrite only this clone's content URLs, preserving serialized WordPress metadata.
$wpdb->query($wpdb->prepare("UPDATE {$wpdb->posts} SET post_content = REPLACE(post_content, %s, %s)", 'https://wp-cusi.o7digitalgroup.com/wp-content/', $base . '/wp-content/'));
WC_Cache_Helper::invalidate_cache_group('taxes');
wc_delete_product_transients();
echo json_encode(['products' => count($products), 'iva' => 16, 'stripe_test_connected' => !empty($stripe['test_secret_key']), 'environment' => wp_get_environment_type()]) . PHP_EOL;
