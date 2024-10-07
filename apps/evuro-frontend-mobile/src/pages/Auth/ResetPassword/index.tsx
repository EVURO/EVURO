import { View } from 'react-native';
import React from 'react';
import {
  AnimatedInput,
  AuthWrapper,
  CustomText,
  showToast,
} from '../../../components';
import { Fonts } from '../../../assets/fonts';
import { useResetPasswordStyle } from './style';
import { useResetPassword } from '@evuro-frontend/hooks';
import { Colors } from '@evuro-frontend/assets';
import { useNavigation } from '@react-navigation/native';

interface InputItem {
  id: string;
  placeholder: string;
  value: string;
}

const ResetPassword: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const email = route?.params?.email;
  const { formik, isLoading } = useResetPassword({
    email: email,
    resolve: handleResetPassword,
  });
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  const styles = useResetPasswordStyle();

  const inputArray: InputItem[] = [
    {
      id: 'password',
      placeholder: 'New Password',
      value: values.password,
    },
    {
      id: 'confirmPassword',
      placeholder: 'Confirm Password',
      value: values.confirmPassword,
    },
  ];

  function handleResetPassword(response) {
    // console.log('response=====', response);
    if (response?.data?.status == 200) {
      showToast('success', `${response?.data?.message}`);
      navigation.navigate('Login');
    } else {
      showToast('error', `Something went wrong`);
    }
  }

  return (
    <AuthWrapper
      loading={isLoading}
      disabled={isLoading}
      title="Reset Password"
      buttontitle="Continue"
      onPress={handleSubmit}
    >
      <CustomText
        label="Enter your new password down below."
        fontSize={13}
        fontFamily={Fonts.Medium}
      />

      <View style={styles.inputContainer}>
        {inputArray.map((item) => (
          <View key={item.id} style={styles.inputInnerContainer}>
            <AnimatedInput
              placeholder={item.placeholder}
              secureTextEntry
              value={item.value}
              onChange={handleChange(item.id)}
              onBlur={handleBlur(item.id)}
              errorMessage={
                touched[item.id] && errors[item.id] ? errors[item.id] : ''
              }
              borderColor={
                touched[item.id] && errors[item.id]
                  ? Colors.red
                  : Colors.lightGray
              }
            />
          </View>
        ))}
      </View>
    </AuthWrapper>
  );
};

export default ResetPassword;
