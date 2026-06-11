import { useThemeSync } from '@/hooks/useThemeSync';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export function App() {
  useThemeSync();
  return <RouterProvider router={router} />;
}
