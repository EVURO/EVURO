import { View } from 'react-native';
import React, { useState } from 'react';
import { CustomText, showToast } from '..';
import { Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import { Fonts } from '../../assets/fonts';
import { useAuthWrapperStyle } from '../style';
import { signInWithGoogle } from '../../util/Halper';
import {
  setIsLoading,
  setIsVisitor,
  setLoginData,
  setShowDrawer,
  setShowUserTypeModal,
  setToken,
  useAppDispatch,
  useLoginMutation,
  useSignUPMutation,
} from '@evuro-frontend/store';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomUserTypeModal from '../modal/CustomUserTypeModal';
import { isTablet } from 'react-native-device-info';

interface AuthBottomTextProps {
  isSignUp: boolean;
  signUpUserType: boolean;
}

const AuthBottomText: React.FC<AuthBottomTextProps> = ({ signUpUserType }) => {
  const [loginSubmit, { isError, isLoading }] = useLoginMutation();
  const [signUpHandle, { isLoading: signUpLoading }] = useSignUPMutation();
  const styles = useAuthWrapperStyle();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const googleSignIn = async (userType) => {
    dispatch(setIsVisitor(false));

    if (userType) {
      await signInWithGoogle()
        .then(async (response) => {
          dispatch(setIsLoading(true));
          // console.log('res======', res);
          const { idToken, user } = response;

          if (response) {
            const payload = {
              email: user?.email,
              socialId: idToken,
              socialSite: 'google',
              loginType: 'social',
            };

            try {
              const res = await loginSubmit(payload);
              console.log('res======', res);
              dispatch(setIsLoading(true));
              if (res?.error?.status == 404) {
                onHandleSignUp(response, userType);
              } else {
                await AsyncStorage.setItem('isAuth', res?.data?.accessToken);
                dispatch(setToken(res?.data?.accessToken));
                dispatch(setLoginData(res?.data));
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
              }
              dispatch(setIsLoading(false));
            } catch (error) {
              console.log('error=====', error);
              dispatch(setIsLoading(false));
            }
          }
          dispatch(setIsLoading(false));
        })
        .catch((error) => {
          console.log('error====', error);
          dispatch(setIsLoading(false));
        });
    }
  };

  const onHandleSignUp = async (res, userType) => {
    const { user } = res;

    const imageName = {
      uri: user.photo,
      name: `UserImage-${Date.now()}.jpg`,
      type: 'Images/jpg',
    };

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', '');
    formData.append('userType', userType);
    formData.append('image', imageName);
    formData.append('latitude', 0);
    formData.append('longitude', 0);
    formData.append('socialId', res.idToken),
      formData.append('socialSite', 'google'),
      formData.append('loginType', 'social');
    console.log('formData================', JSON.stringify(formData));

    try {
      const res = await signUpHandle(formData);
      dispatch(setIsLoading(true));
      console.log('res===', res);
      if (res?.error?.status === 409) {
        showToast('error', `${res?.error?.data?.message}`);
      } else {
        await AsyncStorage.setItem('isAuth', res?.data?.accessToken);
        dispatch(setToken(res?.data?.accessToken));
        dispatch(setLoginData(res?.data));
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
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log('error=========', error);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <View style={styles.orContainer}>
        <View style={styles.orBorder} />
        <CustomText label="OR" fontSize={20} fontFamily={Fonts.Medium} />
        <View style={styles.orBorder} />
      </View>

      <View style={styles.socialButtons}>
        <Svgs.apple1
          height={metrics.height(40)}
          width={metrics.width(45)}
          onPress={() => alert('Apple')}
        />
        <Svgs.google
          height={metrics.height(isTablet ? 40 : 35)}
          width={metrics.width(isTablet && 40)}
          onPress={() => dispatch(setShowUserTypeModal(true))}
        />
      </View>
      <CustomUserTypeModal
        onDogParent={() => {
          if (signUpUserType) {
            dispatch(setShowUserTypeModal(false));
            navigation.navigate('SignUp', {
              userType: 'Dog Parent',
            });
          } else {
            setTimeout(() => {
              googleSignIn('Dog Parent');
              dispatch(setShowUserTypeModal(false));
            }, 500);
          }
        }}
        onTalent={() => {
          if (signUpUserType) {
            dispatch(setShowUserTypeModal(false));
            navigation.navigate('SignUp', {
              userType: 'Talent',
            });
          } else {
            setTimeout(() => {
              googleSignIn('Talent');
              dispatch(setShowUserTypeModal(false));
            }, 500);
          }
        }}
        onShop={() => {
          dispatch(setIsVisitor(true));
          dispatch(setShowUserTypeModal(false));
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabStack' }],
          });
        }}
      />
    </>
  );
};

export default AuthBottomText;
