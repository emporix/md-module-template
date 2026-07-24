---
applyTo: "**/RemoteComponent.tsx,**/vite.config.ts,**/AppState.model.ts,**/src/**"
---

# Extension Module Template

Emporix **Management Dashboard extension module** — Module Federation remote. Generic rules come from `frontend-ai-rules`. This file holds **overrides and template-only** conventions.

**Reference implementation:** Users & Groups (`COP-5598`) — see `md-extensions/docs/MODULE_MIGRATION_PLAYBOOK.md` and `md-extensions/users-and-groups/src/RemoteComponent.tsx`.

## Overrides (this project wins over global rules)

| Topic | Global rule | This project |
|-------|-------------|--------------|
| API env var | `VITE_API_BASE_URL` (`api-data`) | `VITE_API_URL` — see `.env.example` |
| API auth | Generic `fetch` example | `emporix-tenant` header + `Authorization: Bearer {token}`; pass `tenant`/`token` from `useExtensionContext()` into API functions |
| API errors | Inline `ApiError` in api module | `ApiError` from `src/models/ApiError.model.ts`; handle empty response bodies before `JSON.parse` |
| UI library | `@emporix/component-library` (`emporix-component-library`) | **@emporix/component-library** — import styles once at `RemoteComponent`; `ToastProvider` at federated entry |
| i18n keys | Hierarchical (`feature.section.label`) | Match existing **flat** keys (e.g. `t('usersAndGroups.titles.main')`) |
| Quality gates | `npx tsc --noEmit`, `npm run test` (`00-core`) | `npm run typecheck`, `npm run test:run` |

Shared API client: `setApiCredentials` / `useApiCredentials` in `src/api/bootstrap.ts`.

## Host integration

- Host passes `tenant`, `language`, `token`, `contentLanguage`, `currency`, `onError` via `appState` prop on `RemoteComponent`
- Optional `user` from host Ory session — do not fetch Ory inside remote
- Use **`HashRouter`** (not `BrowserRouter`) when embedded in the dashboard
- `ExtensionProvider` wraps routes; read host values with `useExtensionContext()`
- Sync language on host change: `i18n.changeLanguage(appState.language)` in `RemoteComponent`
- Never hardcode tenant or token
- Export `RemoteComponent` **named and default** (`export { RemoteComponent }; export default RemoteComponent`). Vite federation unwraps a default-only expose to a bare function; MD `loadRemoteModule` then reads `module.default` as `undefined` (COP-6343).
- Federation `name`: `usersAndGroups` (must match MD route key)

```typescript
<ToastProvider>
  <ExtensionProvider appState={appState}>
    <PermissionsProvider>
      <ConfigurationProvider>
        <SitesProvider>
          <HashRouter>
            <Routes>...</Routes>
          </HashRouter>
        </SitesProvider>
      </ConfigurationProvider>
    </PermissionsProvider>
  </ExtensionProvider>
</ToastProvider>
```

## Standalone local development

Outside the dashboard (`npm run dev`):

- `main.tsx` → `App.tsx` shows a settings dialog, then mounts `RemoteComponent`
- `settings.helpers.ts` persists `tenant`, `language`, `token` in `localStorage`
- `@emporix/component-library/styles` in `App.tsx` (standalone) and `RemoteComponent.tsx` (federated entry)

## Project config (`vite.config.ts`)

- Register `remoteEntry.js` in Administration → Extensions
- `cssCodeSplit: false`
- Shared deps must match the host: `react`, `react-dom`, `react-router`, `react-i18next`
- CORS allows `https://admin.emporix.io` for server and preview

## UI note

Default styling is inherited from the Management Dashboard host when embedded.
