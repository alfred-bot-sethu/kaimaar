# Next Steps for Kaimaar Development

## Current Status

✅ **Scaffold Complete**: Production-grade Next.js 14 marketplace structure is ready
- Clean folder structure with separation of concerns
- Type-safe components and hooks
- Mock data with 12 realistic Singapore listings
- Three working demo pages (home, detail, sell form)
- TanStack Query + Zustand configured
- Tailwind + shadcn/ui primitives

## To Get Running Locally

```bash
# Install dependencies (one-time)
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Open browser to
http://localhost:3000
```

**That's it** — the mock data is baked in, so everything works immediately.

## Environment Variables

For now, you can leave `.env.local` empty and the app works with mock data.

When you're ready to connect real services, fill in:
- Supabase credentials (database + auth)
- Clerk auth keys
- Typesense search host/key
- Mux video credentials

See `.env.local.example` for the template.

## Roadmap (Recommended Order)

### Phase 1: Database Integration (1-2 days)
1. Set up Supabase project
2. Create `listings` table schema (matches `Listing` type)
3. Update `src/hooks/use-listings.ts` to query Supabase instead of mock data
4. Add Supabase authentication to `src/store/auth.ts`

### Phase 2: Image Upload (1-2 days)
1. Integrate Mux for video uploads
2. Create image upload form in `src/components/shared/CreateListingForm.tsx`
3. Store image URLs in Supabase

### Phase 3: Real Authentication (1 day)
1. Wrap app in Clerk provider
2. Add auth guards to `/sell` and seller pages
3. Link user ID to listings

### Phase 4: Search & Filtering (2-3 days)
1. Index listings in Typesense
2. Wire up search in `src/hooks/use-listings.ts`
3. Add search/filter UI to home page

### Phase 5: Messaging & Favorites (3-5 days)
1. Real-time chat using Supabase Realtime
2. Favorites list (Zustand + Supabase)
3. Listing detail page messaging CTA

### Phase 6: Seller Dashboard (2-3 days)
1. Dashboard page at `/dashboard`
2. View/edit/delete listings
3. View messages from interested buyers

## Key Architectural Decisions

- **No API routes yet** — Use Supabase client directly for now
- **Server-side rendering** — Pages are SSR by default, client components only when needed
- **TanStack Query as source of truth** — Never duplicate data in Zustand
- **Zustand for UI state only** — Auth, filters, modals
- **Type safety first** — All data flows through defined types

## File Quick Reference

- **Types**: `src/types/index.ts` — single source of truth for data models
- **Mock data**: `src/lib/mock-data.ts` — update here for testing
- **Hooks**: `src/hooks/use-listings.ts` — all data fetching goes here
- **Components**: `src/components/shared/` — app-specific components
- **Stores**: `src/store/` — Zustand stores

## Testing Locally

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build
npm start
```

## Common Next Tasks

**"I want to add a filter for category"**
→ Check `src/store/listings.ts` and `src/components/shared/ListingsGrid.tsx`

**"I want to connect to my database"**
→ Update `src/lib/supabase.ts` and `src/hooks/use-listings.ts`

**"I want to add a new page"**
→ Create `src/app/my-route/page.tsx` (server component by default)

**"I want to add a form"**
→ See `src/components/shared/CreateListingForm.tsx` as example

## Notes

- The app is **mobile-first** — test on mobile/tablet sizes
- **No external API calls yet** — everything is mocked
- **Strict TypeScript** — all files must pass type checking
- **Husky + lint-staged ready** — pre-commit hooks can be enabled later

---

**Questions?** Check the README.md or review component structure in `src/components/shared/`.
