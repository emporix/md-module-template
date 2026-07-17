# Emporix extension module

## Introduction

This is a module template designed for the Emporix platform. It is a React application that is built with Vite. It is based on the module federation concept described in [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) repository.

This implementation is a simple example of a module built for most common use cases.

The main goal was to provide a minimal setup for a module that can be used as a starting point for more complex modules.

## AppState

When the module is embedded in the Management Dashboard, the host passes an `appState` prop to `RemoteComponent`. The dashboard builds this object in `ExternalModule` and forwards it through module federation (`DynamicComponent`).

| Field | Type | Description |
|-------|------|-------------|
| `tenant` | `string` | Current tenant identifier. |
| `language` | `string` | UI language from the dashboard (for example `en` or `de`). |
| `token` | `string` | JWT access token for Emporix API calls. |
| `currency` | `Entry` | Active currency (`id`, `label`, `default`, `required`). |
| `contentLanguage` | `string` | Content/catalog language selected in the dashboard. |
| `user` | `User` | Logged-in user (`userId`, optional `firstName` / `lastName` / `email`, `termsAndConditions`). |
| `onError` | `(error: unknown) => void` | Host error handler — call it when API requests fail; the dashboard uses it to re-authenticate on `401` responses. |
| `emporixApiUrl` | `string \| null` | Base URL of the Emporix API configured in the host (`VITE_API_URL`). `null` when the host has no API URL configured. |

The `emporixApiUrl` field was added in [management-dashboard#1592](https://github.com/emporix/management-dashboard/pull/1592) (COP-5905). It lets extensions use the same API endpoint as the dashboard instead of baking the URL into the remote build.

### Using AppState in this template

- **Type** — `src/models/AppState.model.ts` defines the subset used by this template (`tenant`, `language`, `token`). Extend it when you need additional host fields such as `emporixApiUrl`, `user`, or `currency`.
- **Context** — `RemoteComponent` wraps routes with `ExtensionProvider`; read values via `useExtensionContext()` in pages and components.
- **API URL** — standalone dev uses `VITE_API_URL` from `.env` (see `src/api/bootstrap.ts`). When embedded, prefer `appState.emporixApiUrl` when present and fall back to `VITE_API_URL` for local preview.
- **Standalone dev** — `App.tsx` prompts for `tenant`, `token`, and `language` and passes them as `appState`; host-only fields are not available outside the dashboard.

## AI and code-assistant rules

Coding standards come from the shared [frontend-ai-rules](https://github.com/emporix/frontend-ai-rules) package. Generic rules and index files are **not committed** to this repository — they are downloaded and customized on `npm install` via the `postinstall` script.

| Agent | Index file (generated) | Generic rules (generated) | Project rules (in repo) |
|-------|------------------------|---------------------------|-------------------------|
| **Cursor** | `.cursorrules` | `.cursor/rules/*.mdc` | `.cursor/rules/extension-module-template.mdc` |
| **GitHub Copilot** | `.github/copilot-instructions.md` | `.github/instructions/*.instructions.md` | `.github/instructions/extension-module-template.instructions.md` |
| **Claude Code** | `.claude/CLAUDE.md` | `.claude/rules/*.md` | `.claude/rules/extension-module-template.md` |

Run `npm install` (or `npm run sync:ai-rules`) after cloning to generate index files and generic rules locally.

> **Note:** Synced files are overwritten on install. Do not edit `00-core`, `api-data`, etc. — add project-specific rules in uniquely named files instead (for example `extension-module-template.*`).

## Development

### Environment variables

Copy `.env.example` to `.env` and set the required variables:

- **VITE_API_URL** – Base URL for the Emporix API (e.g. `https://api-develop.emporix.io`). Used for product list and detail requests.

### Prerequisites
To get started, install the dependencies:

```bash
npm install
```

Before committing, run `npm run lint`, `npm run typecheck`, and `npm run test:run` to ensure the project passes checks.

### Testing module

To test it locally with the Emporix Management Dashboard, you first have to enable CORS in the Management Dashboard. To do this add the following to the `vite.config.ts` file:

```typescript
  server: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
  preview: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
```


Then build the project:

```bash
npm run build
```

and then start the local server:
```bash
npm run preview
```

You also need to add the module to the Management Dashboard:
- open the Dashboard
- go to `Administration/Extensions` page
- click `ADD NEW EXTENSION` button
- provide the name of the module
- enable module 
- provide the URL to the `remoteEntry.js` file (`http://localhost:4173/assets/remoteEntry.js`)
- add package name for the module - any name of your choosing. It should be a unique name for this tenant (e.g. `ordersmodule`)

You can find the Management Dashboard extensions documentation at [Administration - Extension Guides](https://developer.emporix.io/ce/management-dashboard/administration/extensions) and [Management Dashboard - Extension Guides](https://developer.emporix.io/ce/management-dashboard/administration/extensions).

### Seting up MCP Server with Emporix documentation
Click on the link to the Emporix documentation:

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=emporixdocs&config=eyJ1cmwiOiJodHRwczovL2RldmVsb3Blci5lbXBvcml4LmlvL2FwaS1yZWZlcmVuY2VzL35naXRib29rL21jcCIsImhlYWRlcnMiOnt9LCJ0eXBlIjoiaHR0cCJ9)

You can also set up MCP Server manually with Emporix documentation by adding the following to your .mcp.json file:

```json
 "emporixdocs": {
    "url": "https://developer.emporix.io/api-references/~gitbook/mcp",
    "headers": {},
    "type": "http",
  },
```


### Deploying

In order to use the module in the Emporix Management Dashboard, deploy it to a hosting service and then provide the URL to the `remoteEntry.js` in the Emporix Management Dashboard.

App hosting should have CORS set up to allow the module to be loaded from emporix domain.
Example of CORS configuration for Firebase hosting:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      }
    ]
  }
}
```

### Testing standalone module
This project can be run locally outside of Management Dashboard using the following command:

```bash
npm run dev
```

You will be requested to provide app context on the start if you access the localhost-url directly:
- tenant name
- auth token (JWT token)
- language  ('en' or 'de')

## Customizing the module

This module template uses [PrimeReact](https://www.primefaces.org/primereact-v8) for UI components and [PrimeFlex](https://primeflex.org) for styling.
But, the default styling is inherited from the Management Dashboard.

You are free to use your own UI libraries or styling.
If so, you can remove PrimeReact and PrimeFlex from the package.json file.
```bash
    "chart.js": "^4.4.7",
    "primeflex": "^3.1.3",
    "primeicons": "^6.0.0",
    "primereact": "^8.7.0",
    "quill": "^2.0.3",
```
Then remove import statements from the `App.tsx` file:
```bash
import RemoteComponent from './RemoteComponent'
import { Button, Card, InputText } from 'primereact'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
```
and all occurrences in the component.

and also from `RemoteComponent.tsx` file remove:
```bash
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
```
