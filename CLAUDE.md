### Proposed monorepo layout

```txt
fashflow/
  package.json               # workspaces + scripts
  pnpm-workspace.yaml
  turbo.json                 # optional, but recommended (Turborepo)
  .vscode/
  .editorconfig
  .gitignore
  .env                       # shared env (never commit real secrets)
  apps/
    web/                     # Next.js app (marketing + dashboard)
      public/
      src/
        app/                 # App Router
        components/
        lib/
      .env.local
      package.json
      tsconfig.json
      next.config.mjs
      tailwind.config.ts
      postcss.config.mjs
    extension/               # Plasmo or WXT extension app
      src/
        background/
        content/
        ui/                  # popup/options pages
        lib/
      .env.local
      package.json
      tsconfig.json
      plasmo.config.ts       # or wxt.config.ts
      assets/
  packages/
    shared/                  # types, schema, utilities shared by both apps
      src/
        types/               # zod schemas for Listing, User, Subscription
        utils/               # CSV parser, depop helpers, api client wrappers
        convex/              # typed callers for Convex actions/queries
      package.json
      tsconfig.json
    config/                  # optional: tsconfig/eslint/tailwind presets
      tsconfig/
      eslint/
      tailwind/
      package.json
  convex/                    # Convex backend (auth, data, actions, webhooks)
    convex/                  # Convex functions (mutations, queries, actions)
    .env.local
    convex.json
    package.json
    tsconfig.json
```

- Use `pnpm` workspaces (or `npm` workspaces) + Turborepo for caching and shared scripts.
- Keep Convex at repository root (first-class) so both `apps/web` and `apps/extension` share its types via `packages/shared/convex`.
- Centralize shared schemas (Zod), domain types, CSV utilities, and a small “client SDK” for the extension and web to call Convex.


### Build order: empty repo → MVP launch

- 0. Repo + tooling (day 0)
  - Initialize git, `pnpm` workspaces, Turborepo, TypeScript base configs, ESLint/Prettier.
  - Create `packages/shared` with Zod, types, and placeholder utilities.
  - Decision: Plasmo vs WXT. Default to Plasmo for speed and docs; switchable later.

- 1. Marketing site skeleton (apps/web)
  - Scaffold Next.js App Router + TailwindCSS.
  - Ship a minimal landing page + pricing + CTA. No auth yet.
  - Set up basic analytics and error monitoring.

- 2. Stripe setup (test mode)
  - Create Stripe account, products, and recurring prices ($10–$15/month).
  - Decide billing model: single plan with trial OR free tier with metering (MVP: single plan).
  - Generate test keys; document in `apps/web/.env.local` and `convex/.env.local`.

- 3. Convex backend bootstrap
  - Initialize Convex project; add Convex Auth (email/pass or OAuth if needed later).
  - Define data model: `users`, `subscriptions`, `usage` (optional for free tier), `audit_logs`.
  - Implement HTTP action for Stripe webhooks: handle checkout.session.completed, invoice.paid, customer.subscription.updated/deleted → update `subscriptions`.
  - Add queries/mutations: `getViewer`, `getSubscriptionStatus`, `createCheckoutSession`, `createPortalSession`.

- 4. Web ↔ Convex integration (auth + billing)
  - Add Convex provider to Next app and auth UI (login/signup).
  - Build “Billing” page: start checkout, manage portal. Gated dashboard routes using `getSubscriptionStatus`.
  - Add minimal dashboard shell (sidebar, “Connect Extension” instructions, current plan).

- 5. Shared package solidification
  - In `packages/shared`: define `Listing` schema (Zod), CSV parser, validation, Depop listing field map, error types.
  - Export typed “Convex client” functions for both web and extension; ensure zero Node-only deps.

- 6. Extension scaffold (apps/extension)
  - Scaffold with Plasmo (or WXT). Create popup UI and background worker.
  - Implement auth handshake:
    - From web dashboard, deep-link/”Connect Extension” button opens extension popup or instructs user to login on web, then extension pulls Convex auth token via a one-time device code flow or session token endpoint.
    - Store short-lived token in extension storage; implement refresh.
  - Add basic UI: status (logged-in, plan), “Bulk upload”, “Bulk edit”.

- 7. Core MVP feature: bulk upload/edit listings
  - Implement CSV import in extension using shared parsers; validate rows against `Listing` schema.
  - Content scripts to operate on Depop’s listing pages:
    - Create/edit listing fields, upload images, save changes.
    - Batch execution with rate limits, progress UI, pause/resume, and error capture.
  - Background worker orchestrates steps, retries, and communicates progress to popup UI.
  - Log anonymized events to Convex (`audit_logs`) for debugging and support.

