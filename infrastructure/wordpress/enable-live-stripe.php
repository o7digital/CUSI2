<?php
// Keys arrive only through stdin on the server, never command arguments or output.
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (wp_get_environment_type() !== 'staging' || DB_NAME !== 'wp_cusi_dev') {
    throw new RuntimeException('Restricted to the isolated CUSI dev shop.');
}
$source = json_decode(stream_get_contents(STDIN), true, 512, JSON_THROW_ON_ERROR);
if (!preg_match('/^pk_live_/', $source['publishable_key'] ?? '') || !preg_match('/^(sk|rk)_live_/', $source['secret_key'] ?? '')) {
    throw new RuntimeException('Valid live Stripe credentials are required.');
}
// Never reuse the production webhook: this shop needs its own URL and signing secret.
unset($source['webhook_data'], $source['webhook_secret'], $source['test_webhook_data'], $source['test_webhook_secret']);
$current = get_option('woocommerce_stripe_settings', []);
if (($current['secret_key'] ?? '') === $source['secret_key']
    && ($current['webhook_data']['url'] ?? '') === 'https://wp-cusi.o7digitalgroup.com/dev/?wc-api=wc_stripe') {
    $source['webhook_data'] = $current['webhook_data'];
    $source['webhook_secret'] = $current['webhook_secret'];
}
$source['enabled'] = 'yes';
$source['testmode'] = 'no';
update_option('cusi_stripe_live_enabled', true);
update_option('woocommerce_stripe_settings', $source);
update_option('blogname', 'CUSI');
delete_transient('wc_stripe_account_data');
echo "Live Stripe credentials installed on dev.\n";
