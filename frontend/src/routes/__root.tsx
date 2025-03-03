import { Outlet, createRootRoute } from "@tanstack/react-router"
import React, { Suspense } from "react"

import NotFound from "../components/Common/NotFound"
import { createTheme } from "../theme"
import { useGetNavigation } from "../app/navigation"
import { TanstackRouterAppProvider } from "../app/tanstack-router-app-provider"

const loadDevtools = () =>
  Promise.all([
    import("@tanstack/router-devtools"),
    import("@tanstack/react-query-devtools"),
  ]).then(([routerDevtools, reactQueryDevtools]) => {
    return {
      default: () => (
        <>
          <routerDevtools.TanStackRouterDevtools />
          <reactQueryDevtools.ReactQueryDevtools />
        </>
      ),
    }
  })

const TanStackDevtools =
  process.env.NODE_ENV === "production" ? () => null : React.lazy(loadDevtools)

export const Route = createRootRoute({
  component: () => {
    const sidebarNavigation = useGetNavigation();
    const theme = createTheme();

    return (
      <TanstackRouterAppProvider navigation={sidebarNavigation} theme={theme}>
        <Outlet />
        <Suspense>
          <TanStackDevtools />
        </Suspense>
      </TanstackRouterAppProvider>
    )
  },
  notFoundComponent: () => <NotFound />,
})
