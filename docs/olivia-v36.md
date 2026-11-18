# CUSI Flores — Olivia AI 3.6

The public site previously used a production build from `main` without a chat component. The older Olivia integration existed only on `dev`, alongside unpublished checkout changes. This update starts from `origin/main`, restores Olivia, applies the Next.js 14.2.35 patch and adds a small order-request form inside the chat. The separate dev checkout and its payment/shipping configuration are outside this change.

`components/OliviaChat.tsx` mounts through the root layout on every route. The launcher is rendered independently of browser storage and external widget scripts. The ES/FR/EN/IT interface follows the page language. Visitors consent before sending or storing a question. Replies are rendered as text. Errors preserve the draft, and expired visitor sessions are renewed. The green status requires the dedicated CUSI 3.6 service to answer its health check with its provider configured; an unavailable service is labelled accordingly. Mobile placement clears the existing WhatsApp button.

## Request path

Browser → `/api/olivia/status`, `/session`, `/chat` on CUSI's Vercel project → `https://olivia.o7digitalgroup.com/cusi/` → dedicated `cusi-olivia36` service and PostgreSQL/pgvector database on `o7-vps`.

The server binds requests and conversation IDs to an HttpOnly signed visitor session. It fixes the CUSI tenant and backend address, rejects arbitrary fields and cross-origin browser requests, checks consent and limits body size. Provider and gateway credentials never enter browser code. The backend enforces request/concurrency limits and uses only CUSI's knowledge and conversation history. Existing lead/contact forms are not submitted by chat or by verification.

The Olivia RAG/chat core in `infrastructure/olivia/core` retains its upstream revision metadata (`o7digital/olivia-v3`, `3453702`) and the existing visitor-language policy. It was recovered from the dedicated Business Suites SG core, without that client's knowledge, database or gateway credential. CUSI has its own database password and gateway key; the existing provider connection is reused only server-side.

## Deployment

1. `python3 infrastructure/olivia/build-knowledge.py` snapshots the public 22-product catalog. Review and commit the resulting three CUSI documents and system instructions. A changed snapshot on an existing database requires an explicit knowledge migration; startup refuses an unreviewed replacement.
2. Upload `infrastructure/olivia/` without `.env*`, caches or Apple metadata to `/opt/o7/apps/cusi-olivia36` on `o7-vps`.
3. On the server, `sudo python3 provision.py` creates mode-0600 credentials only for a new installation. `sudo docker compose build api` builds on the installed Olivia base image. `sudo docker run --rm --network none cusi-olivia36:local python -m pytest -q /app/cusi_tests` runs isolated tests without provider access.
4. `sudo docker compose up -d --wait` starts only CUSI's containers. `sudo python3 install-proxy.py` adds only `/cusi/` to the existing Olivia hostname, retains a backup, validates Nginx and reloads gracefully. The API listens on loopback port 8139 and the existing proxy network; its database has no public port.
5. Transfer `CUSI_GATEWAY_KEY` to CUSI's sensitive Vercel `OLIVIA_GATEWAY_KEY` production/preview variable through process memory/stdin. Do not print it, use shell arguments for its value, commit it or place it in a public environment variable.
6. Run `npm test` and `npm run build`, verify the widget in Firefox, then commit/push the task branch and deploy with `vercel --prod --yes` from the CUSI-linked worktree. Verify the public status, the four homepages, a secondary route and real AI responses.

The new database stores only consented CUSI messages. No test creates an order, makes a charge or submits a prospect to a CRM.

## Small order form inside Olivia

`components/OliviaChat.tsx` contains the entire compact order experience. Its Commander button replaces the conversation area with a two-column form containing exactly eight required contact/address fields: first name, last name, email, phone, address, city, postal code and country. Back returns to the conversation. Closing/reopening the chat retains unsent details. The homepages have only a compact chat invitation at `#pedidos`, without a page order form. Catalog and header ordering actions open the chat directly via `lib/olivia-order.ts`; a catalog selection supplies the arrangement context.

For explicit ordering intent, the 3.6 system instructions emit the internal `[CUSI_ORDER_FORM]` marker. The backend strips it before saving/displaying the reply and returns the supported `open_order_form` action. The same-origin gateway forwards only that allowlisted UI action. The chat opens the small form automatically, without navigation. Neither the marker nor a page-form URL appears in the human reply.

Requests use the existing `https://formspree.io/f/xqewoabn` endpoint with the eight Spanish field identifiers, locale, consent, selected arrangement when present, and up to twelve recent conversation messages for order context. There are no upload, quantity, date or extra gift-detail fields in this form. The browser validates required fields and email; submission is locked while sending. Only a successful JSON acknowledgement displays the sent-request message. Errors preserve details for retry. CUSI must still confirm the request before payment; this is not a paid WooCommerce order.

Firefox checks intercept every Formspree request and check the eight-field inline form in ES/FR/EN/IT, catalog context, no navigation, missing/invalid fields, draft persistence, retries, leading-zero postal codes, automatic intent and compact desktop/mobile layouts. No verification sends a test request to the merchant. Formspree inbox delivery and account settings are not independently verified by these browser checks. Six gateway tests and six isolated backend tests cover session/tenant isolation and the supported order-form action, including removal of the internal marker from saved conversation history.

## Rollback and remaining delivery work

The production deployment before this update is `dpl_Haacj1We7YAhmahx7qq9UB5sTUbZ` (`cusi-2-f4r2l2cey-olivier-steineur.vercel.app`). Retain it for Vercel rollback. The proxy configuration before adding `/cusi/` is retained at `/opt/o7/backups/cusi-olivia36/olivia-private-chat.before.conf`; do not restore the entire file over later changes from other sites. Removing only CUSI's prefix and stopping its Compose project leaves all other services intact. Never delete the database volume as part of rollback.

The separate dev checkout remains on its existing branch. The 18 November 2026 server check confirmed that Google Routes has no configured key and the distance calculator is disabled. The proposed origin still needs validation with its correct postcode. Olivia therefore asks CUSI to confirm shipping costs instead of inventing distances or advertising development-only tariffs.
