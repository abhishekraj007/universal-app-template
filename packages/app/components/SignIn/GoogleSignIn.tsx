import { useAuth } from 'app/provider/auth';
import { YStack } from 'tamagui';
import { Button, useToastController } from '@my/ui';
import { useState } from 'react';

export const GoogleSignIn = () => {
  const { googleSignIn } = useAuth();

  const toast = useToastController();

  const [isSigning, setIsSigning] = useState(false);

  const onSignIn = async () => {
    try {
      setIsSigning(true);
      await googleSignIn();
    } catch (error) {
      toast.show('Something went wrong :(', {
        type: 'error',
      });
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <YStack alignItems="center">
      <Button
        width={'100%'}
        maxWidth={320}
        onPress={onSignIn}
        disabled={isSigning}
      >
        Sign in with Google
      </Button>
    </YStack>
  );
};
