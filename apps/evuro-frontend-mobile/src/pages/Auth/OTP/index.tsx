import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  AuthWrapper,
  CustomText,
  CustomOTP,
  showToast,
} from '../../../components';
import { Fonts } from '../../../assets/fonts';
import { useOTPStyle } from './style';
import { useNavigation } from '@react-navigation/native';
import { useOTP } from '@evuro-frontend/hooks';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';

const OTP = ({ route }) => {
  const email = route?.params?.email;
  const { formik, handelResendOTP, isLoading } = useOTP({
    email: email,
    resolve: handleOTP,
    reject: handleOTPError,
    resendSuccess: handleResendSuccess,
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  // console.log('values=======', values);

  const [seconds, setSeconds] = useState(60);
  const [disable, setDisable] = useState(false);
  const [showResendButton, setShowResendButton] = useState(true);

  const navigation = useNavigation();
  const styles = useOTPStyle();

  let interval: any;

  const startTimer = () => {
    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        setDisable(true);
        setShowResendButton(true);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  }, [seconds, disable]);

  function handleOTP(response) {
    if (response.data.status == 200) {
      showToast('success', `Your OTP has been verified`);
      navigation.navigate('ResetPassword', {
        email,
      });
    } else {
      showToast('error', `Please verify the OTP`);
    }
  }

  function handleOTPError(error) {
    console.log('=======error', error);
    if (error) {
      showToast('error', `Invalid OTP`);
    }
  }

  function handleResendSuccess(response) {
    showToast('success', `OTP resent to your ${email}`);
    console.log('Resend success response:', response);
  }

  const handleResendClick = async () => {
    setSeconds(60);
    setDisable(false);
    setShowResendButton(false);
    startTimer();
    try {
      await handelResendOTP(formik.values);
    } catch (error) {
      console.log('Error:', error);
      showToast('error', 'Something went wrong');
    }
  };

  return (
    <AuthWrapper
      loading={isLoading}
      disabled={isLoading}
      title="Verification Code"
      buttontitle="Continue"
      onPress={handleSubmit}
      disabled={values?.otp.length < 4}
    >
      <View style={styles.textContainer}>
        <CustomText
          label={`OTP sent to your ${email} E-mail`}
          fontSize={13}
          fontFamily={Fonts.Medium}
        />
      </View>

      <CustomOTP
        formikProps={{ values, handleChange, handleBlur }}
        onInputComplete={(completedOTP) => {
          console.log('Completed OTP:', completedOTP);
        }}
      />

      <View style={styles.contentContainer}>
        {showResendButton && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomText
              label={`Didn’t receive the OTP? `}
              fontSize={13}
              fontFamily={Fonts.Medium}
              color={Colors.lightGray1}
            />
            {seconds > 0 ? (
              <CustomText
                label={`${seconds < 10 ? '0' + seconds : '' + seconds} sec`}
                alignSelf="center"
                fontSize={13}
                fontFamily={Fonts.Medium}
                color={Colors.darkBlue}
              />
            ) : (
              <CustomText
                onPress={handleResendClick}
                label={`Resend OTP`}
                textDecorationLine="underline"
                fontSize={13}
                fontFamily={Fonts.Medium}
                color={Colors.darkBlue}
              />
            )}
          </View>
        )}
      </View>
    </AuthWrapper>
  );
};

export default OTP;
