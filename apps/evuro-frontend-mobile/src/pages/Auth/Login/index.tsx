import React from 'react';
import { View } from 'react-native';
import { AuthWrapper, CustomText, AnimatedInput } from '../../../components';
import { metrics } from '../../../util/metrics';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from '../../../assets/fonts';
import { useLoginStyle } from './style';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '@evuro-frontend/hooks';
import { showToast } from '../../../components/base/CustomToast';
import {
  setIsVisitor,
  setShowDrawer,
  useAppDispatch,
} from '@evuro-frontend/store';
import DeviceInfo from 'react-native-device-info';

const Login = () => {
  const { formik, isLoading } = useLogin({
    resolve: handleLoginResolve,
  });
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const styles = useLoginStyle();
  const isTablet = DeviceInfo.isTablet();

  const inputArray = [
    {
      id: 'email',
      placeholder: 'Email',
      placeholderText: 'Tempemail@gmail.com',
    },
    {
      id: 'password',
      placeholder: 'Password',
      secureTextEntry: true,
      placeholderText: '**********',
    },
  ];

  function handleLoginResolve(response) {
    console.log('login api responce===========>>>', response);
    const { data } = response;

    if (data?.status === 200) {
      dispatch(setIsVisitor(false));
      dispatch(setShowDrawer(true));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'TabStack',
            state: {
              routes: [{ name: 'Home' }],
            },
          },
        ],
      });
    } else if (response.error.status === 404) {
      showToast('error', `${response?.error?.data?.message}`);
    } else if (response.error.status === 401) {
      showToast('error', `Invalid email and password`);
    }
  }

  return (
    <AuthWrapper
      loading={isLoading}
      disabled={isLoading}
      title="Login"
      buttontitle="Login"
      onPress={handleSubmit}
      ShowBottomText
    >
      {inputArray.map((item) => {
        return (
          <View key={item.id} style={styles.inputContainer}>
            <AnimatedInput
              placeholder={item.placeholder}
              placeholderText={item.placeholderText}
              onChange={handleChange(item.id)}
              onBlur={handleBlur(item.id)}
              value={values[item.id]}
              secureTextEntry={item.secureTextEntry}
              errorMessage={
                touched[item.id] && errors[item.id]
                  ? formik.errors[item.id].toString()
                  : ''
              }
              borderColor={
                touched[item.id] && errors[item.id]
                  ? Colors.red
                  : Colors.lightGray
              }
            />
          </View>
        );
      })}

      <View style={styles.textContainer}>
        <CustomText
          onPress={() => navigation.navigate('ForgotPassword')}
          label="Forgot Password"
          marginTop={metrics.height(10)}
          textDecorationLine="underline"
          textDecorationColor={Colors.darkBlue}
          color={Colors.darkBlue}
          fontFamily={Fonts.Medium}
          fontSize={13}
        />
      </View>
    </AuthWrapper>
  );
};

export default Login;
