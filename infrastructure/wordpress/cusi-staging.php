<?php
/**
 * Plugin Name: CUSI staging safeguards
 * Description: Isolates the development shop from real payments, email and indexing.
 */
defined('ABSPATH') || exit;
if (wp_get_environment_type() !== 'staging') {
    return;
}

add_filter('pre_wp_mail', '__return_true');
add_filter('pre_option_blog_public', static fn () => '0');
add_filter('option_woocommerce_stripe_settings', static function ($settings) {
    $settings = is_array($settings) ? $settings : [];
    $settings['testmode'] = 'yes';
    foreach (['publishable_key', 'secret_key', 'webhook_secret'] as $key) {
        $settings[$key] = '';
    }
    return $settings;
});
add_filter('pre_http_request', static function ($result, $args, $url) {
    if (wp_parse_url($url, PHP_URL_HOST) !== 'api.stripe.com') {
        return $result;
    }
    $headers = array_change_key_case((array) ($args['headers'] ?? []), CASE_LOWER);
    $auth = $headers['authorization'] ?? '';
    if (stripos($auth, 'Basic ') === 0) {
        $auth = base64_decode(substr($auth, 6));
    }
    if (!preg_match('/(?:sk|rk)_test_/', $auth)) {
        return new WP_Error('cusi_staging_live_payment_blocked', 'Connect Stripe in test mode to test this shop.');
    }
    return $result;
}, 10, 3);
add_action('admin_notices', static function () {
    echo '<div class="notice notice-warning"><p>CUSI — Boutique de test : Stripe test uniquement, emails désactivés, IVA 16 %.</p></div>';
});
