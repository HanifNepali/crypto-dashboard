import type { ProjectContent } from '@/lib/types/projectContent.types';

export const projectContent: ProjectContent = {
  hero: {
    eyebrow: 'Crypto Dashboard — Portfolio Project',
    title: 'Coingecko - a production quality crypto market dashboard.',
    description:
      'A single-page cryptocurrency dashboard built against the free CoinGecko API — market overview, live prices, a searchable coin explorer with charts, a filterable/sortable market table, and trending coins — built incrementally with a strict server-state/client-state separation throughout.',
    primaryCta: { label: 'View the dashboard', href: '/dashboard' },
  },
  overview: {
    heading: 'Project Overview',
    paragraph:
      'The dashboard at "/dashboard" is a from-scratch build against a real, rate-limited public API: a hero metric bar, top cryptocurrencies, market movers, an interactive coin explorer with a price chart, a filterable and sortable market data table, a market-cap-by-category donut chart, live prices, and trending coins — all built one section at a time, with every API constraint handled explicitly rather than assumed away.',
  },
  techStack: {
    heading: 'Technologies Used',
    items: [
      {
        name: 'React 19 + TypeScript + Vite',
        description: 'Strict typing throughout, including typed API schemas and component props.',
      },
      {
        name: 'TanStack Query',
        description:
          'Owns all server state — caching, refetching, loading/error states — with reusable query hooks per feature.',
      },
      {
        name: 'Zustand',
        description:
          'Minimal client state only: selected coin, theme, sidebar collapse — deliberately kept out of TanStack Query.',
      },
      {
        name: 'Zod',
        description:
          'Validates every CoinGecko response at the API boundary before it reaches a component.',
      },
      {
        name: 'shadcn/ui + Tailwind CSS',
        description:
          'Accessible primitives and utility-first styling, themed with CSS variables for light/dark.',
      },
      {
        name: 'Recharts',
        description: 'Price history, sparklines, and the market-categories donut chart.',
      },
      {
        name: 'Vitest, React Testing Library, Playwright',
        description:
          'Unit tests for pure logic, component tests for interactive UI, E2E for critical cross-feature flows.',
      },
    ],
  },
  decisions: {
    heading: 'Key implementation decisions',
    items: [
      {
        title: 'Feature-folder architecture with a shared API layer',
        description:
          'Each dashboard section owns its API, hooks, schemas, and components. Endpoints reused across sections (like /coins/markets) live in a shared lib/api layer instead of being duplicated per feature.',
      },
      {
        title: 'Free-tier API constraints handled explicitly, not hidden',
        description:
          "CoinGecko's paid-only 'gainers/losers' endpoint and the missing 'price/percentage' sort options on '/coins/markets' were worked around with client-side derivation and a hybrid server/client pagination model — flagged and confirmed rather than silently approximated.",
      },
      {
        title: 'Strict server-state vs. client-state separation',
        description:
          'TanStack Query owns every piece of API data. Zustand holds only what genuinely needs to be shared across unrelated components — selected coin, theme, sidebar state.',
      },
      {
        title: 'Theme persists, but only after the user chooses',
        description:
          'On first visit the theme follows the OS-level color scheme preference. The moment a user toggles it manually, that choice is persisted and takes over permanently.',
      },
    ],
  },
  scope: {
    heading: 'Responsive Scope',
    paragraphs: [
      'This project is intentionally designed for mobile layout. The design target is table screens and desktop. However, the mobile design handles the layout gracefully in the form of stacked layout',
      'The sidebar is for demonstration purpose only and so is intentionally hidden for all breakpoints below 1479px. ',
    ],
    breakpoint: 'Above 1479px',
  },
  accessibility: {
    heading: 'Accessibility Considerations',
    items: [
      'Semantic landmarks throughout: header, nav, main, aside, section — plus a skip-to-content link ahead of the sidebar.',
      'Every interactive element is keyboard-operable, with visible focus rings and no hover-only functionality.',
      'Every color pairing was checked against real WCAG contrast ratios (not eyeballed) — several token values were corrected after the audit found real failures in both themes.',
      'Charts and sparklines expose an accessible name and, where the underlying data is meaningful, a visually-hidden equivalent table.',
      'A single h1 per page, with section headings correctly nested beneath it (including fixing a heading-level bug found during audit).',
    ],
  },
  finalCta: {
    heading: 'See it in action',
    description: "The full dashboard is live at '/dashboard'.",
    cta: { label: 'View the dashboard', href: '/dashboard' },
  },
  disclaimer:
    'Disclaimer: This project is an unofficial, non-commercial build created for portfolio purposes. Market data is provided by the public CoinGecko API. This project is not affiliated with, endorsed by, or sponsored by CoinGecko. Nothing on this dashboard constitutes financial advice.',
};
