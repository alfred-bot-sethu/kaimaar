# Kaimaar - Pre-loved Marketplace

A production-grade Next.js 14 marketplace for buying and selling pre-loved items in Singapore.

## Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand (client) + TanStack Query (server state)
- **Database**: Supabase (Postgres + Auth + Realtime)
- **Search**: Typesense
- **Video**: Mux
- **Auth**: Clerk

## Project Structure

```
src/
├── app/                    # Next.js routes (App Router)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── sell/              # Seller flow
│   └── listings/[id]/     # Listing details
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── shared/            # Reusable app components
│   └── providers/         # Context providers (Query, Auth, etc.)
├── lib/
│   ├── env.ts            # Typed environment variables
│   ├── supabase.ts       # Supabase client setup
│   ├── typesense.ts      # Typesense client config
│   ├── utils.ts          # Helper functions
│   └── mock-data.ts      # Development mock data
├── hooks/                # Custom React hooks (TanStack Query)
├── types/                # TypeScript type definitions
└── store/                # Zustand stores
```

## Getting Started

### Prerequisites

- Node.js 18+ (preferably 20+)
- npm or yarn

### Installation

```bash
cd kaimaar
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

**Required keys to fill in:**

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_TYPESENSE_HOST` - Typesense server host
- `NEXT_PUBLIC_TYPESENSE_API_KEY` - Typesense API key
- `NEXT_PUBLIC_MUX_TOKEN_ID` - Mux token ID
- `MUX_TOKEN_SECRET` - Mux token secret

**Note:** The app works with mock data even without these keys configured.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Linting & Formatting

```bash
npm run lint        # Run ESLint
npm run format      # Run Prettier
npm run type-check  # Check TypeScript
```

## Features

### Current (Mock Data)

- ✅ Browse 12 pre-loved listings with filters
- ✅ Listing detail page with full information
- ✅ Sell form scaffold (no backend yet)
- ✅ Responsive grid layout (2 col mobile → 4 col desktop)
- ✅ Video badge support
- ✅ TanStack Query setup for server state
- ✅ Zustand stores for client state
- ✅ Type-safe environment variables

### Next Priorities

1. **Database Integration** - Connect Supabase for real data
2. **Authentication** - Integrate Clerk for user auth
3. **Search** - Wire up Typesense for full-text search
4. **Image Upload** - Implement image upload with Mux/similar
5. **Favorites** - Add to favorites (Zustand + Supabase)
6. **Messaging** - Real-time chat via Supabase Realtime

## Code Conventions

- **All components are functional with named exports**
- **No default exports** (except `page.tsx` files)
- **Server components by default**, marked `'use client'` only when needed
- **API calls go through TanStack Query hooks** in `hooks/`
- **Types in `types/`** — no inline definitions
- **Environment variables via typed `lib/env.ts`**
- **Zustand for client state**, TanStack Query for server state

## Onboarding

New engineers can onboard in ~30 minutes:

1. Clone and `npm install`
2. Copy `.env.local.example` → `.env.local`
3. Run `npm run dev`
4. Check `src/types/index.ts` for data models
5. Browse `src/components/shared/` to see how components are structured
6. Review `src/hooks/use-listings.ts` to understand the query pattern

## Contributing

- Run `npm run lint` before committing
- Keep components small and focused
- Use descriptive names for variables/functions
- Document complex logic with comments

## License

ISC
