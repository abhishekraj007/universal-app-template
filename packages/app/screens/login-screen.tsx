import { useAuth } from 'app/provider/auth';
import { YStack, XStack, Button, Input, Text } from 'tamagui';
import {
  Separator,
  useWindowDimensions,
  H2,
  Spinner,
  useToastController,
} from '@my/ui';
import { X } from '@tamagui/lucide-icons';
import { GoogleSignIn } from '../components';

const Login = () => {
  const { user, loading, isSignedIn, signOut } = useAuth();

  const { height } = useWindowDimensions();

  const toast = useToastController();

  const onSignOut = async () => {
    try {
      await signOut();
      toast.show('Logged out!', {
        type: 'success',
      });
    } catch (error) {
      toast.show('Something went wrong!', {
        type: 'error',
      });
    }
  };

  if (loading) {
    return <Spinner size="large" />;
  }

  console.log({ isSignedIn, user, loading });

  if (isSignedIn) {
    return (
      <YStack>
        <H2>HI, {user?.displayName}</H2>
        <Button onPress={onSignOut}>Logout</Button>

        <Text>
          <Text>{JSON.stringify(user, null, 4)}</Text>
        </Text>
      </YStack>
    );
  }

  return (
    <YStack
      // backgroundColor={'yellow'}
      // height={height - 200}
      padding="$4"
      // alignItems="center"
      flex={1}
      justifyContent="center"
    >
      <GoogleSignIn />
    </YStack>
  );
};

export default Login;
