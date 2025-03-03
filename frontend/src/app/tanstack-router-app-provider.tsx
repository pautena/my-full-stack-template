// TanstackRouterAppProvider.tsx

import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { AppProvider, type AppProviderProps, Navigate, Router } from "@toolpad/core";
import { useCallback, useMemo } from "react";

export function TanstackRouterAppProvider({ children, ...rest }: AppProviderProps): React.JSX.Element {
  const { pathname } = useLocation();
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate();

  const navigateImpl = useCallback<Navigate>(
    (url, { history = "auto" } = {}) => {
      if (history === "auto" || history === "push") {
        navigate({ to: url.toString() }).catch(console.error);
      } else if (history === "replace") {
        navigate({
          to: url.toString(),
          replace: true
        }).catch(console.error);
      } else {
        throw new Error(`Unknown history option: ${history}`);
      }
    },
    [navigate]
  );

  const routerImpl = useMemo<Router>(
    () => ({
      pathname,
      searchParams: new URLSearchParams(searchParams as any),
      navigate: navigateImpl
    }),
    [
      pathname,
      searchParams,
      navigateImpl
    ]
  );

  return (
    <AppProvider router={routerImpl} {...rest}>
      {children}
    </AppProvider>);
}
