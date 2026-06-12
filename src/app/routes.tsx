import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

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
    <div className="flex h-screen items-center justify-center text-xl text-muted-foreground">
      Loading…
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
