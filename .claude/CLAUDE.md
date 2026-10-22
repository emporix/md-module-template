# Emporix Frontend — Agent Rules Index

> Keep `.cursorrules`, `.github/copilot-instructions.md`, and `.claude/CLAUDE.md` in sync. Domain-specific rules live alongside these generic rules (see agent-specific paths below).

## Project

Emporix Management Dashboard extension module — a Module Federation remote built with React, TypeScript, and Vite.

## Directory Map

| Path | Purpose |
|------|---------|
| `src/RemoteComponent.tsx` | Federated entry — routing, providers, global styles |
| `src/App.tsx` | Standalone dev shell (mock `appState` when not embedded in the dashboard) |
| `src/main.tsx` | Local dev bootstrap |
| `src/pages/` | Route-level page components |
| `src/models/` | Domain types (`AppState`, `Product`, `ApiError`) |
| `src/helpers/` | Pure helpers (`settings.helpers.ts` for standalone dev) |
| `src/api/` | Emporix REST API layer (`@emporix/api-calls`, `bootstrap.ts`) |
| `src/context/` | `ExtensionProvider` — host `tenant`, `language`, `token` |
| `src/translations/{locale}/` | i18n keys (react-i18next) |
| `vite.config.ts` | Module Federation config, CORS, shared dependencies |

## Generic Rules (from frontend-ai-rules)

These rules are maintained centrally in the [frontend-ai-rules](https://github.com/emporix/frontend-ai-rules) repository.

| Cursor (`.cursor/rules/`) | Copilot (`.github/instructions/`) | Claude Code (`.claude/rules/`) | When loaded |
|------|------|------|-------------|
| `00-core.mdc` | `00-core.instructions.md` | `00-core.md` | Always — stack, helpers, quality gates, agent priorities |
| `ui-components.mdc` | `ui-components.instructions.md` | `ui-components.md` | Component and page work |
| `testing.mdc` | `testing.instructions.md` | `testing.md` | Test files |
| `api-data.mdc` | `api-data.instructions.md` | `api-data.md` | API / service layer |
| `npm-dependencies.mdc` | `npm-dependencies.instructions.md` | `npm-dependencies.md` | `package.json` / lockfiles — semver only; no `file:` or git URLs |
| `performance.mdc` | `performance.instructions.md` | `performance.md` | Component performance |
| `git-workflow.mdc` | `git-workflow.instructions.md` | `git-workflow.md` | Commits / branches |
| `emporix-component-library.mdc` | `emporix-component-library.instructions.md` | `emporix-component-library.md` | Shared UI primitives |
| `i18n.mdc` | `i18n.instructions.md` | `i18n.md` | Translations |
| `primereact.mdc` | `primereact.instructions.md` | `primereact.md` | PrimeReact widgets (if applicable) |
| `module-federation.mdc` | `module-federation.instructions.md` | `module-federation.md` | Module Federation (if applicable) |
| `contributing-global-rules.mdc` | `contributing-global-rules.instructions.md` | `contributing-global-rules.md` | After feature work / upstream rule proposals |

## Workflow Skills (from frontend-ai-rules)

| Cursor | Copilot | Claude Code | Purpose |
|--------|---------|-------------|---------|
| `.cursor/skills/contribute-global-rule/` | `.github/skills/contribute-global-rule/` | `.claude/skills/contribute-global-rule/` | Open PR in frontend-ai-rules after approved lesson |

## Project-Specific Rules

<!-- CUSTOMIZE: List rules added locally for this project -->
| File | When loaded |
|------|-------------|
| `md-extension-migration.md` | Migration work for MD→md-extensions remote extraction |
| `extension-module-template.md` | Local extension module overrides and migration patterns |

<!-- CUSTOMIZE: Replace KEY with your Jira project key -->
**Git:** `{feature|fix|release}/{KEY}-###-kebab-description` branches, `{KEY}-### Sentence case description` commits — details in `git-workflow`.
