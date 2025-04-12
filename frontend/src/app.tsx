import { CssBaseline, type PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { NotificationCenterProvider } from "@pautena/react-design-system";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "@tanstack/react-router";
import { StrictMode, useMemo, useState } from "react";
import { client } from "./client/client.gen";
import { routeTree } from "./routeTree.gen";
import { ColorModeContext, createTheme } from "./theme";

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
  auth: () => localStorage.getItem("access_token") || "",
});

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [colorMode, setColorMode] = useState<PaletteMode>("light");
  const theme = useMemo(() => createTheme(colorMode), [colorMode]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
          <CssBaseline />
          <NotificationCenterProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </NotificationCenterProvider>
        </ColorModeContext.Provider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
