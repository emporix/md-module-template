---
name: md-module-extraction
description: >-
  Extract a Management Dashboard module into an md-extensions federated remote.
  Use when the user mentions "extract MD module", "migrate module to md-extensions",
  "federated module", COP-5597 epic work, or external-module feature toggles.
---

# MD Module Extraction

> **Canonical location:** `md-extensions/.cursor/skills/md-module-extraction/` (this file when opened from that path).  
> **Host wiring rules:** `management-dashboard/.cursor/rules/federated-module-wiring.mdc`  
> **Remote rules:** `md-extensions/.cursor/rules/md-extension-migration.mdc`, `md-extension-port-validation.mdc`  
> **Hooks:** `md-extensions/.cursor/hooks.json`  
> Playbook: `md-extensions/docs/MODULE_MIGRATION_PLAYBOOK.md`. Copy inventory: `md-extensions/docs/REUSABLE_FROM_USERS_AND_GROUPS.md`.

Step-by-step workflow for porting an MD module to `md-extensions`. Full reference: [reference.md](reference.md).

**Canonical scaffold:** `md-extensions/users-and-groups` (not `products`). Prefer U&G for AppState, PermissionsProvider, Tier 1 shared UI, and provider stack.

## Pre-flight

1. Confirm scope: which routes **move** vs **stay** in MD (e.g. Customer Groups stay).
2. List MD files that **staying routes still import** from the module folder — cleanup must retain those.
3. Pick federation `name` = MD route `key` (camelCase).
4. Run audit greps (playbook §7 + below).
5. Verify CL ≥ 2.0.0 exports every PrimeReact / MdDataTable replacement.
6. Align `@emporix/api-calls` semver with call signatures used by the module.

```bash
# Cross-module imports (types/components from other MD modules)
rg "from ['\"].*modules/(?!{ThisModule})" management-dashboard/src/modules/{module}/

# PrimeReact / MdDataTable inventory
rg "from ['\"]primereact|MdDataTable|ProductDataProvider|InputField" management-dashboard/src/modules/{module}/

# Build artifacts
find management-dashboard/src/modules/{module} -path '*/dist/*'
```

## Phase 0 — Scaffold from U&G

In `md-extensions/{kebab-module}/`:

1. Copy U&G package skeleton (vite, tsconfig, eslint, standalone shell) — **not** products.
2. Immediately rename: `package.json` name, README title, `.env.example` comments (scrub “product list” leftovers).
3. `vite.config.ts`: `name` = route key; expose `./RemoteComponent`; keep `cssCodeSplit: false`; share `react`, `react-dom`, `react-router`, `react-i18next`.
4. `package.json`: pin **published** `@emporix/component-library` ≥ 2.0.0 (never `file:`); add `react-hook-form` / Testing Library if needed.
5. Keep `.gitignore` env rules from U&G (ignore `.env` / `.env.*` with `!.env.example` / stage / prod exceptions) + `.vite`.
6. Extend `AppState.model.ts` per playbook matrix — **never** `permissions` on AppState.
7. Keep standalone: `App.tsx` + `settings.helpers.ts` + `main.tsx` + `index.css`.
8. Set `VITE_API_URL` (not `VITE_API_BASE_URL`).

**Scaffold parity check** (before domain work):

```bash
diff -rq md-extensions/users-and-groups md-extensions/{module} \
  --exclude node_modules --exclude dist --exclude .git --exclude .vite \
  --exclude package-lock.json
```

Expected deltas only: package name, vite `name`, README, env comments, deleted Tier 3 domain folders. If unexpected `src/` diffs appear, reconcile before continuing.

## Phase 1 — Tier 1 infrastructure (copy from U&G)

See `REUSABLE_FROM_USERS_AND_GROUPS.md` Tier 1. Minimum:

- Entire `src/components/shared/` (lean `InputField` — **never** MD `InputField`)
- Providers: Dashboard, Permissions (slim), Configuration, Sites, UIBlocker (`UIBlcoker.tsx` typo), RefreshValues
- Hooks: `usePagination`, `useTabs`, `useCustomNavigate`, `useLocalizedValue`
- `api/bootstrap.ts` + `hooks/api/` pattern (`useDashboardContext().tenant`)
- Models: AppState, SessionUser, ApiError, Localized, Configuration, Site, Metadata
- `translations/{en,de}/global.ts`

