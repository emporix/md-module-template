---
applyTo: "src/components/**,src/pages/**"
---

# Performance

## Memoization

- Memoize expensive components with `React.memo` when profiling shows unnecessary re-renders.
- Use `useMemo` / `useCallback` only when there is a measured or clear benefit — not for static or trivial values.
- Always provide correct dependency arrays for `useEffect`, `useMemo`, and `useCallback`.

## Code Splitting

- Lazy-load heavy or route-level components with `React.lazy` and `Suspense` when appropriate.
- Do not lazy-load small leaf components without reason — balance bundle size vs complexity.

## Data Fetching

- Avoid duplicate fetches — use context providers, React Query, or SWR caching where the project already uses them.
- Prefer deriving values from existing state/props over storing duplicate derived state.

## Lists and Rendering

- Use stable `key` props on list items (prefer entity ids over array index).
- Extract static subtrees or data outside the component when they do not depend on props/state.
