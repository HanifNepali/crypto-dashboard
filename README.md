# Crypto Dashboard

**Live app:** [https://crypto-dashboard-sooty-mu.vercel.app/](https://crypto-dashboard-sooty-mu.vercel.app/)

 **Unofficial, non-commercial project,** built for portfolio purposes. Market data is provided by the public [CoinGecko](https://www.coingecko.com/) API. This project is not affiliated with, endorsed by, or sponsored by CoinGecko. Nothing on this dashboard constitutes financial advice.

## 1. Project Overview

A cryptocurrency market dashboard, built from a Figma design and a set of planning documents into a production-quality React application — developed incrementally, section by section, against the real, rate-limited CoinGecko public API, with every API constraint handled explicitly.

## 2. Features

- **Market overview**: global market cap, 24h volume, market cap change, BTC dominance, active markets
- **Top Cryptocurrencies**: compact top-5 table by market cap
- **Market Movers**: top gainers/losers, derived client-side (CoinGecko's dedicated endpoint is paid-tier only)
- **Coin Explorer**: searchable coin detail view with a price chart (24H/7D/30D/90D), trend-colored stroke
- **Market Data Explorer**: searchable, filterable, sortable, paginated market table with column visibility controls — hybrid server-side/client-side pagination (see [API Notes](#7-api-notes--free-tier-constraints))
- **Market Categories**: market-cap share by category, shown as a donut chart with an accessible table fallback
- **Live Prices** and **Trending Coins**: compact auto-refreshing watchlists
- **Collapsible sidebar**, **persisted theme** (light/dark, follows OS preference until manually set), **dark navy-tinted dark theme**

## 3. Tech Stack

- **React 19 + TypeScript + Vite**
- **React Router** — client-side routing between the project page and the dashboard
- **TanStack Query** — all server state: caching, refetching, loading/error states
- **Zustand** — minimal client state only (selected coin, theme, sidebar collapse)
- **Zod** — validates every CoinGecko response at the API boundary
- **Axios** — centralized HTTP client with a shared error-normalization interceptor
- **shadcn/ui** (Base UI primitives, Vega preset) + **Tailwind CSS**
- **Recharts** — price chart, sparklines, donut chart
- **lucide-react** — iconography
- **Vitest + React Testing Library** — unit and component tests
- **Playwright** — critical-flow E2E tests
- **Husky + lint-staged + ESLint + Prettier** — pre-commit checks

## 4. Pages

| Route        | Description                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------- |
| `/`          | Project overview — tech stack, key implementation decisions, scope, and accessibility notes   |
| `/dashboard` | The dashboard itself                                                                          |

## 5. Project Structure

```text
src/
├── app/                  # Router setup, providers, root App component
├── pages/
│   ├── about/            # "/" project overview page
│   └── dashboard/        # "/dashboard" page shell
├── features/             # One folder per dashboard section: api, hooks, schemas,
│                         #   components, queryKeys — e.g. coin-explorer, market-explorer,
│                         #   market-movers, market-categories, live-prices, trending-coins
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── shared/            # Reusable app components (DataTable, Pagination, SectionHeading,
│   │                       #   DeltaBadge, CoinIcon, Sparkline, LoadingSkeleton, ErrorState, ...)
│   └── layout/            # AppShell, Sidebar, DashboardHeader, PanelGrid, ThemeToggle
├── lib/
│   ├── api/               # Centralized Axios client, shared endpoints (markets, search),
│   │                        Zod schemas, error normalization
│   └── types              # Shared TypeScript types
│   └── formatters.ts      # Currency/number/percentage formatting
├── store/                 # Zustand store (theme, selected coin, sidebar state)
├── hooks/                 # Shared hooks (debounce, theme sync, document title)
├── data/                  # Typed content for the "/" project page
└── test/                  # Vitest setup, shared test utilities

tests/                       # Playwright specs + API mocking fixtures
```

## 6. Getting Started

**Prerequisites:** Node.js 20+, npm

```bash
# Install dependencies
npm install

# Copy env template and adjust if needed
cp .env.example .env

# Run the dev server
npm run dev

# Production build
npm run build
npm run preview
```

### Environment Variables

| Variable                     | Description                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `VITE_COINGECKO_API_BASE_URL` | CoinGecko API base URL (defaults to the public endpoint)                                          |
| `VITE_COINGECKO_API_KEY`      | Optional — CoinGecko Demo API key. The public endpoint works without one, at lower rate limits.   |

## 7. API Notes — Free-Tier Constraints

This project runs entirely against CoinGecko's free public API, which has real limitations that shaped several implementation decisions:

- **`/coins/top_gainers_losers` is paid-tier only.** Market Movers instead fetches a market-cap-ranked sample via `/coins/markets` and derives gainers/losers client-side, filtered by a minimum 24h volume threshold.
- **`/coins/markets`'s `order` parameter only supports `market_cap`/`volume`/`id`** — not price or percentage change. Market Data Explorer uses a hybrid model: Rank/Market Cap/Volume sorting and category filtering use true server-side pagination; searching switches to a small, client-paginated result set resolved through `/search` → `ids`.
- **Category filter IDs are resolved at runtime** via `/coins/categories/list` rather than hardcoded, since CoinGecko's category set changes over time.

## 8. Testing

```bash
npm run test         # unit + component tests (Vitest, watch mode)
npm run test:run      # unit + component tests, single run (used in CI)
npx playwright test   # end-to-end tests
```

**Unit tests** cover pure logic: formatters, API error normalization, market-table sort/paginate transforms, and the rank/market-cap `order` parameter mapping.

**Component tests** cover the highest-value interactive pieces: loading/success/error states with retry, debounced coin search, chart time-range switching and refetching, and the Market Explorer's search/browse mode switch.

**E2E tests** (Playwright, mocked API responses) cover critical cross-feature flows: full dashboard load with no console errors and the Market Explorer's server-paginated/client-paginated mode switch.

CI runs both suites on every push and pull request against `main` and `master` via GitHub Actions (`.github/workflows/`). `dev` branch has been intentionally not added as it is the main development branch.

## 9. Accessibility

- **Target**: WCAG 2.2 AA where practical
- **Real contrast audit performed**, not eyeballed — computed WCAG ratios caught and fixed several failing color pairs in both themes (light-mode positive/negative delta text, an accent color used as link text, a dark-mode badge background)
- **Semantic landmarks**: `header`, `nav`, `main`, `aside`, `section`, plus a skip-to-content link ahead of the sidebar
- **Keyboard operable throughout**: visible focus rings, no hover-only functionality, Escape closes the coin search dropdown
- **Charts and sparklines** expose accessible names via `role="img"` + `aria-label`; the market-categories donut chart additionally provides a visually-hidden equivalent data table
- **`prefers-reduced-motion` respected** globally — chart animations, the sidebar collapse transition, and the theme-switch color transition are all disabled for users who request it

## 10. Performance

- **Route-level code splitting**: the project page and the dashboard are separate lazy-loaded bundles
- **Dashboard-only dependencies** (TanStack Query, Recharts) are isolated behind the dashboard's dynamic import boundary.
- **Preconnect hints** for the CoinGecko API and image CDN
- **Memoized list/row components** for frequently-polled sections (Live Prices, Market Explorer rows) so background refetches don't force unnecessary re-renders

## 11. License

Code is licensed under MIT (see `LICENSE`). Market data is sourced from the public CoinGecko API and is subject to CoinGecko's own terms of use.

