import {
  YStack,
  Button,
  Input,
  Text,
  Spinner,
  useToastController,
  XStack,
  Select,
} from '@my/ui';
import { useRef, useState } from 'react';
import PhoneInput from './PhoneInput';

export const PhoneNumber = ({
  sendVerificationCode,
  disabledButton,
  loading,
  ...props
}) => {
  const [isSending, setIsSending] = useState(false);
  const toast = useToastController();

  const handleSendCode = async () => {
    try {
      setIsSending(true);

      await sendVerificationCode();

      toast.show('Verification code sent', {
        myPreset: 'success',
      });
    } catch (error) {
      toast.show('Failed to send, check you number', {
        myPreset: 'error',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <YStack>
      <YStack marginBottom={'$4'}>
        <Text fontSize="$6" fontWeight="bold">
          Enter your Phone Number
        </Text>
        <Text fontSize="$3" color="$gray10">
          We will send you the 6 digit verification code
        </Text>
      </YStack>

      <YStack space="$2">
        <Input
          placeholder="+91-XXXXXXXXXX"
          fontSize="$4"
          padding="$3"
          maxLength={15}
          inputMode="tel"
          {...props}
        />

        {/* <PhoneInput /> */}

        <XStack></XStack>

        <Button
          fontSize="$4"
          onPress={handleSendCode}
          disabled={isSending || disabledButton}
          icon={isSending ? <Spinner size="small" color="$grey" /> : null}
        >
          Send OTP
        </Button>
      </YStack>
    </YStack>
  );
};
