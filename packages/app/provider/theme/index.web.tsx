import { NextThemeProvider, ColorScheme } from '@tamagui/next-theme';
import { TamaguiProvider } from '@my/ui';
import { config } from '@my/config';
import { ThemeVariant, useAppTheme } from 'packages/app/hooks';
import { useColorScheme } from 'react-native';
// import { useAppTheme } from 'app/atoms/theme';
// import { TamaguiProvider } from '../tamagui';

export const TamaguiThemeProvider = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  // const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useAppTheme();

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setAppTheme(next as ThemeVariant);
      }}
    >
      {/* <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    > */}

      <TamaguiProvider
        config={config}
        defaultTheme={appTheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
};

export { useRootTheme } from '@tamagui/next-theme';
