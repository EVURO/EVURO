import { View } from 'react-native';
import React, { useState } from 'react';
import {
  AnimatedInput,
  AuthWrapper,
  CustomHeader,
  CustomText,
  MainWrapper,
  showToast,
} from '../../../../../components';
import { Fonts } from '../../../../../assets/fonts';
import { useChangePasswordStyle } from '../style';
import { useChangePassword } from '@evuro-frontend/hooks';
import { Colors } from '@evuro-frontend/assets';
import { useNavigation } from '@react-navigation/native';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';

interface InputItem {
  id: string;
  placeholder: string;
  value: string;
}

const ChangePassword: React.FC = () => {
  const navigation = useNavigation();

  const { formik, isLoading } = useChangePassword({
    resolve: handleChangePassword,
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  // console.log(values);

  const styles = useChangePasswordStyle();

  const inputArray: InputItem[] = [
    {
      id: 'currentPassword',
      placeholder: 'Old Password',
      value: values.currentPassword,
    },
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

  function handleChangePassword(response) {
    if (response?.data?.status === 200) {
      showToast('success', `${response?.data?.message}`);
      navigation.navigate('Setting');
    } else {
      showToast('error', response?.error?.data.message);
    }
  }

  return (
    <MainWrapper paddingHorizontal={-1}>
      <View style={{ paddingHorizontal: metrics.width(20) }}>
        <CustomHeader onBackHeader={true} />
      </View>

      <AuthWrapper
        loading={isLoading}
        disabled={isLoading}
        title="Change Password"
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
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: metrics.height(20),
        }}
      >
        <CustomText
          label="Powered by maximuseneca™ Group .©2023"
          fontSize={15}
          color={Colors.lightGray}
        />
      </View>
    </MainWrapper>
  );
};

export default ChangePassword;
