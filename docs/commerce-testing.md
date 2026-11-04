# CUSI checkout on dev

Production remains on `main` at https://www.cusiflores.com/.
Development uses https://cusi-2-git-dev-olivier-steineur.vercel.app/ and an isolated WordPress shop at https://wp-cusi.o7digitalgroup.com/dev/.

The Vercel **Preview / dev** environment has `WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev` and `WOOCOMMERCE_PRICES_INCLUDE_IVA=true`. No Stripe secret is needed in Vercel: WooCommerce owns orders, delivery addresses, tax calculations and Stripe payments.

## Prices and purchases

The existing WooCommerce prices are the base prices. On the test shop, all 22 published bouquets are taxable at 16% IVA; prices are entered excluding tax, and shop/cart prices display including tax. Tax uses the shop's Mexican base address. Product prices themselves have not been increased, so IVA is added once by WooCommerce. For example: 3,990.00 + 638.40 = 4,628.40 MXN. Delivery in the existing Mexico shipping zone costs a flat **400 MXN per order**, making this example's checkout total **5,028.40 MXN**. Free shipping is removed. The 400 MXN is the final delivery charge; no additional IVA is added to it. `infrastructure/wordpress/configure-shipping.php` applies this configuration and invalidates cached shipping rates for existing carts.

The website uses WooCommerce's returned total directly. Simple, available bouquets link to `/dev/checkout/?add-to-cart=PRODUCT_ID&quantity=1`. Products requiring options open the product page. Unavailable or unpriced products offer a quote.

## Approved road-distance delivery tariff

`cusi-distance-shipping.php` and `cusi-distance-pricing.php` are installed as must-use plugins on dev. The merchant approved **400 MXN up to 5 road km, then 15 MXN per additional km** on 2026-11-04. These values are saved in WooCommerce by `configure-distance-shipping.php`. The calculator is **still disabled pending a Google Routes API server key and verification of the exact origin**. The current flat 400 MXN delivery remains active until then. No real route calculation has been verified without this connection.

Configure it at https://wp-cusi.o7digitalgroup.com/dev/wp-admin/admin.php?page=wc-settings&tab=shipping&section=cusi_distance. The proposed origin is the merchant-provided address, Bosques de Robles 32, Lomas de Chapultepec, Ciudad de México. The supplied six-digit postcode is omitted pending correction; validate the exact origin on Maps before activation. Keep the API key in WordPress; never commit it or share it in chat. Enable Routes API with billing in its Google Cloud project and restrict the key to the Routes API and the server's public IP as appropriate. Google's setup documentation: https://developers.google.com/maps/documentation/routes/get-api-key.

The approved radius policy applies to all covered Mexican destinations, including CDMX. Formula: **400 MXN + max(0, one-way road kilometers − 5) × 15 MXN/km**, rounded once to the nearest cent. Examples: 5 km = 400 MXN; 10 km = 475 MXN; 20 km = 625 MXN; 30 km = 775 MXN. The settings also retain an alternative outside-CDMX policy, but it is not the selected rule. Distance is computed server-side using Google Routes `DRIVE` and the delivery address, then appears in the shipping label and order shipping metadata. International delivery is not added. Invalid addresses, a missing route, a missing tariff or an API error cannot fall back to a 400 MXN outside-city rate. Changing the configuration invalidates WooCommerce shipping caches.

`tests/verify-distance-shipping.php` exercises actual WooCommerce rate filters with process-local mocked options and route responses: CDMX pricing, outside-city pricing, rounding, caching, incomplete addresses and provider failures. Run it inside `o7-wp-cusi-dev` after installing the two plugins. It makes no external route request, submits no order, and does not enable or change the merchant's saved calculator settings. The tests verify the approved 15 MXN/km radius tariff and also exercise the alternative outside-CDMX policy with process-local test values.

## Live Stripe activated on dev

At the user's explicit request on 2026-11-04, dev now accepts **real Stripe payments** using the existing merchant account. The account API reports that charges are enabled. The checkout exposes the `stripe` payment method and renders the secure credit/debit card input in a browser. No charge was submitted during verification.

`cusi_stripe_live_enabled=true` in the isolated WordPress database enables live mode in the must-use plugin. Live credentials were transferred directly between the two containers in server memory; they were never committed or printed. The Stripe extension created a separate live webhook for `https://wp-cusi.o7digitalgroup.com/dev/?wc-api=wc_stripe`, with its own signing secret. Production's webhook and Stripe settings were preserved.

The default for a new staging copy remains test-only. `enable-live-stripe.php` takes authorized live settings through stdin and refuses to run outside the isolated dev database. `configure-live-webhook.php` uses the installed Stripe extension's native webhook setup, restricted to the dev URL. `configure-staging.php` refuses to reset an already activated live shop.

The dev shop remains noindex. Email suppression applies only while live Stripe is disabled. Its automatic WordPress cron remains disabled as configured when the clone was created.

## Verification

Run `npm test`, `WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev WOOCOMMERCE_PRICES_INCLUDE_IVA=true npm run build`, and `python3 tests/verify-commerce.py`. The integration check compares all test bouquet prices with the original catalog plus 16%, opens an anonymous test cart, verifies the selected product and total, and checks that the authorized live Stripe connection and payment method are present. It never submits an order.

## Server configuration

On `o7-vps`, the isolated container is `o7-wp-cusi-dev`, its files and protected environment are in `/opt/o7/web/sites/cusi-dev`, and its separate database/user are `wp_cusi_dev`. The production database `wp_oliviers54` and its Stripe settings were not modified. The `/dev/` proxy location is in `/opt/o7/mailcow/data/conf/nginx/wp-cusi.conf`; the previous configuration is retained as `wp-cusi.conf.before-cusi-dev`.

`infrastructure/wordpress/cusi-staging.php` is installed as a must-use plugin in the staging shop. `configure-staging.php` records the applied WooCommerce configuration and refuses to run against production. The original non-commerce plugins remain inactive on this clone.

The live checkout is active only on dev. Production remains on main. Promoting the website checkout later also requires configuring production WooCommerce tax display and checking its webhook and shipping settings. Live Stripe on dev does not itself publish the website changes to main.
