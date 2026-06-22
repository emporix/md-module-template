---
applyTo: "**/*"
---

# Core Conventions

## Technology Stack

Emporix frontend apps typically use:

- **React 18** with functional components and hooks
- **TypeScript** (strict mode)
- **Vite** for bundling and dev server
- **SCSS Modules** for component styles
- **Vitest** + Testing Library for unit tests
- **PrimeReact** for complex UI widgets (where applicable)
- **react-i18next** for translations
- **@emporix/component-library** for shared UI primitives

Read the project's `package.json` and existing code before introducing new dependencies.

## File Naming

| Kind | Pattern | Typical location |
|------|---------|------------------|
| Components | `ComponentName.tsx` + `.module.scss` | `src/components/{feature}/` |
| Pages | `PageName.tsx` + `.module.scss` | `src/pages/` |
| Models / types | `Name.model.ts` or `name.types.ts` | `src/models/` or `src/types/` |
| Helpers | `name.helpers.ts` | `src/helpers/` or `src/helpers/{domain}/` |
| Tests | `*.test.ts` / `*.test.tsx` next to source | same directory |
| Stories | `*.stories.tsx` | next to component or `src/stories/` |

## Imports (order)

1. React
2. Third-party
3. Internal components
4. Helpers / utilities
5. Types
6. Styles (`import styles from './X.module.scss'`)

## Code Style

- Functional components with hooks; default export for components, named export for utilities/types.
- **Prefer arrow functions** for callbacks, handlers, helpers, and utilities (`const fn = () => {}`). Use `function` only when hoisting is required.
- **Destructure props** at the top of components; avoid `props.xxx` in the component body.
- Avoid `React.FC<Props>` — type props on the function parameter directly.
- TypeScript strict; avoid `any`.
- Props interfaces: mark all fields `readonly`.
- Use `??` for null/undefined; use `||` only when falsy values matter.
- No `console.log` (use `console.error` / `warn` / `info`).
- Never log tokens, credentials, or other sensitive values.
- No non-null assertion (`!`) — use optional chaining and guards.
- No inline styles; use CSS Modules.
- Avoid barrel `index.ts` exports for components — prefer direct imports unless the project already uses barrels.
- Follow ESLint and Prettier (or project equivalents).

## Comments

- Do not add redundant comments that restate what the code already shows.
- Comment only when intent, algorithm, or business rules would not be clear at first read.
- Prefer clearer naming and small functions over long comments.

## State Management

- Use local state (`useState`) for component UI state.
- Prefer `useState` over `useReducer` for simple state.
- Use context or global state for shared data — keep scope minimal.
- Move static data that does not depend on props/state outside the component.

## Error Handling

- Use try/catch for async operations (API calls, file uploads, mutations).
- Do not swallow errors — log with `console.error` and surface user-facing feedback (e.g. toasts).
- Handle HTTP error status (4xx, 5xx) and network failures in the API layer — see **`api-data`** rule.
- Use React error boundaries for unexpected render failures where the project supports them.

## Business Logic

- Domain / model manipulation belongs in `src/helpers/` (or equivalent), not React components.
- Components handle UI state, call helpers, and pass results to update functions or mutations.
- All helpers must be pure and immutable — return new objects, never mutate inputs.

## Example: Pure Helper (immutable model update)

```typescript
// src/models/Order.model.ts
export type OrderItem = {
  id: string
  name: string
  quantity: number
}

export type Order = {
  id: string
  items: OrderItem[]
}

// src/helpers/order.helpers.ts
export const updateOrderItemName = (
  order: Order,
  itemId: string,
  name: string
): Order => {
  const itemIndex = order.items.findIndex((item) => item.id === itemId)
  if (itemIndex < 0) {
    return order
  }

  const updatedItems = [...order.items]
  updatedItems[itemIndex] = { ...updatedItems[itemIndex], name }

  return { ...order, items: updatedItems }
}

export type SelectOption = { key: string; label: string }

export const optionsToMap = (
  options: SelectOption[] | undefined
): Record<string, string> | null => {
  if (!options) {
    return null
  }
  return options.reduce<Record<string, string>>((acc, option) => {
    acc[option.key] = option.label
    return acc
  }, {})
}
```

## Example: Component calls helper, does not mutate model

