import { useAuth } from 'app/provider/auth';
import { YStack, XStack, Button } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import { PhoneNumber } from './PhoneNumber';
import { OTPVerification } from './OTPVerification';

export const PhoneSignIn = () => {
  const {
    loading,
    phoneNumber,
    setPhoneNumber,
    verificationId,
    setVerificationId,
    verificationCode,
    setVerificationCode,
    sendVerificationCode,
    confirmCode,
  } = useAuth();

  return (
    <YStack space padding="$4">
      {!!verificationId && (
        <XStack>
          <Button
            circular
            variant="outlined"
            fontSize="$4"
            icon={X}
            onPress={() => setVerificationId('')}
          ></Button>
        </XStack>
      )}
      {!verificationId && (
        <PhoneNumber
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          inputMode="tel"
          sendVerificationCode={sendVerificationCode}
          loading={loading}
          disabledButton={phoneNumber?.length < 10}
        />
      )}

      {!!verificationId && (
        <OTPVerification
          setVerificationCode={setVerificationCode}
          confirmCode={confirmCode}
          loading={loading}
          disabledButton={verificationCode?.length < 6}
          sendVerificationCode={sendVerificationCode}
        />
      )}
    </YStack>
  );
};
