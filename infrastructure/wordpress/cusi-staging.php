<?php
/**
 * Plugin Name: CUSI staging safeguards
 * Description: Keeps dev private and permits live Stripe only when explicitly enabled.
 */
defined('ABSPATH') || exit;
if (wp_get_environment_type() !== 'staging') {
    return;
}

function cusi_stripe_live_enabled(): bool {
    return (bool) get_option('cusi_stripe_live_enabled', false);
}

add_filter('pre_wp_mail', static function ($result) {
    return cusi_stripe_live_enabled() ? $result : true;
});
add_filter('pre_option_blog_public', static fn () => '0');
add_filter('option_woocommerce_stripe_settings', static function ($settings) {
    $settings = is_array($settings) ? $settings : [];
    if (cusi_stripe_live_enabled()) {
        $settings['testmode'] = 'no';
        return $settings;
    }
    $settings['testmode'] = 'yes';
    foreach (['publishable_key', 'secret_key', 'webhook_secret'] as $key) {
        $settings[$key] = '';
    }
    return $settings;
});
add_filter('pre_http_request', static function ($result, $args, $url) {
    if (cusi_stripe_live_enabled()) {
        return $result;
    }
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
    $message = cusi_stripe_live_enabled()
        ? 'CUSI dev — Paiements Stripe RÉELS actifs. Les commandes peuvent être débitées. IVA 16 %.'
        : 'CUSI — Boutique de test : Stripe test uniquement, emails désactivés, IVA 16 %.';
    echo '<div class="notice notice-warning"><p>' . esc_html($message) . '</p></div>';
});
