import LoginScreen from 'app/screens/login-screen';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <SafeAreaView>
        <LoginScreen />
      </SafeAreaView>
    </>
  );
}
