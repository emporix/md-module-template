---
name: md-module-extraction
description: >-
  Extract a Management Dashboard module into an md-extensions federated remote.
  Use when the user mentions "extract MD module", "migrate module to md-extensions",
  "federated module", COP-5597 epic work, or external-module feature toggles.
---

# MD Module Extraction

> **Canonical location:** `md-extensions/.cursor/skills/md-module-extraction/` (mirror to `.claude/skills/` and `.github/skills/`; also synced in frontend-ai-rules).  
> **Host wiring rules:** `management-dashboard/.cursor/rules/federated-module-wiring.mdc`  
> **Remote rules:** `md-extensions/.cursor/rules/md-extension-migration.mdc`, `md-extension-port-validation.mdc`  
> **Hooks:** `md-extensions/.cursor/hooks.json`

Step-by-step workflow for porting an MD module to `md-extensions`.

**Detail docs** (do not restate here — link instead):

| Doc | SoT for |
|-----|---------|
| `docs/MODULE_MIGRATION_PLAYBOOK.md` | Policy, federation contract, AppState matrix, provider stack, QA, Firebase, decisions log |
| `docs/REUSABLE_FROM_USERS_AND_GROUPS.md` | Tier 1/2/3 copy inventory (what to take, adapt, skip) |
| `docs/MIGRATED_MODULES.md` | Registry of extracted remotes (update after every migration) |
| [reference.md](reference.md) | FAQ, validation greps, anti-patterns, local dev loop |

**Canonical scaffold:** clone [md-module-template](https://github.com/emporix/md-module-template) branch **`md-module-migration`**, absorb into `md-extensions/{kebab}/` (remove nested `.git`). Align Tier 1 with **all playbook-aligned remotes** in `MIGRATED_MODULES.md` (not U&G alone; not `products`; not template `master`).

**Pilots so far:** see `MIGRATED_MODULES.md`.

## Pre-flight

1. Confirm scope: which routes **move** vs **stay** in MD; list **sibling consumers** that import the module folder.
2. List MD files those consumers still need — cleanup must retain them (and re-home any shared i18n keys).
3. Pick federation `name` = MD route `key` (camelCase).
4. Pick a **unique local Vite port** (claim from `MIGRATED_MODULES.md` "Next free local port").
5. Run audit greps (playbook §7 + below).
6. Verify CL exports every PrimeReact / MdDataTable replacement; prefer **CL ≥ 2.2.0** for `ConfirmBox` / `BackButton` / `DateValue`.
7. Align `@emporix/api-calls` semver with call signatures used by the module.
8. Decide Mode A (permanent `url:`) vs Mode B (GateComponent + toggle). Prefer Mode A when there is no useful built-in fallback.

```bash
# Cross-module imports
rg "from ['\"].*modules/(?!{ThisModule})" management-dashboard/src/modules/{module}/

# PrimeReact / MdDataTable inventory
rg "from ['\"]primereact|MdDataTable|ProductDataProvider|InputField" management-dashboard/src/modules/{module}/

# Sibling / i18n consumers before cleanup
rg "from ['\"].*{module}|usersAndGroups\." management-dashboard/src --glob '!*.md'
```

## Phase 0 — Scaffold

Clone template into `md-extensions/`, absorb, rename federation `name` + ports + package. Details: playbook §1 "Scaffold starter".

Key checks: `strictPort: true`, `"dev": "vite --mode dev"`, `VITE_API_URL` (not `BASE_URL`), published CL semver, no nested `.git`.

**Scaffold parity check** — `diff -rq` vs playbook-aligned remotes; reconcile unexpected deltas before domain work.

## Phase 1 — Tier 1 infrastructure

See `REUSABLE_FROM_USERS_AND_GROUPS.md` Tier 1 tables and `MIGRATED_MODULES.md` for source remotes. Minimum:

- Entire `src/components/shared/` (lean `InputField` — never MD `InputField`)
- CL ≥ 2.2.0 → import `ConfirmBox`, `BackButton`, `DateValue`, `ProgressSpinner` directly; delete local copies
- SCSS Modules for feature UI (no global/unscoped styles)
- Providers, hooks, `api/bootstrap.ts`, models, `translations/*/global.ts` — see REUSABLE tables

### Promote-to-CL check (before copying shared UI)

When a UI component already lives in a prior remote:

1. If CL exports it → import directly (no wrapper unless LocalizedInput-style deps).
2. If only local remote copies exist → **ask the user**: migrate to CL now (skill `migrate-to-component-library`, Pattern A/B) or keep a local copy?
3. Do not silently third-copy.

## Phase 2 — Domain port

**Green-field:** copy in-scope MD pages/components/contexts only. Never copy another module's domain folders.

**Derived remote** (same domain, reduced scope — e.g. customer-groups from U&G): follow playbook §11. Strip leaf screens only; keep shared models/hooks; re-diff MD for subtype fields.

Always: rewrite PrimeReact → CL; no `primereact` deps/CSS; replace `useTenant()` → `useDashboardContext().tenant`; Jest → Vitest; Hash-relative routes; `src/constants/paths.ts`.

## Phase 2b — Remote wiring

Provider stack (outer → inner) — see playbook §4 for full template.

Sync: `i18n.changeLanguage(appState.language)` in `RemoteComponent`.

## Phase 3 — MD host wiring (hard gate)

Follow **`management-dashboard/.cursor/rules/federated-module-wiring.mdc`** (SoT for host patterns).

| Mode | When |
|------|------|
| A — permanent remote | No useful built-in fallback |
| B — toggle rollout | Parallel built-in + remote |

Always: `VITE_{MODULE}_URL` in all MD `.env.*`; grep i18n namespace before deleting; validate federation triangle (see reference.md § Validation greps).

Do **not** mark Phase 3 done because the remote exists — greps must pass.

## Phase 4 — QA gates

**Extension:** `npm run typecheck && npm run lint && npm run test:run && npm run build:dev`

**MD:** `npm run build -- --mode stage && npm run lint && npm run test`

Plus post-port anti-pattern greps (see reference.md § Validation greps).

## Phase 5 — Cleanup (after sign-off)

- Remove built-in code that only served the extracted route(s).
- **Retain** files still imported by sibling modules.
- Delete `dist/*.js` under MD module folder.
- Switch to ExternalModule-only if using Mode B.
- Update playbook decisions log.

## Phase 6 — Firebase + CI (before first deploy)

Create Hosting sites, register `.firebaserc` + `firebase.json`, copy workflow YAMLs, confirm lockfile resolves CL from npm. Details: playbook §9.

## Phase 7 — Cross-model review + knowledge capture

Bugbot + second model on full diff. Append 1–3 rows to playbook decisions log. Update this skill if steps were wrong.

**Required registry update:** add/refresh row in `docs/MIGRATED_MODULES.md` + bump "Next free local port". Refresh `REUSABLE_FROM_USERS_AND_GROUPS.md` if Tier 1 inventory changed.