## Phase 2 — Domain port

- Copy **in-scope** MD pages/components/contexts/helpers/hooks only.
- **Never copy another module’s domain folders** as a substitute for porting a *different* MD module (Tier 1 only from U&G). Same-module dry-runs may copy pilot domain but must document that shortcut and still run greps + `diff -rq`.
- Exclude out-of-scope paths explicitly (e.g. `CustomerGroups.*`).
- Rewrite PrimeReact / MdDataTable → `@emporix/component-library`.
- Do **not** add `primereact` / `primeicons` deps or CSS — only `import '@emporix/component-library/styles'` at RemoteComponent.
- Inline or copy cross-module types (e.g. `AccessControlDomainGroup`) into `src/models/`.
- Replace `useTenant()` → `useDashboardContext().tenant`.
- Jest → Vitest (`vi.mock`, not `jest.mock`).
- Register feature i18n; keep flat key style if matching MD.
- Hash-relative routes in `RemoteComponent` (`/`, `/users/:id`) — **not** host `/administration/...`.
- Path helpers: `src/constants/paths.ts` (Hash-relative), not host absolute `BASE_PATH`.

**Do not claim “identical to pilot” without `diff -rq`.** File counts alone are insufficient.

## Phase 2b — Remote wiring

Provider stack (outer → inner):

```
ToastProvider → DashboardProvider → PermissionsProvider → ConfigurationProvider
→ SitesProvider → UIBlockerProvider → HashRouter → ModuleShell (RefreshValues) → pages
```

Sync: `i18n.changeLanguage(appState.language)` in `RemoteComponent`.

## Phase 3 — MD host wiring (hard gate)

Follow **`management-dashboard/.cursor/rules/federated-module-wiring.mdc`** (SoT for host patterns). Summary:

| Mode | When | Pattern |
|------|------|---------|
| A — permanent remote | New module / no built-in fallback | `url: process.env.VITE_{MODULE}_URL` on route (like `statistics`) |
| B — toggle rollout | Parallel built-in + remote | `GateComponent` children=ExternalModule, `fallback`=built-in + toggle `{kebab}-external-module` |

Always:

1. `VITE_{MODULE}_URL` in **all** MD `.env.*` → `.../assets/remoteEntry.js`
2. Validate federation triangle:

```bash
rg "name:\s*'" md-extensions/{module}/vite.config.ts
rg "key:\s*'{moduleKey}'" management-dashboard/src/router/module-routes.tsx
rg "VITE_{MODULE}_URL" management-dashboard/.env*
rg "moduleName=|{kebab}-external-module" management-dashboard/src
```

Do **not** mark Phase 3 done because the remote exists — greps must pass.

## Phase 4 — QA gates

**Extension:** `npm run typecheck && npm run lint && npm run test:run && npm run build:dev`

**MD:** `npm run build -- --mode stage && npm run lint && npm run test`

Plus post-port anti-pattern greps (see reference.md § Validation greps).

## Phase 5 — Cleanup (after sign-off)

- Remove **employee-only** built-in code from MD.
- **Retain** files still imported by staying routes (Customer Groups pattern).
- Never delete the whole MD module folder if siblings share UI.
- Delete `dist/*.js` under MD module folder.
- Switch to ExternalModule-only if using Mode B.
- Update playbook decisions log.

## Phase 6 — Firebase + CI (before first deploy)

1. Create Hosting sites in each Firebase project (`emporix-{module}-develop|stage` and prod).
2. Register `.firebaserc` + `firebase.json` (CORS `*`).
3. Copy/adapt `{module}-firebase-*.yaml` workflows from U&G.
4. Confirm lockfile resolves CL from npm (`"link": true` to sibling path = fail).

## Phase 7 — Cross-model review + knowledge capture

Bugbot + second model on full diff. Append 1–3 rows to playbook decisions log. Update this skill if steps were wrong.

**Dry-run validation tip:** Same-module dry-runs that only copy the pilot stop teaching after one clean `diff -rq` (rename/scrub only). Next cycle should either (a) re-port domain from MD **without** the pilot-domain shortcut, or (b) extract a **different** MD module. Do not keep cycling blind rsyncs of U&G.

## Pilot

`md-extensions/users-and-groups` — COP-5598.
