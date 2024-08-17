import React from 'react';
import { Platform } from 'react-native';
import { useThemeSetting } from '@tamagui/next-theme';
// import { ThemeVariant } from 'app/utils/theme';
import { ChevronRight, Moon, SunMoon } from '@tamagui/lucide-icons';
import { Label, ListItem, Switch, XStack } from '@my/ui';
import { ThemeVariant, useAppTheme, useColors } from '../hooks';

export const NativeThemeToggle = () => {
  const [theme, setNativeTheme] = useAppTheme();
  const { set: setWebTheme } = useThemeSetting();
  const { textPrimary } = useColors();

  const onThemeToggle = () => {
    const webPlatform = Platform.OS === 'web';
    const nextTheme =
      theme === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
    if (webPlatform) {
      setWebTheme(nextTheme);
    } else {
      setNativeTheme(nextTheme);
    }
  };

  return (
    <ListItem hoverTheme pressTheme iconAfter={ChevronRight}>
      <XStack
        width={'100%'}
        alignItems="center"
        gap="$4"
        justifyContent="space-between"
      >
        <XStack alignItems="center" gap="$2.5">
          {theme === 'light' ? (
            <SunMoon size={'$1'} color={textPrimary} />
          ) : (
            <Moon size={'$1'} color={textPrimary} />
          )}

          <Label htmlFor={'dark-mode'} alignItems="center">
            Dark Mode
          </Label>
        </XStack>
        <Switch
          id="dark-mode"
          checked={theme === 'dark'}
          onCheckedChange={onThemeToggle}
        >
          <Switch.Thumb />
        </Switch>
      </XStack>
    </ListItem>
  );
};
