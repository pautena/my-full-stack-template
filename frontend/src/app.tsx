import { NotificationCenterProvider } from '@pautena/react-design-system'
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { QueryClient } from '@tanstack/react-query'
import { OpenAPI } from './client'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useGetNavigation } from './app/navigation';
import { createTheme } from './theme';
import { AppProvider } from '@toolpad/core/AppProvider';



OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,

})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const sidebarNavigation = useGetNavigation();
  const theme = createTheme();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
          <NotificationCenterProvider>
                <RouterProvider router={router} />
          </NotificationCenterProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
