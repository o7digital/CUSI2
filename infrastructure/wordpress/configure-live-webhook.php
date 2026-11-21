<?php
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (DB_NAME !== 'wp_cusi_dev' || !cusi_stripe_live_enabled()) {
    throw new RuntimeException('Live Stripe must be explicitly enabled on CUSI dev.');
}
$url = WC_Stripe_Helper::get_webhook_url();
if ($url !== 'https://wp-cusi.o7digitalgroup.com/dev/?wc-api=wc_stripe') {
    throw new RuntimeException('Unexpected webhook URL; configuration aborted.');
}
$response = WC_Stripe::get_instance()->account->configure_webhooks('live');
echo json_encode([
    'webhook_id' => $response->id,
    'url' => $response->url,
    'status' => $response->status,
    'livemode' => $response->livemode,
]) . PHP_EOL;
