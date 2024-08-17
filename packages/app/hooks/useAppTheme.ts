// import { atom, useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export enum ThemeVariant {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

export function useAppTheme() {
  const [appTheme, setAppThemeLocal] = useState(ThemeVariant.light);

  useEffect(() => {
    async function checkTheme() {
      await AsyncStorage.getItem('theme').then((value: ThemeVariant) => {
        setAppThemeLocal(value ?? ThemeVariant.light);
      });
    }

    if (!appTheme) {
      checkTheme();
    }
  }, [appTheme]);

  const setAppTheme = (theme: ThemeVariant) => {
    setAppThemeLocal(theme);
    try {
      AsyncStorage.setItem('theme', theme);
    } catch {
      console.log("cound't save theme");
    }
  };

  return [appTheme, setAppTheme] as const;
}