```typescript
// src/components/order-edit/OrderItemEditor.tsx
import { useTranslation } from 'react-i18next'
import { InputText } from '@emporix/component-library'
import { updateOrderItemName } from '../../helpers/order.helpers'
import type { Order } from '../../models/Order.model'
import styles from './OrderItemEditor.module.scss'

type OrderItemEditorProps = {
  readonly order: Order
  readonly itemId: string
  readonly onOrderChange: (order: Order) => void
}

const OrderItemEditor = ({ order, itemId, onOrderChange }: OrderItemEditorProps) => {
  const { t } = useTranslation()
  const item = order.items.find((entry) => entry.id === itemId)

  const handleNameChange = (name: string) => {
    onOrderChange(updateOrderItemName(order, itemId, name))
  }

  if (!item) {
    return null
  }

  return (
    <section className={styles.section}>
      <label className={styles.label} htmlFor={`item-name-${itemId}`}>
        {t('orderEdit.item.nameLabel')}
      </label>
      <InputText
        inputId={`item-name-${itemId}`}
        value={item.name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
    </section>
  )
}

export default OrderItemEditor
```

## Do's and Don'ts

### Helpers

| Do | Don't |
|----|-------|
| Return a new object/array from helpers | Mutate `order.items[index].name = …` in place |
| Early-return unchanged input when nothing to update | Always spread even when no change is needed (unless clarity matters) |
| Colocate tests next to helpers | Put business logic inline in JSX event handlers |
| Use `??` for missing optional data | Use `\|\|` when `0` or `''` are valid values |

```typescript
// ✅ Do — immutable update
return { ...order, items: updatedItems }

// ❌ Don't — mutates input
order.items[itemIndex].name = name
return order
```

### Components

| Do | Don't |
|----|-------|
| Keep UI state local (`isOpen`, `isLoading`) | Store derived domain data in extra state |
| Call helpers, then pass result to `onOrderChange` / `updateOrder` | Assign to `order.items` directly in the component |

```typescript
// ✅ Do — helper + callback
onOrderChange(updateOrderItemName(order, itemId, name))

// ❌ Don't — mutate in component
order.items.find((i) => i.id === itemId)!.name = name
onOrderChange(order)
```

Presentation, styling, i18n, and a11y conventions live in `ui-components`, `i18n`, and `emporix-component-library` rules.

### TypeScript

| Do | Don't |
|----|-------|
| `readonly` on all props fields | Mutable props interfaces |
| Optional chaining: `item?.name ?? ''` | Non-null assertion: `item!.name` |
| Type props on the function parameter | `React.FC<OrderItemEditorProps>` |

## Quality Gates

Before finishing work, run the project's validation scripts. Typical commands:

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build        # or build:dev / build:lib — check package.json
```

## Agent Priorities

1. **Minimal diff** — match surrounding code; no drive-by refactors.
2. **Helpers for model changes** — keep business logic out of components.
3. **Immutability** — helpers return new objects; verify in tests.
4. **No `!` non-null assertions** — use `?.` and `??`.
5. **Prefer `??` over `||`** for null/undefined checks.
6. **Readonly props** on component interfaces.
7. **CSS Modules only** — no inline styles (see `ui-components`).
8. **Storybook** — add or update stories when the project uses it (see `ui-components`).

## Avoid

- Mutating helper inputs or domain models in place
- Large monolithic components — extract when a section is self-contained
- Unnecessary `useMemo` / `useCallback` for static or trivial values
- Adding dependencies without checking if the project or `@emporix/component-library` already covers the need
- Deep prop drilling — use context or composition instead
- Mixing styling approaches inconsistently
- Keeping unused components or dead code
- Component APIs with too many props — split or group props
- Raw `fetch` / API logic inside UI components — use **`api-data`** layer
- Redundant or obvious comments
- `function` declarations for helpers when arrow functions work
- Overly complex callback chains — prefer simpler patterns or refs
- Unnecessary `useImperativeHandle` when `forwardRef` is enough

## Prefer

- Arrow functions for callbacks, handlers, helpers, and utilities
- Destructuring props at the top of components
- Component composition over inheritance
- Pure, immutable helpers with immediate unit tests (see **`testing`**)
- Static data outside components when it does not depend on props/state
- Incremental refactors — small, verifiable steps
- Specific user-facing messages over generic ones
- Regular removal of unused code
- Comments only when logic might not be clear at first read

## Migration / Refactoring

When refactoring existing code:

1. Identify logic that belongs in helpers and move it.
2. Replace inline logic with helper calls.
3. Add or update helper tests in the same change.
4. Run lint, typecheck, tests, and build to verify behavior.
