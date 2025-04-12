import {
  type PaletteMode,
  type Theme,
  createTheme as muiCreateTheme,
} from "@mui/material/styles";
import { Link } from "@tanstack/react-router";
import { createContext, useContext } from "react";

export function createTheme(mode: PaletteMode): Theme {
  return muiCreateTheme({
    palette: {
      mode,
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: Link,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: Link,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
      },
    },
  });
}

interface ThemeContextType {
  colorMode: PaletteMode;
  setColorMode: (mode: PaletteMode) => void;
}

export const ColorModeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeContext");
  }
  return context;
};
