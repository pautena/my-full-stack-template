import { createTheme as muiCreateTheme, PaletteMode, Theme } from '@mui/material/styles';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export function createTheme(mode:PaletteMode):Theme {
  return muiCreateTheme({
    palette: {
      mode,
    },
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
