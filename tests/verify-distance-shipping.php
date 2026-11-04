<?php
// Runs inside the dev WordPress container. Route responses and options are mocked
// for this PHP process only: no external request, order, or charge is submitted.
$_SERVER['HTTP_HOST'] = 'wp-cusi.o7digitalgroup.com';
$_SERVER['HTTPS'] = 'on';
require '/var/www/html/wp-load.php';
if (DB_NAME !== 'wp_cusi_dev') {
    throw new RuntimeException('Restricted to CUSI dev.');
}
function check_distance($condition, string $message): void {
    if (!$condition) {
        throw new RuntimeException($message);
    }
    echo 'PASS: ' . $message . PHP_EOL;
}
check_distance(cusi_distance_price_minor(0, 1000) === 40000, '400 MXN minimum, added once');
check_distance(cusi_distance_price_minor(25000, 1000) === 65000, '25 road km at 10 MXN/km gives 650 MXN');
check_distance(cusi_distance_price_minor(12345, 755) === 49320, 'fractional kilometers and cent rounding');
check_distance(cusi_distance_price_minor(5000, 1000, 5000) === 40000, 'included 5 km are not charged twice');
check_distance(cusi_distance_price_minor(20000, 1000, 5000) === 55000, 'proposed radius pricing: 20 km gives 550 MXN');
foreach ([[-1, 1000], [1000, 0], [1000, -100], [PHP_INT_MAX, 1000]] as [$meters, $rate]) {
    try {
        cusi_distance_price_minor($meters, $rate);
        throw new RuntimeException('Invalid values were accepted');
    } catch (InvalidArgumentException $error) {
        check_distance(true, 'invalid distance/rate rejected');
    }
}
$test_options = [
    'cusi_distance_enabled' => 'yes',
    'cusi_distance_origin' => 'Bosques de Robles 32, Lomas de Chapultepec, Ciudad de México, México',
    'cusi_distance_rate' => '10',
    'cusi_distance_scope' => 'outside_cdmx',
    'cusi_distance_included_km' => '0',
    'cusi_distance_api_key' => 'test-only-' . bin2hex(random_bytes(10)),
];
foreach ($test_options as $key => $value) {
    add_filter('pre_option_' . $key, static fn () => $value);
}
$calls = 0;
$mock_status = 200;
$mock_body = ['routes' => [['distanceMeters' => 25000]]];
add_filter('pre_http_request', static function ($result, $args, $url) use (&$calls, &$mock_status, &$mock_body, $test_options) {
    if ($url !== 'https://routes.googleapis.com/directions/v2:computeRoutes') {
        return new WP_Error('cusi_test_external_request', 'External requests are disabled in this test.');
    }
    ++$calls;
    $request = json_decode($args['body'], true);
    check_distance($request['origin']['address'] === $test_options['cusi_distance_origin'], 'route starts at Lomas merchant address');
    check_distance($request['travelMode'] === 'DRIVE' && $args['headers']['X-Goog-FieldMask'] === 'routes.distanceMeters', 'uses road kilometers from Google Routes');
    return ['headers' => [], 'body' => json_encode($mock_body), 'response' => ['code' => $mock_status, 'message' => 'Mock'], 'cookies' => []];
}, 100, 3);
$base = ['flat_rate:2' => new WC_Shipping_Rate('flat_rate:2', 'Envío a domicilio', 400, [], 'flat_rate', 2)];
$package = ['destination' => ['country' => 'MX', 'state' => 'DF', 'address' => 'Monte Carpatos 990', 'city' => 'CDMX', 'postcode' => '11000']];
$rates = apply_filters('woocommerce_package_rates', $base, $package);
check_distance((float) reset($rates)->get_cost() === 400.0 && $calls === 0, 'CDMX remains 400 MXN without a Maps request');
$package['destination'] = ['country' => 'MX', 'state' => 'MX', 'address' => 'CUSI route test 123', 'city' => 'Toluca', 'postcode' => '50000'];
$rates = apply_filters('woocommerce_package_rates', $base, $package);
check_distance((float) reset($rates)->get_cost() === 650.0 && $calls === 1, 'outside CDMX gets base + road distance, never the flat rate');
check_distance((bool) preg_match('/25[.,]000/', reset($rates)->get_label()), 'calculated kilometers appear in the delivery option');
$rates = apply_filters('woocommerce_package_rates', $base, $package);
check_distance($calls === 1, 'repeated checkout recalculation reuses the route');
add_filter('pre_option_cusi_distance_scope', static fn () => 'radius', 20);
add_filter('pre_option_cusi_distance_included_km', static fn () => '5', 20);
$package['destination']['state'] = 'DF';
$package['destination']['address'] = 'CUSI radius route test';
$rates = apply_filters('woocommerce_package_rates', $base, $package);
check_distance((float) reset($rates)->get_cost() === 600.0, 'radius mode charges only kilometers beyond 5, including CDMX destinations');
$package['destination']['state'] = 'MX';
$mock_status = 503;
$package['destination']['address'] = 'CUSI unavailable route test';
check_distance(apply_filters('woocommerce_package_rates', $base, $package) === [], 'route provider failure cannot undercharge an outside-city order');
$mock_status = 200;
$mock_body = ['routes' => []];
$package['destination']['address'] = 'CUSI no route test';
check_distance(apply_filters('woocommerce_package_rates', $base, $package) === [], 'missing route cannot become free or flat-rate shipping');
$package['destination']['address'] = '';
$before = $calls;
check_distance(apply_filters('woocommerce_package_rates', $base, $package) === [] && $calls === $before, 'incomplete address does not request or invent a distance');
$package['destination']['country'] = 'US';
check_distance(apply_filters('woocommerce_package_rates', $base, $package) === [], 'international delivery is not added');
echo 'Distance-shipping checks complete; actual shop settings were unchanged.' . PHP_EOL;
