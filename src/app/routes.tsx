import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const AboutPage = lazy(() =>
  import('@/pages/about/AboutPage').then((m) => ({ default: m.AboutPage }))
);

const DashboardWithProviders = lazy(async () => {
  const [{ AppProviders }, { DashboardPage }] = await Promise.all([
    import('./Providers'),
    import('@/pages/dashboard/DashboardPage'),
  ]);
  return {
    default: () => (
      <AppProviders>
        <DashboardPage />
      </AppProviders>
    ),
  };
});

function PageFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-5 h-screen items-center justify-center bg-background"
    >
      <Loader2
        className="h-15 w-15 animate-spin text-crypto-accent motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span className="text-xl text-muted-foreground">Loading…</span>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageFallback />}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<PageFallback />}>
        <DashboardWithProviders />
      </Suspense>
    ),
  },
]);
