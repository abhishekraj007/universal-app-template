import { useColorScheme } from 'react-native';
import {
  CustomToast,
  TamaguiProvider,
  TamaguiProviderProps,
  ToastProvider,
  config,
} from '@my/ui';
import { ToastViewport } from './ToastViewport';
import { AuthProvider } from './auth';

export function Provider({ children, ...rest }) {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            // 'mobile'
          ]
        }
      >
        <AuthProvider>{children}</AuthProvider>
        <CustomToast />
        <ToastViewport />
      </ToastProvider>
    </TamaguiProvider>
  );
}
