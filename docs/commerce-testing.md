# CUSI checkout on dev

Production remains on `main` at https://www.cusiflores.com/.
Development uses https://cusi-2-git-dev-olivier-steineur.vercel.app/ and an isolated WordPress shop at https://wp-cusi.o7digitalgroup.com/dev/.

The Vercel **Preview / dev** environment has `WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev` and `WOOCOMMERCE_PRICES_INCLUDE_IVA=true`. No Stripe secret is needed in Vercel: WooCommerce owns orders, delivery addresses, tax calculations and Stripe payments.

## Prices and purchases

The existing WooCommerce prices are the base prices. On the test shop, all 22 published bouquets are taxable at 16% IVA; prices are entered excluding tax, and shop/cart prices display including tax. Tax uses the shop's Mexican base address. Product prices themselves have not been increased, so IVA is added once by WooCommerce. For example: 3,990.00 + 638.40 = 4,628.40 MXN. Shipping is a separate WooCommerce charge.

The website uses WooCommerce's returned total directly. Simple, available bouquets link to `/dev/checkout/?add-to-cart=PRODUCT_ID&quantity=1`. Products requiring options open the product page. Unavailable or unpriced products offer a quote.

## Stripe test connection required

The source shop had only live Stripe credentials. The isolated shop is forced into test mode, contains no live Stripe keys, blocks live Stripe API requests, suppresses outgoing mail, disables scheduled jobs and is marked noindex. No payment has been submitted and no successful test payment is claimed.

Connect Stripe **test mode** from https://wp-cusi.o7digitalgroup.com/dev/wp-admin/admin.php?page=wc-settings&tab=checkout&section=stripe using an existing WordPress administrator account. Configure the Stripe test webhook at `https://wp-cusi.o7digitalgroup.com/dev/?wc-api=wc_stripe` through the extension's connection settings. Verify a test payment creates a paid WooCommerce order for the displayed total and that the test webhook updates its status. Test card guidance: https://woocommerce.com/document/stripe/customer-experience/testing/.

## Verification

Run `npm test`, `WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev WOOCOMMERCE_PRICES_INCLUDE_IVA=true npm run build`, and `python3 tests/verify-commerce.py`. The integration check compares all test bouquet prices with the original catalog plus 16%, opens an anonymous test cart, verifies the selected product and total, and checks that no live public Stripe key appears. It never submits an order.

## Server configuration

On `o7-vps`, the isolated container is `o7-wp-cusi-dev`, its files and protected environment are in `/opt/o7/web/sites/cusi-dev`, and its separate database/user are `wp_cusi_dev`. The production database `wp_oliviers54` and its Stripe settings were not modified. The `/dev/` proxy location is in `/opt/o7/mailcow/data/conf/nginx/wp-cusi.conf`; the previous configuration is retained as `wp-cusi.conf.before-cusi-dev`.

`infrastructure/wordpress/cusi-staging.php` is installed as a must-use plugin in the staging shop. `configure-staging.php` records the applied WooCommerce configuration and refuses to run against production. The original non-commerce plugins are inactive on this clone to avoid sending events to production integrations.

Promoting the checkout later requires configuring the production WooCommerce taxes and live Stripe connection deliberately, using the production WordPress URL in Vercel, and verifying live webhooks and shipping. The current changes have only been activated on dev.
