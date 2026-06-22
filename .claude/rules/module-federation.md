---
paths:
  - "**/RemoteComponent.tsx"
  - "**/vite.config.ts"
  - "**/main.tsx"
---

# Module Federation

Skip this rule if the project is not a federated micro-frontend.

## Vite Config

- Expose remote entry via `@originjs/vite-plugin-federation` (or project equivalent)
- Set `build.target: 'esnext'` and `modulePreload: false` when using federation
- **Do not add new shared dependencies without verifying the host app also shares them**

## Entry Point

- Federated apps expose a single remote component (e.g. `RemoteComponent.tsx`)
- Import global styles once at the remote entry — not in leaf components:
  - PrimeReact / PrimeFlex / PrimeIcons CSS (if used)
  - App theme and `@emporix/component-library/styles`

## Provider Hierarchy

- Wrap the remote tree with required providers (data, toast, i18n, feature contexts)
- Order matters — data providers should wrap feature routes
- Document provider order in the project index when adding new providers

## Local Dev

- Provide a standalone dev shell (`main.tsx`) for local development without the host
- Use environment-specific BFF/API endpoints via Vite modes when applicable
