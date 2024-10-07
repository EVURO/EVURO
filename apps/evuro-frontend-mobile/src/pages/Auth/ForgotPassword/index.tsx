import { View } from 'react-native';
import React from 'react';
import {
  AnimatedInput,
  AuthWrapper,
  CustomText,
  showToast,
} from '../../../components';
import { Fonts } from '../../../assets/fonts';
import { useForgotPasswordStyle } from './style';
import { useNavigation } from '@react-navigation/native';
import { useForgot } from '@evuro-frontend/hooks';

const ForgotPassword = () => {
  const { formik, isLoading } = useForgot({
    resolve: (data) => handelForgot(data),
  });
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  const navigation = useNavigation();
  const styles = useForgotPasswordStyle();

  function handelForgot(responce) {
    // console.log('responce====', responce);
    // formik.resetForm();
    if (responce?.data) {
      showToast('success', `${responce?.data?.message}`);
      navigation.navigate('OTP', {
        email: values.email,
      });
    } else if (responce.error?.data) {
      showToast('error', `${responce?.error?.data?.message}`);
    } else {
      showToast('error', `Something went wrong`);
    }
  }

  return (
    <AuthWrapper
      loading={isLoading}
      disabled={isLoading}
      title="Forgot Your password"
      buttontitle="Continue"
      onPress={() => {
        handleSubmit();
      }}
    >
      <View style={styles.textContainer}>
        <CustomText
          label="Enter your email address and we’ll send you an email with all the instructions."
          fontSize={13}
          fontFamily={Fonts.Medium}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedInput
          placeholder="Email"
          placeholderText="Tempemail@gmail.com"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          focused={values.email ? true : false}
          errorMessage={
            touched['email'] && errors['email'] ? errors['email'] : ''
          }
        />
      </View>
    </AuthWrapper>
  );
};

export default ForgotPassword;
