# CUSI checkout on dev

Production remains on `main` at https://www.cusiflores.com/.
Development uses https://cusi-2-git-dev-olivier-steineur.vercel.app/ and an isolated WordPress shop at https://wp-cusi.o7digitalgroup.com/dev/.

The Vercel **Preview / dev** environment has `WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev` and `WOOCOMMERCE_PRICES_INCLUDE_IVA=true`. No Stripe secret is needed in Vercel: WooCommerce owns orders, delivery addresses, tax calculations and Stripe payments.

## Prices and purchases

The existing WooCommerce prices are the base prices. On the test shop, all 22 published bouquets are taxable at 16% IVA; prices are entered excluding tax, and shop/cart prices display including tax. Tax uses the shop's Mexican base address. Product prices themselves have not been increased, so IVA is added once by WooCommerce. For example: 3,990.00 + 638.40 = 4,628.40 MXN. Shipping is a separate WooCommerce charge.

The website uses WooCommerce's returned total directly. Simple, available bouquets link to `/dev/checkout/?add-to-cart=PRODUCT_ID&quantity=1`. Products requiring options open the product page. Unavailable or unpriced products offer a quote.

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
