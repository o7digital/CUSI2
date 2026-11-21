# CUSI Studio

The production website is `https://www.cusiflores.com`. Its editorial backend is the dedicated Railway project **cusi-cms**, environment **production**. Service IDs and URLs are in `deployment.json`. The project contains Directus 12.6.1, PostgreSQL and a separate CUSI Studio service.

Studio: https://studio-production-659f4076.up.railway.app

Technical administration: https://directus-production-39d0efab.up.railway.app/admin

## Editing

The **Editar sitio** screen shows the actual website in a sandboxed snapshot. Click the green outlined text or use the inspector and its rich text toolbar. Spanish, English, French and Italian are independently editable. The editable sections are the Christmas hero, the original flower hero and the Christmas collection introduction and delivery information. This release does not automatically translate text or make every other section of the site editable.

**Guardar cambios** stores the selected edits in Directus. The site refreshes its published content within approximately one minute without rebuilding. Draft content is excluded. Conflicting text edits are rejected and unsaved text stays in the editor. The desktop, tablet and mobile controls resize the snapshot. The photos screen preserves all six slides: two Nochebuenas followed by the four existing flower images. Replacing a slide uploads the image to the persistent Directus volume. The source photographs in `public/` are preserved.

The preview endpoint fixes the configured website origin, strips scripts, forms, embedded frames and event handlers, resolves asset URLs and adds only its restricted editing bridge. Its iframe has scripts enabled and an opaque origin. It receives no Directus or WooCommerce credentials.

## Prices and orders

WordPress remains the price authority. The regular catalogue uses the production WooCommerce Store API at `https://wp-cusi.o7digitalgroup.com`. The existing Christmas collection remains in its original isolated WordPress installation at `https://wp-cusi.o7digitalgroup.com/dev`, through the `cusi-navidad` endpoint documented under `infrastructure/wordpress/`. Directus contains editorial text and hero photographs, not product prices. The Studio catalogue reads the same two sources as the website.

**Pedidos** reads WooCommerce orders in real time with a dedicated API key whose permissions are **read**. The default view includes pending payment, processing and on-hold orders. It has status filters, pagination, a search within the current page, line items, delivery/contact details and links to the corresponding WordPress order. Counts come from WooCommerce. WhatsApp conversations and the existing Formspree/Olivia inquiry form are not WooCommerce orders and are not imported into this view. No order is created merely by opening Studio or clicking a WhatsApp link. The current implementation does not capture external WhatsApp messages.

## Access

The editorial login is the username **cusi**, mapped privately to a dedicated Directus editor identity with a reserved, non-deliverable email identifier. It is not a customer's mailbox and no email is sent there. Its random password is supplied locally to the owner, outside Git. This account has no administrator access. The owner's independent administrator account remains available for technical management.

Studio authenticates against Directus and retains its access and refresh tokens only in server memory behind an HttpOnly, Secure, SameSite cookie. State-changing requests require the configured Studio Origin. Login attempts are limited. A redeployment ends existing Studio sessions. `ADMIN_PASSWORD` initializes an empty Directus database only; changing it later does not reset a stored password. Use the administrator to manage real client accounts or replace the reserved editor identifier when a client email is available.

Website reads use a separate read identity. No anonymous Directus access is granted. The public website only serves CMS files referenced by a published hero slide. WooCommerce credentials are only on Studio. Vercel receives `DIRECTUS_URL`, `DIRECTUS_READ_TOKEN` and `CHRISTMAS_WORDPRESS_BASE_URL`, for production and branch `dev2` preview. The existing production Olivia gateway configuration is preserved.

## Deployment and persistence

PostgreSQL has its Railway volume. Directus has a separate `/directus/uploads` volume owned by UID 1000; the Directus process runs as UID 1000. Studio explicitly uses port 3000 and its Railway domain targets that port. Runtime variables override Docker defaults on Railway.

`bootstrap.mjs` initializes missing collections, seed text, slides, permissions and accounts without overwriting existing editorial records. It requires the local mode-0600 credential handoff file, selected by `CUSI_ACCESS_FILE`, and checks the exact Cusi CMS URL. Preserve that file privately; do not commit it or run this script against another project.

Deploy Studio from this checkout:

```sh
npm ci --prefix cms/studio
npm run test:studio
railway up cms/studio --path-as-root --service studio --detach --json
```

The website remains on Vercel. Commit/push the current working branch and use `vercel --prod --yes` for its authorized production release. Keep the previous Vercel deployment available for rollback. Do not change the WordPress checkout, prices, shipping or payment configuration as part of CMS deployment.

## Validation

```sh
npm test
npm run test:studio
npx tsc --noEmit
npm run build
npx playwright install firefox
npm run test:browser
```

Firefox QA defaults to local site port 3001 and Studio port 4380. Override `CUSI_SITE_URL` and `CUSI_STUDIO_URL` for production verification. The private access file is needed for login. The test saves the original unchanged copy, verifies the four languages and six photographs, checks size-to-price mapping, editorial permissions, the live empty order state, inline WYSIWYG, the catalogue and mobile overflow. It blocks Formspree and never creates an order or sends a client message. Screenshots are written to ignored `test-results/`.
