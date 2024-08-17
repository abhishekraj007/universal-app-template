import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAppTheme, ThemeVariant } from 'app/hooks';
import { TamaguiProvider } from '@my/ui';
import { config } from '@my/config';
export const TamaguiThemeProvider = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [appTheme] = useAppTheme();

  const statusBarStyle =
    appTheme === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
  const themeValue = appTheme === ThemeVariant.dark ? DefaultTheme : DarkTheme;

  return (
    <ThemeProvider value={themeValue}>
      <TamaguiProvider
        config={config}
        defaultTheme={appTheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <StatusBar style={statusBarStyle} />
        {children}
      </TamaguiProvider>
    </ThemeProvider>
  );
};
