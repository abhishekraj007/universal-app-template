import { Button, SwitchThemeButton, XStack, YStack } from '@my/ui';
import { Platform } from 'react-native';
import { useLink } from 'solito/navigation';

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user';
  const linkProps = useLink({
    href: '/login',
  });

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
          <>
            <SwitchThemeButton />
          </>
        )}
      </XStack>

      <Button {...linkProps}>Login</Button>
    </YStack>
  );
}
