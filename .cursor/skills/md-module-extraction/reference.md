# MD Module Extraction — Reference

## Dependency tiers

| Tier | Port strategy | Examples |
|------|---------------|----------|
| Host shell | Receive via AppState / DashboardContext | tenant, token, language, onError, contentLanguage, currency |
| Layout composites | Copy from U&G `components/shared/` | HeaderSection, SectionBox, FormGrid, lean InputField |
| Primitives | CL rewrite (≥ 2.0.0) | InputText, Dropdown, DataTable, Tabs, Dialog, ProgressSpinner |
| Domain logic | Copy + adapt imports | pages, contexts, helpers |
| Permissions | Port slim PermissionsProvider | hasPermission, templates, syncUserAccessControls |
| Never copy | Find alternative | MD `InputField` (ProductDataProvider), host absolute paths |

## AppState FAQ

**Q: Should permissions be in AppState?**  
A: No. Port slim `PermissionsProvider` using token + tenant from DashboardContext. (Ignore products if it still passes permissions.)

**Q: Should the remote fetch Ory session?**  
A: No. Host may pass optional `user` for contract compatibility only.

**Q: contentLanguage / currency?**  
A: Required in AppState. Seed ConfigurationProvider and sync on `appState` changes.

**Q: InputField or FormField?**  
A: Copy U&G lean `InputField` from `components/shared/InputField.tsx`. Never MD `InputField`. There is no CL `FormField` replacement for that wrapper.

## MD host wiring modes

**SoT for host patterns:** `management-dashboard/.cursor/rules/federated-module-wiring.mdc`

| Mode | Pattern | When |
|------|---------|------|
| A | `url: process.env.VITE_{MODULE}_URL` → `parseRoute` → ExternalModule | Permanent remote / simple modules |
| B | GateComponent: toggle ON → children (ExternalModule), OFF → `fallback` (built-in) | Parallel rollout |
| Post-cleanup | ExternalModule only | After sign-off; remove employee-only built-in code |

Toggle name: `{kebab-module-name}-external-module`  
Env: `VITE_{SCREAMING_SNAKE}_URL` → `https://{host}/assets/remoteEntry.js`  
Local: `http://localhost:5173/assets/remoteEntry.js`

## Router sharing note

Host Vite often shares `react-router-dom`; remotes share/import `react-router` (v7). Match the **pilot U&G** remote (`react-router` in `shared` + imports). Do not invent a third package mix without verifying federation at runtime.

## products vs users-and-groups

| Topic | products | users-and-groups (SoT) |
|-------|----------|------------------------|
| Scaffold source | Avoid for new ports | **Use this** |
| PermissionsProvider | May vary / AppState | Required remote provider |
| Customer scope exclusion | N/A | Customer Groups stay in MD |
| PrimeReact surface | Lower | Higher |

## Path helpers

Use `src/constants/paths.ts` with Hash-relative helpers (e.g. `USERS_PATH`, `groupsPath(id)`).  
Do **not** hardcode `/administration/users-and-groups/...` inside the remote.

## Sibling-route retention (cleanup)

Before deleting MD module files, map imports from routes that **stay** in MD:

```bash
# Example: Customer Groups still needs GroupsTable, Group.page, Group.provider, …
rg "from ['\"].*usersAndGroups" management-dashboard/src/modules/usersAndGroups/CustomerGroups*
rg "customerGroups|CustomerGroups" management-dashboard/src/router/module-routes.tsx
```

Retain every file those routes need. Deleting the whole folder breaks siblings.

## Validation greps (run after domain port)

Scope greps to `src/`, `vite.config.ts`, `package.json`, and `.env*` — **not** README / migration notes (docs often mention anti-patterns by name and create false positives).

```bash
MODULE=users-and-groups   # kebab folder
KEY=usersAndGroups        # camelCase federation name
SRC="md-extensions/$MODULE/src"

# Expect ZERO matches:
rg "from ['\"]primereact|from ['\"]primeicons|MdDataTable|useTenant\(" "$SRC"
rg "VITE_API_BASE_URL" "md-extensions/$MODULE" -g '!*.md'
rg "permissions\??:" "md-extensions/$MODULE/src/models/AppState"*
rg "administration/" "$SRC/constants" "$SRC/RemoteComponent.tsx"
rg "jest\.(mock|requireActual)" "$SRC"

# Expect REQUIRED matches:
rg "name:\s*'$KEY'" "md-extensions/$MODULE/vite.config.ts"
rg "VITE_API_URL" "md-extensions/$MODULE/src" "md-extensions/$MODULE/.env"*
rg "@emporix/component-library/styles" "$SRC/RemoteComponent.tsx"

# Parity / unexpected drift (scaffold or same-module dry-run):
diff -rq md-extensions/users-and-groups "md-extensions/$MODULE" \
  --exclude node_modules --exclude dist --exclude .git --exclude .vite \
  --exclude package-lock.json --exclude '*.md'

# Lockfile: fail if CL is a local link
rg '"node_modules/@emporix/component-library"' -A2 "md-extensions/$MODULE/package-lock.json" | rg '"link":\s*true' && echo FAIL_LOCAL_CL_LINK

# MD wiring (Phase 3 hard gate):
rg "key:\s*'$KEY'" management-dashboard/src/router/module-routes.tsx
rg "VITE_.*_URL" management-dashboard/.env*
```
## Common anti-patterns

- Scaffolding from `products` for permissions/AppState
- Claiming parity with pilot from file counts alone (skipping `diff -rq`)
- Copying U&G domain folders when extracting a **different** MD module
- Leaving scaffold leftovers (“product list” in `.env.example` / README)
- Dropping U&G `.gitignore` env ignore rules when copying skeleton
- Running anti-pattern greps on `*.md` notes (false positives)
- Federation name `extension` or mismatch with route key
- `BrowserRouter` inside remote
- Copying MD `InputField` / leaving `ProductDataProvider` imports
- Putting permissions on AppState
- Porting Customer Groups “because same folder”
- Host absolute paths in HashRouter
- Adding `primereact` to remote `package.json` “to make DataTable work”
- Committing `file:../../component-library` or lockfile `"link": true`
- Assuming Firebase works from `.firebaserc` alone (create Hosting sites first)
- Marking migration done when only the remote exists (MD env + route wiring missing)
- Deleting whole MD module folder while siblings share UI
- Leaving `dist/*.js` artifacts in MD module folder
- Jest syntax in Vitest tests
- Using `VITE_API_BASE_URL` instead of `VITE_API_URL`

## Local dev loop

```bash
# Terminal 1 — remote
cd md-extensions/users-and-groups && npm run dev

# Terminal 2 — host
cd management-dashboard && npm run serve
# .env.local-dev: VITE_USERS_AND_GROUPS_URL=http://localhost:5173/assets/remoteEntry.js
# Enable toggle on dev tenant if using Mode B
```

## File copy order (next module)

1. U&G scaffold minus Tier 3 domain folders  
2. `RemoteComponent.tsx` provider stack (swap routes)  
3. `vite.config.ts` (change `name` only)  
4. `api/bootstrap.ts` + `hooks/api/*` pattern  
5. `translations/*/global.ts`  
6. Domain port + CL rewrite  
7. Firebase workflow trio + hosting sites  
8. MD Mode A or B wiring + env matrix  
