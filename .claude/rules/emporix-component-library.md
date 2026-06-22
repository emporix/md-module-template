---
paths:
  - "src/**/*.tsx"
---

# @emporix/component-library

Prefer library primitives over duplicating UI in local `common/` folders when a match exists.

## Commonly Used

| Export | Use for |
|--------|---------|
| `PrimaryButton` / `SecondaryButton` | Actions, dialogs, forms |
| `ToastProvider` / `useToast` | Success/error feedback (`showSuccess`, `showError`) |
| Form inputs | Typed wrappers where the library provides them |

## Import Pattern

```typescript
import { PrimaryButton, SecondaryButton, useToast } from '@emporix/component-library'
```

Load library styles once at the app entry point:

```typescript
import '@emporix/component-library/styles'
```

## When to Use Local Components Instead

- App-specific composites not yet in the library
- PrimeReact wrappers with project-specific styling
- Feature-specific layout shells (drawers, custom tabs)

Before adding a new local button/input, check if the library already exports one.

## Toasts

```typescript
const { showSuccess, showError } = useToast()

showSuccess(t('key.successTitle'), t('key.successMessage'))
showError(t('key.errorTitle'), error.message)
```

Wrap the app (or federated entry) with `ToastProvider` once.

## Loading States

`PrimaryButton` supports a `loading` prop — use it instead of manual spinner + disabled logic where possible.
