# Christmas collection on dev2

The development site reads a separate Christmas catalog from the isolated WordPress shop. It does not use the checkout, tax, or distance-pricing changes on the `dev` branch.

Set `CHRISTMAS_WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev` for Vercel **Preview / dev2** and local builds. No credentials are needed to read published seasonal products. The existing `/api/products` catalog keeps using the production WordPress catalog.

`cusi-christmas.php` is installed in `/var/www/html/wp-content/mu-plugins/` inside `o7-wp-cusi-dev`. It adds **Colección de Navidad** to the WordPress admin, with a visual description editor, a featured image, and a sizes/prices table. The first product is editable at:

https://wp-cusi.o7digitalgroup.com/dev/wp-admin/post.php?post=76&action=edit

`seed-christmas.php` creates the initial product only if its slug is absent, and refuses to run outside the isolated staging database. It expects the optimized user photo at `/tmp/canasto-nochebuenas-premium.webp` inside that container. Subsequent product edits belong in WordPress; rerunning the seed preserves those edits.

The website reads `/wp-json/wp/v2/cusi-navidad?slug=canasto-con-nochebuenas-premium&_embed` server-side, caches the published content for five minutes, and uses the chosen size, dimensions and exact MXN price in the WhatsApp order link. If the catalog is unavailable, the section offers a WhatsApp inquiry without showing a stale or invented price.

Validation: `npm run build`, `npx tsc --noEmit`, the public WordPress response against the four supplied sizes/prices, and Firefox checks of the Spanish, English, French and Italian home pages and size selection.
