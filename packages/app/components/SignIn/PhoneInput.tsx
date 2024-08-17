import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';

export default function PhoneInputNative() {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <PhoneInput
      ref={phoneInput}
      defaultValue={value}
      defaultCode="DM"
      layout="first"
      onChangeText={(text) => {
        setValue(text);
      }}
      onChangeFormattedText={(text) => {
        setFormattedValue(text);
      }}
      withDarkTheme
      withShadow
      autoFocus
    />
  );
}
