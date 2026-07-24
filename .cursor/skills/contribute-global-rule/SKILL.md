---
name: contribute-global-rule
description: >-
  Open a PR in frontend-ai-rules with a new or updated global AI rule after
  the developer approves a lessons-learned proposal. Use when contributing
  upstream, proposing global rule improvements, or creating a frontend-ai-rules PR.
---

# Contribute Global Rule

Open a pull request in [frontend-ai-rules](https://github.com/emporix/frontend-ai-rules) after the developer approves a lessons-learned proposal from **`contributing-global-rules`**.

## Prerequisites

- Developer explicitly approved the proposed rule change.
- Draft rule text is agreed (update vs new rule, target rule name).

## Workflow

### 1. Locate the repository

Try in order:

1. Sibling directory: `../frontend-ai-rules` relative to the consumer project root
2. Existing workspace folder named `frontend-ai-rules`
3. Clone: `gh repo clone emporix/frontend-ai-rules` into a sibling path (not inside the consumer project)

### 2. Create a feature branch

From `master`:

```
feature/rules-<kebab-summary>
```

No Jira ticket required for rule-only PRs.

### 3. Apply changes (mandatory tri-format sync)

Do **not** commit until the checklist below is satisfied.

#### Updating an existing rule (e.g. `api-data`)

| Format | File |
|--------|------|
| Cursor | `cursor/rules/<name>.mdc` |
| Copilot | `copilot/instructions/<name>.instructions.md` |
| Claude | `claude/rules/<name>.md` |

#### Adding a new rule

All three rule files above **plus** add one row to the Generic Rules table in:

- `cursor/cursorrules.template`
- `copilot/copilot-instructions.md`
- `claude/CLAUDE.md.template`

#### If the change touches `00-core` or this skill

Update all mirrors:

| Asset | Cursor | Copilot | Claude |
|-------|--------|---------|--------|
| Core rule | `cursor/rules/00-core.mdc` | `copilot/instructions/00-core.instructions.md` | `claude/rules/00-core.md` |
| Contribute skill | `cursor/skills/contribute-global-rule/SKILL.md` | `copilot/skills/contribute-global-rule/SKILL.md` | `claude/skills/contribute-global-rule/SKILL.md` |

#### Format rules when copying content

- **Cursor** `.mdc` — YAML frontmatter with `description`, `globs`, `alwaysApply`
- **Copilot** `.instructions.md` — YAML frontmatter with `applyTo` (mirror globs from Cursor where applicable)
- **Claude** `.md` — optional YAML frontmatter with `paths` / `globs` if file-scoped; plain markdown if always-on

### 4. Pre-commit self-check

List every file edited. For each rule name touched, confirm all three formats exist. If any mirror is missing, add it before committing.

### 5. Commit

One focused commit. Example message:

```
Improve API error handling guidance in api-data rule
```

Only commit when the developer explicitly requests it.

### 6. Push and open PR

```bash
git push -u origin HEAD
gh pr create --title "..." --body "..."
```

PR body should include:

- **Summary** — what problem the rule solves
- **Test plan** — how other teams benefit after syncing

### 7. Return PR URL

Share the PR link with the developer.

## Failure handling

If `git push` or `gh` fails (e.g. SSH/auth), report the blocker, leave commits on the local branch, and give manual push instructions.
