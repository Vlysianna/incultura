# Front-end structure (scaffold)

This file describes the scaffold added to the repository to support the gamification/digitalisasi budaya front-end.

Top-level folders added/used (inside `src`):

- `components/` - shared UI components and layout.
  - `ui/` - small primitive components (Avatar, Button, etc.)
- `context/` - React Context providers (authentication, app state).
- `hooks/` - reusable hooks (e.g. `useFetch`).
- `services/` - api client wrappers and services.
- `utils/` - small helper functions (formatters).
- `pages/marketplace/` - example feature page and components.

Files added in this scaffold (purpose):

- `src/components/Layout.js` - simple page layout wrapper.
- `src/components/ui/Avatar.js` - primitive avatar component.
- `src/components/MarketplaceCard.js` - item card for marketplace.
- `src/context/AppContext.js` - app-level context and provider.
- `src/hooks/useFetch.js` - small data fetching hook.
- `src/services/api.js` - thin fetch wrapper for API calls.
- `src/utils/format.js` - currency formatter used across app.
- `src/pages/marketplace/index.js` - example marketplace page.

Notes and next steps:

- The scaffold uses Next.js pages and Tailwind classes already present in the repo.
- Replace `fetch('/api/...')` paths with your real backend endpoints or Next.js API routes.
- Convert `img` to `next/image` if you want optimized images (recommended for production).
- Add tests under `__tests__/` and update `package.json` scripts when you add a test runner.
