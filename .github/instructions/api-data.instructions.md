---
applyTo: "src/api/**,src/services/**,**/*.api.ts,**/*.service.ts"
---

# API & Service Layer

Skip this rule if the project uses only GraphQL or another data layer — adapt patterns to that stack instead.

## Structure & Location

- Place API logic in `src/api/` or `src/services/` (e.g. `products.api.ts`, `auth.service.ts`).
- Do not put raw `fetch` / request logic inside UI components.
- Use a shared HTTP client or fetch wrapper (base URL, headers, interceptors).

## Configuration

- Use environment variables for base URLs and keys (e.g. `import.meta.env.VITE_API_BASE_URL`).
- Never hardcode secrets or environment-specific URLs.
- Document required env vars in `.env.example` or README.

## Types

- Define request and response types for each endpoint in `src/models/`, `src/types/`, or next to the API module.
- Type API function return values (e.g. `Promise<Product>`). Avoid untyped responses.

## Error Handling

- Use try/catch for all API calls.
- Handle HTTP 4xx/5xx and network failures; throw or return typed errors for the UI layer.
- Do not swallow errors — log with `console.error` and let the caller show user feedback.

## Patterns

- Prefer `async`/`await` over raw promise chains in API modules.
- Keep API functions deterministic for a given input — side effects like token refresh belong in the shared client.
- When using React Query, SWR, or similar, put data-fetching hooks in a service/custom-hook layer; keep components thin.

```typescript
// src/api/products.api.ts
import type { Product } from '../models/Product.model'

const getBaseUrl = () => import.meta.env.VITE_API_BASE_URL as string

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: string
  ) {
    super(`API error ${status}`)
  }
}

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${getBaseUrl()}/products/${id}`)
  if (!res.ok) {
    throw new ApiError(res.status, await res.text())
  }
  return res.json() as Promise<Product>
}
```

```typescript
// In component — call API module, handle loading/error in UI
const [product, setProduct] = useState<Product | null>(null)
const [error, setError] = useState<Error | null>(null)

useEffect(() => {
  fetchProduct(id).then(setProduct).catch((err) => {
    console.error(err)
    setError(err)
  })
}, [id])
```
