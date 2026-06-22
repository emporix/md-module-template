---
applyTo: "**/*"
---

# Git Workflow

Replace `{KEY}` with the project's Jira project key (e.g. `COP`, `MD`, `CL`).

## Branches

`{feature|fix|release}/{KEY}-###-kebab-case-description`

- `feature/` — new features, refactors, enhancements
- `fix/` — bug fixes
- `release/` — version bumps, release prep

Examples:

```
feature/COP-123-add-filter-to-step-editing
fix/MD-456-fix-date-picker-timezone
```

## Commits

`{KEY}-### Sentence case description` — present tense, specific, under ~72 chars.

```
COP-123 Add filter functionality to step editing
MD-456 Fix date picker timezone offset
```

## Before Commit

1. Run lint, typecheck, tests, and build — see **`00-core`** Quality Gates
2. Use the project's commit skill if one exists (e.g. `.cursor/skills/commit-with-validation/SKILL.md`)
3. Do not commit `.env`, credentials, or local-only config
4. Only commit when explicitly requested by the user

## Merging to master

Squash commits before merging to `master`:

- Combine branch commits into one (or a few logical) commit(s) with a clean history
- Use the PR **Squash and merge** option, or squash locally with `git rebase -i` before pushing
- The final squashed message should follow the commit naming convention above (ticket key + sentence case summary)
- Do not merge a branch with WIP, fixup, or "address review" commits as separate entries on `master`

## Production Tags

When releasing, follow the project's tagging convention. Common pattern:

```
prod-v{version}
```

where `{version}` comes from `package.json`.
