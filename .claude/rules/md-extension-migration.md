---
paths:
  - "**/RemoteComponent.tsx"
  - "**/vite.config.ts"
  - "**/AppState.model.ts"
  - "**/src/**"
---

# MD Extension Migration (remote)

Playbook: `docs/MODULE_MIGRATION_PLAYBOOK.md`. Copy inventory: `docs/REUSABLE_FROM_USERS_AND_GROUPS.md`.
**Canonical scaffold:** `md-extensions/users-and-groups` (not `products`).

## Federation

- Vite `name` ≡ MD route `key` ≡ `ExternalModule.moduleName` (camelCase).
- Expose `./RemoteComponent` only. Never name the remote `extension`.
- Keep `cssCodeSplit: false`. Share `react`, `react-dom`, `react-router`, `react-i18next`.

## AppState

Required: `tenant`, `language`, `token`, `onError`, `contentLanguage`, `currency`.
Optional: `user` (host Ory — do not fetch Ory in remote).
**Never** put `permissions` on AppState — port `PermissionsProvider`.

## Router

- `HashRouter` inside remote; host uses `BrowserRouter`.
- Hash-relative paths (`/`, `/users/:id`) via `src/constants/paths.ts` — **not** host `/administration/...`.
- Sync `i18n.changeLanguage(appState.language)` on host language changes.

## Provider order

```
ToastProvider → DashboardProvider → PermissionsProvider → ConfigurationProvider
→ SitesProvider → UIBlockerProvider → HashRouter → RefreshValuesProvider → pages
```

## UI policy

- Primitives: `@emporix/component-library` only (CL ≥ 2.0.0 bundles Pattern B Prime CSS).
- Copy layout composites from U&G `components/shared/` (HeaderSection, SectionBox, FormGrid, ConfirmBox, …).
- **Never** copy MD `InputField` (ProductDataProvider). Copy U&G lean `InputField`.
- No `primereact` / `primeicons` deps or CSS in the remote — only `@emporix/component-library/styles` at entry.

## API

- `VITE_API_URL` (not `VITE_API_BASE_URL`).
- Tenant/token via `useDashboardContext()` + `api/bootstrap.ts` + `@emporix/api-calls`.

## Host wiring

Do Phase 3 in **management-dashboard** per `federated-module-wiring` (Mode A / Mode B + env matrix). Remote-only ≠ done.

## Pilot

`users-and-groups` (COP-5598).