- 8. Subscription enforcement in extension
  - On boot and periodically, call Convex `getSubscriptionStatus`; if inactive, disable bulk actions and show CTA to subscribe on web.
  - Graceful handling of expired/canceled subscriptions; cache status for offline UX.

- 9. Hardening + DX
  - End-to-end flow test: signup → checkout → dashboard → connect extension → upload/edit on Depop.
  - Handle CORS, rate limiting, and auth token refresh. Add robust error toasts.
  - Add feature flags for risky ops. Implement minimal telemetry (success/failure counters).

- 10. Packaging + publish prep
  - Build extension for Chrome (MV3) and Firefox (MV3). Verify permissions and content script matches.
  - Prepare Chrome Web Store and AMO listings (icons, screenshots, descriptions).
  - Configure Stripe live mode and production Convex deployment; rotate keys; set live webhook.
  - Smoke test in production; then soft launch.

- 11. Post-launch
  - Add usage-based limits for free tier (if desired) using `usage` table and server-enforced checks.
  - Add in-app onboarding and a feedback channel.


### Key planning docs (keep concise; living docs)

- Product spec (MVP)
  - Goals, non-goals, target user (Depop sellers), core value prop.
  - MVP scope: bulk upload/edit only; out of scope: price optimization, analytics.
- UX flows
  - Web: Landing → Signup → Checkout → Dashboard → Connect Extension.
  - Extension: Login handshake → CSV import → Review → Execute → Progress → Results.
- Technical architecture
  - Sequence diagrams: auth handshake, subscription verification, Stripe webhook flow.
  - Extension architecture: background ↔ content ↔ popup messaging; rate limiting strategy.
- Data contracts
  - Zod schemas for `Listing`, `User`, `Subscription`, `AuditLog`.
  - CSV column spec with examples and validation rules.
- API contract
  - Convex functions: inputs/outputs, errors. Token format and refresh policy.
- Operational plan
  - Environments (dev, staging, prod), env var map, secrets rotation, logging.
  - Release plan: build pipelines, versioning, store submissions.
- Risk register
  - Depop anti-automation/ToS, CAPTCHAs, UI changes, store review risks, payment edge cases.


### Integration challenges to plan early

- Auth in a browser extension with Convex
  - Challenge: Browser extensions don’t reliably share cookies; OAuth redirects are awkward.
  - Plan: Implement a token-based session for the extension obtained from the web app after user login (device code-like flow or one-time code). Store in extension storage; add refresh endpoint. Avoid long-lived tokens.
- CORS and fetch contexts
  - Challenge: Background/content scripts have different origins; CORS and CSP can block calls.
  - Plan: Centralize Convex calls in background; content scripts message the background. Whitelist Convex domain; verify fetch works in MV3 service workers.
- Stripe + Convex webhook reliability
  - Challenge: Mapping Stripe customer → Convex user, idempotency, subscription lifecycle.
  - Plan: Store `stripeCustomerId` on user, use idempotency keys, handle all subscription events, and reconcile on dashboard load. Build a manual “Sync billing” admin action.
- Subscription enforcement in extension
  - Challenge: Offline mode, delayed webhook updates, token expiry.
  - Plan: Cache last-known active status with TTL; re-check on action start. Deny privileged actions if status unknown/expired. Clear cache on 401 or token refresh.
- Depop anti-automation and DOM drift
  - Challenge: DOM changes and anti-bot measures can break flows.
  - Plan: Selector indirection (centralize selectors), progressive waits, manual mode fallback, kill-switch flag from server, and quick hotfix release process.
- Rate limits, retries, and user experience
  - Challenge: Bulk operations can be flaky (network, Depop throttling).
  - Plan: Exponential backoff, concurrency caps, resumable batches, idempotent item processing, and clear per-item status reporting.
- Cross-browser differences (Chrome vs Firefox)
  - Challenge: MV3 differences, permissions, APIs.
  - Plan: Keep minimal permissions; prefer standard APIs via `webextension-polyfill`. Test both builds in CI. Use Plasmo/WXT cross-target outputs.
- Data and privacy
  - Challenge: Handling listing data and images.
  - Plan: Keep PII minimal; process locally in extension where possible. If server-side usage is needed, document retention and add opt-in.


### Notes on the T3 decision

- If you use `create-t3-app`, skip Prisma/NextAuth and keep only Next + Tailwind. You’ll replace auth and server API with Convex.
- Alternatively, use a plain Next.js App Router scaffold for a leaner setup with Convex.


- I prepared a concrete, step-by-step plan with structure, build order, docs, and integration risks tailored to your stack and MVP. You can move your current `web` and `extension` into `apps/` and introduce `convex/` and `packages/shared/` as described. When you’re ready, I can translate this plan into exact commands and scripts.