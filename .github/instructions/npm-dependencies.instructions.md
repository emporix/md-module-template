---
applyTo: "package.json,yarn.lock,package-lock.json"
---

# npm dependencies

## Published `@emporix/*` packages

When a package is published to the **npm registry** (e.g. `@emporix/api-calls`, `@emporix/component-library`), declare it with a **semver version** in `package.json`:

```json
"dependencies": {
  "@emporix/api-calls": "0.1.6",
  "@emporix/component-library": "1.13.1"
}
```

## Do not commit `file:` local path dependencies

For **local development only**, you may temporarily link a sibling package:

```json
"@emporix/component-library": "file:../../component-library"
```

**Never commit** `package.json` or lockfile changes that use `file:`, `link:`, or other local filesystem paths for published `@emporix/*` packages.

Before committing:

1. Restore the published **semver** in `package.json` (e.g. `"1.13.1"`, not `file:../../component-library`).
2. Run `npm install` / `yarn install` to refresh the lockfile against the registry.
3. Do not stage or commit `package.json` / lockfile diffs that still contain `file:` / `link:` entries.

Agents: when switching to `file:` for local testing, revert to semver before any commit unless the user explicitly asks to commit a local link (avoid — it breaks CI and other developers).

## Do not use git URLs for published packages

Avoid `git+https://github.com/...` or `git+ssh://...` for packages that are available on npm:

```json
"@emporix/api-calls": "git+https://github.com/emporix/api-calls.git#v0.1.6"
```

Git dependencies cause problems in CI (SSH auth, missing `prepare` builds, slower installs) and are harder for other teams to consume.

## When git URLs are acceptable

- **`frontend-ai-rules`** as a `devDependency` — synced via `postinstall`; use `git+https://github.com/emporix/frontend-ai-rules.git#master` per that repo's README.
- **Unpublished forks or emergency patches** — only until a version is published to npm; then switch back to semver.

## After publishing a new library version

1. Publish the package to npm (`npm publish`).
2. Update the consumer `package.json` to the new semver (exact or caret as team convention) — not `file:`.
3. Run `yarn install` / `npm install` and commit the lockfile.
4. Do not leave temporary `file:` or git pins in `package.json` after publish.

## Lockfile

- Commit `yarn.lock` or `package-lock.json` with the npm resolution (integrity hash).
- For git `devDependencies`, ensure `resolved` URLs use **HTTPS**, not SSH, so CI can fetch without deploy keys.
