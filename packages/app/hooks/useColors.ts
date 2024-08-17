import { useTheme, useThemeName } from '@my/ui';

export const useColors = () => {
  const themeName = useThemeName();
  const theme = useTheme();
  const backgroundColor = themeName.includes('dark') ? '$gray1' : 'white';
  const headerColor = themeName.includes('dark') ? 'white' : theme.gray12;
  const textPrimary = themeName.includes('dark') ? 'white' : theme.gray12;
  const textSecondary = themeName.includes('dark') ? 'white' : theme.gray10;
  const paragraphColor = themeName.includes('dark') ? 'white' : theme.gray10;

  return {
    backgroundColor,
    headerColor,
    paragraphColor,
    textPrimary,
    textSecondary,
  };
};
