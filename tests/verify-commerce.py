"""Read-only price checks and an anonymous staging cart; never submits an order."""
import http.cookiejar
import json
import re
import urllib.request
from decimal import Decimal, ROUND_HALF_UP

LIVE = 'https://wp-cusi.o7digitalgroup.com'
STAGING = LIVE + '/dev'


def read_json(url, opener=None):
    with (opener or urllib.request.build_opener()).open(url, timeout=30) as response:
        return json.load(response)


live = read_json(LIVE + '/wp-json/wc/store/v1/products?per_page=100')
staging = read_json(STAGING + '/wp-json/wc/store/v1/products?per_page=100')
prices = {product['id']: product['prices']['price'] for product in live}
assert staging, 'The staging catalog is empty'
assert set(prices) == {product['id'] for product in staging}, 'The catalogs have diverged'
for product in staging:
    expected = (Decimal(prices[product['id']]) * Decimal('1.16')).quantize(Decimal('1'), rounding=ROUND_HALF_UP)
    assert int(product['prices']['price']) == int(expected), product['name']
print(f'PASS: {len(staging)} bouquet prices include exactly 16% IVA')

bouquet = next(product for product in staging if product['type'] == 'simple' and product['is_purchasable'] and product['is_in_stock'])
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
with opener.open(f"{STAGING}/checkout/?add-to-cart={bouquet['id']}&quantity=1", timeout=30) as response:
    assert response.status == 200 and response.url.startswith(STAGING + '/checkout/')
    html = response.read().decode()
    assert re.search(r'pk_live_', html), 'The authorized live Stripe connection is missing'
    assert not re.search(r'pk_test_', html), 'The dev checkout should now use the real Stripe account'
cart = read_json(STAGING + '/wp-json/wc/store/v1/cart', opener)
assert len(cart['items']) == 1 and cart['items'][0]['id'] == bouquet['id']
assert cart['items'][0]['quantity'] == 1
shipping_minor = 40000
assert cart['totals']['total_shipping'] == str(shipping_minor), cart['totals']
assert cart['totals']['total_shipping_tax'] == '0', cart['totals']
assert int(cart['totals']['total_price']) == int(bouquet['prices']['price']) + shipping_minor, cart['totals']
rates = [rate for package in cart['shipping_rates'] for rate in package['shipping_rates']]
assert rates and not any(rate['method_id'] == 'free_shipping' for rate in rates), rates
assert any(rate['method_id'] == 'flat_rate' and rate['selected'] and rate['price'] == str(shipping_minor) for rate in rates), rates
expected_tax = int(bouquet['prices']['price']) - int(prices[bouquet['id']])
assert int(cart['totals']['total_tax']) == expected_tax, cart['totals']
print('PASS: checkout contains the selected bouquet, 400 MXN delivery, and the correct total')
assert 'stripe' in cart['payment_methods'], 'Stripe must be available as a payment method'
print('PASS: live Stripe is available; no order or charge has been submitted')
