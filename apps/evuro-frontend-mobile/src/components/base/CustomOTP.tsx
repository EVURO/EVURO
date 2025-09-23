import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { metrics } from '../../util/metrics';
import { Colors } from '@evuro-frontend/assets';

interface OTPInputProps {
  length?: number;
  onInputComplete: (otp: string) => void;
  formikProps: {
    values: any;
    handleChange: (field: string) => (text: string) => void;
    handleBlur: (field: string) => () => void;
  };
}

const CustomOTP: React.FC<OTPInputProps> = ({
  length = 4,
  onInputComplete,
  formikProps,
}) => {
  const [otp, setOTP] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleInputChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;

    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);

    formikProps.handleChange('otp')(newOTP.join(''));

    if (index < length - 1 && text !== '') {
      inputRefs.current[index + 1]?.focus();
    }

    if (!newOTP.includes('')) {
      onInputComplete(newOTP.join(''));
      Keyboard.dismiss();
    }
  };

  const handleBackspace = (index: number) => {
    const newOTP = [...otp];
    if (index > 0) {
      newOTP[index] = '';
      setOTP(newOTP);
      inputRefs.current[index - 1]?.focus();

      formikProps.handleChange('otp')(newOTP.join(''));
    } else if (index === 0 && newOTP[0] !== '') {
      newOTP[0] = '';
      setOTP(newOTP);

      formikProps.handleChange('otp')(newOTP.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.input}
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Backspace') {
              handleBackspace(index);
            }
          }}
          onBlur={formikProps.handleBlur('otp')}
          maxLength={1}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.width(60),
    marginBottom: metrics.height(20),
    marginTop: metrics.height(30),
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    fontSize: metrics.width(20),
    width: metrics.width(50),
    height: metrics.width(50),
    borderRadius: 10,
    textAlign: 'center',
    color: Colors.black,
  },
});

export default CustomOTP;
