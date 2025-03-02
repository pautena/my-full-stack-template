import { createTheme as muiCreateTheme, PaletteMode, Theme } from '@mui/material/styles';
import { createContext, useContext } from 'react';
import { Link } from '@tanstack/react-router'

export function createTheme(mode:PaletteMode):Theme {
  return muiCreateTheme({
    palette: {
      mode,
    },
    components:{
      MuiLink: {
        defaultProps: {
          component: Link
        }
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: Link,
        }
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',        }
      }
    }
  });
}

interface ThemeContextType {
  colorMode:PaletteMode;
  setColorMode: (mode:PaletteMode)=> void;
}

export const ColorModeContext = createContext<ThemeContextType | undefined>(undefined);

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeContext');
  }
  return context;
};
