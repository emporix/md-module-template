---
applyTo: "src/**/*.tsx"
---

# PrimeReact

Skip this rule if the project does not use PrimeReact.

## Menus

```typescript
const menu = useRef<Menu>(null)

<button
  type="button"
  onClick={(e) => { e.stopPropagation(); menu.current?.toggle(e) }}
  aria-haspopup
  aria-label="Options"
>
  <Menu model={items} popup ref={menu} onHide={() => setIsMenuOpen(false)} />
</button>
```

- Track `isMenuOpen` state; block parent `onClick` while menu is open
- In menu `command` handlers: call `event?.originalEvent?.stopPropagation()`
- Use `forwardRef` when parent must call `hide()` on a child menu
- Prefer project-specific menu templates in `common/` when available

## General

- Wrap PrimeReact widgets with project styling conventions (CSS Modules)
- Do not import PrimeReact CSS in individual components — load theme/styles at app entry
- Check `@emporix/component-library` before building custom wrappers for buttons, inputs, or toasts
