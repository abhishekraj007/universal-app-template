import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputWeb() {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  console.log({ value });

  return (
    <PhoneInput
      country={'in'}
      value={value}
      onChange={(phone) => setValue(phone)}
    />
  );
}
