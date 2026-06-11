import { createBrowserRouter } from 'react-router-dom';
import { AboutPage } from '@/pages/about/AboutPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

export const router = createBrowserRouter([
  { path: '/', element: <AboutPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
]);
