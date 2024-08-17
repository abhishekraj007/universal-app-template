import { useState, useRef, useEffect } from 'react';
import {
  YStack,
  Button,
  Input,
  Text,
  XStack,
  Spinner,
  useToastController,
} from '@my/ui';

export const OTPVerification = ({
  confirmCode,
  disabledButton,
  loading,
  setVerificationCode,
  sendVerificationCode,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const toast = useToastController();

  const handleVerificationCode = async () => {
    try {
      setIsLoading(true);
      await confirmCode();
      toast.show('Verified', {
        myPreset: 'success',
      });
    } catch (error) {
      toast.show('Invalid verification code', {
        myPreset: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (value.length > 1) {
      value = value.slice(-1); // Only take the last entered character
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered and not the last input
    if (value && index < 5) {
      setTimeout(() => {
        // @ts-ignore
        inputRefs.current[index + 1].focus();
      }, 100); // Delay focus change to ensure value is set
    }
  };

  useEffect(() => {
    console.log(otp);

    setVerificationCode(otp.join(''));
  }, [otp]);

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // @ts-ignore
      inputRefs.current[index - 1].focus();
      // setTimeout(() => {
      // }, 100); // Delay focus change to ensure smooth transition
    }
  };

  const resendOTP = async () => {
    setOtp(['', '', '', '', '', '']);
    // @ts-ignore
    inputRefs.current[0].focus();

    try {
      setIsResending(true);
      await sendVerificationCode();
    } catch (error) {
    } finally {
      setIsResending(false);
    }
  };

  return (
    <YStack space={'$4'}>
      <Text fontSize="$6" fontWeight="bold">
        OTP Verification
      </Text>
      <Text>{JSON.stringify(otp)}</Text>

      <XStack space="$2">
        {[...Array(6)].map((_, index) => (
          <Input
            // @ts-ignore
            ref={(el) => (inputRefs.current[index] = el)}
            key={index}
            width={48}
            height={48}
            textAlign="center"
            fontSize="$5"
            inputMode="numeric"
            value={otp[index]}
            maxLength={1}
            onChangeText={(value) => {
              console.log({ value });

              handleOtpChange(value, index);
            }}
            onKeyPress={(event) => handleKeyPress(event, index)}
            // {...props}
          />
        ))}
      </XStack>

      <Button
        fontSize="$4"
        onPress={handleVerificationCode}
        disabled={isLoading || disabledButton}
        icon={isLoading ? <Spinner size="small" color="$grey" /> : null}
      >
        VERIFY & CONTINUE
      </Button>

      <XStack alignItems="center" justifyContent="center">
        <Text fontSize="$3" color="$gray10" textAlign="center" marginRight="$2">
          Didn't receive OTP?
        </Text>

        <Button
          chromeless
          // unstyled
          color={isResending ? '$gray10' : '$red10'}
          onPress={resendOTP}
          icon={isResending ? <Spinner size="small" /> : null}
          disabled={isResending}
        >
          RESEND
        </Button>
      </XStack>
    </YStack>
  );
};
