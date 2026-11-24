# Christmas collection on dev2

The development site reads a separate Christmas catalog from the isolated WordPress shop. It does not use the checkout, tax, or distance-pricing changes on the `dev` branch.

Set `CHRISTMAS_WORDPRESS_BASE_URL=https://wp-cusi.o7digitalgroup.com/dev` for Vercel **Preview / dev2** and local builds. No credentials are needed to read published seasonal products. The existing `/api/products` catalog keeps using the production WordPress catalog.

`cusi-christmas.php` is installed in `/var/www/html/wp-content/mu-plugins/` inside `o7-wp-cusi-dev`. It adds **Colección de Navidad** to the WordPress admin, with a visual description editor, a featured image, and a sizes/prices table. The initial basket is editable at:

https://wp-cusi.o7digitalgroup.com/dev/wp-admin/post.php?post=76&action=edit

The terracotta pot is editable at:

https://wp-cusi.o7digitalgroup.com/dev/wp-admin/post.php?post=78&action=edit

`seed-christmas.php` creates each supplied product only if its slug is absent, and refuses to run outside the isolated staging database. It expects the optimized user photos at `/tmp/canasto-nochebuenas-premium.webp` and `/tmp/maceta-barro-nochebuena-premium.webp` inside that container. Subsequent product edits belong in WordPress; rerunning the seed preserves those edits.

The website reads `/wp-json/wp/v2/cusi-navidad?_embed&per_page=100&orderby=date&order=asc` server-side, displays all complete published seasonal products in creation order, caches the published content for five minutes, and uses each product’s independently chosen size, dimensions and exact MXN price in the WhatsApp order link. If the catalog is unavailable, the section offers a WhatsApp inquiry without showing a stale or invented price.

Validation: `npm run build`, `npx tsc --noEmit`, the public WordPress response against the supplied sizes/prices, and Firefox checks of the Spanish, English, French and Italian home pages and size selection.

## WordPress media optimization

`cusi-media-optimizer.php` is a must-use plugin for both CUSI WordPress installations. It converts static JPEG/PNG photos and oversized WebP uploads to WebP, fits the full photo within 1600 × 1600 without cropping or enlargement, and generates native WordPress/WooCommerce thumbnails. Quality is 80, with a quality-72 retry for full photos over 300 KiB; this is a target rather than a hard file-size limit. Efficient existing WebP files, animation, GIF and SVG are retained. If recompression would enlarge a small photo, its original stays active.

The normal upload and sideload metadata hook handles future imports automatically. Attachment IDs, alt text, product references and prices are preserved. Original files and old thumbnails remain at their existing URLs. Each converted attachment stores its original file, metadata and MIME type privately in `_cusi_media_original`; `_cusi_media_optimized` makes repeated runs idempotent. Failures after metadata generation restore the previous attachment state. This reduces the files served, not total disk usage: originals are deliberately retained.

On `o7-vps`, production is container `o7-wp-oliviers54` (`home_url()` must be `https://wp-cusi.o7digitalgroup.com`); development is `o7-wp-cusi-dev` (`https://wp-cusi.o7digitalgroup.com/dev`). Install the plugin as `/var/www/html/wp-content/mu-plugins/cusi-media-optimizer.php`, owned by `www-data`, mode 0644. Copy `optimize-media.php` into `/tmp` in the target container. Before bulk changes, back up uploads and attachment records outside the web root. Run commands as `www-data`:

```sh
php /tmp/optimize-media.php                 # read-only inventory
php /tmp/optimize-media.php --apply 67      # one attachment
php /tmp/optimize-media.php --apply         # all image attachments
php /tmp/optimize-media.php --restore 67    # restore explicitly selected IDs
```

Restoration keeps generated WebP files so links already cached by the website keep working. To disable automatic processing, remove only this must-use plugin; do not delete images. `tests/verify-media-optimizer.php` exercises the real WordPress upload pipeline, transparency, generated thumbnails, original preservation and idempotency using temporary fixtures; it refuses to run outside the isolated development database and cleans up its own fixtures.
