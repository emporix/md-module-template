# Extension Module Template

Emporix **Management Dashboard extension module** — Module Federation remote. Generic rules come from [frontend-ai-rules](https://github.com/emporix/frontend-ai-rules). This file holds **overrides and template-only** conventions.

## Overrides (this project wins over global rules)

| Topic | Global rule | This project |
|-------|-------------|--------------|
| API env var | `VITE_API_BASE_URL` (`api-data`) | `VITE_API_URL` — see `.env.example` |
| API auth | Generic `fetch` example | `emporix-tenant` header + `Authorization: Bearer {token}`; pass `tenant`/`token` from `useDashboardContext()` into API functions |
| API errors | Inline `ApiError` in api module | `ApiError` from `src/models/ApiError.model.ts`; handle empty response bodies before `JSON.parse` |
| UI library | `@emporix/component-library` (`emporix-component-library`) | **PrimeReact + PrimeFlex only** — package not installed |
| i18n keys | Hierarchical (`feature.section.label`) | Match existing **flat** keys (e.g. `t('products')`) |
| Quality gates | `npx tsc --noEmit`, `npm run test` (`00-core`) | `npm run typecheck`, `npm run test:run` |

Shared wrapper: `callApi` in `src/api/products.api.ts`.

## Host integration

- Host passes `tenant`, `language`, `token` via `appState` prop on `RemoteComponent`
- Use **`HashRouter`** (not `BrowserRouter`) when embedded in the dashboard
- `DashboardProvider` wraps routes; read host values with `useDashboardContext()`
- Sync language on host change: `i18n.changeLanguage(appState.language)` in `RemoteComponent`
- Never hardcode tenant or token

```typescript
<DashboardProvider appState={appState}>
  <HashRouter>
    <Routes>...</Routes>
  </HashRouter>
</DashboardProvider>
```

## Standalone local development

Outside the dashboard (`npm run dev`):

- `main.tsx` → `App.tsx` shows a settings dialog, then mounts `RemoteComponent`
- `settings.helpers.ts` persists `tenant`, `language`, `token` in `localStorage`
- PrimeReact **theme** CSS in `App.tsx` only; **PrimeFlex + PrimeIcons** in `RemoteComponent.tsx` only

## Project config (`vite.config.ts`)

- Register `remoteEntry.js` in Administration → Extensions
- `cssCodeSplit: false`
- Shared deps must match the host: `react`, `react-dom`, `react-router`, `react-i18next`, `chart.js`, `quill`
- CORS allows `https://admin.emporix.io` for server and preview

## UI note

Default styling is inherited from the Management Dashboard host when embedded.
