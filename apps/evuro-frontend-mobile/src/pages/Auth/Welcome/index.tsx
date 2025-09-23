import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {
  CustomText,
  CustomButton,
  showToast,
  CustomUserTypeModal,
} from '../../../components';
import { metrics } from '../../../util/metrics';
import { Fonts } from '../../../assets/fonts';
import { useWellcomeStyle } from './style';
import { Images, Svgs } from '@evuro-frontend/assets';
import { Colors } from '@evuro-frontend/assets';
import { useNavigation } from '@react-navigation/native';
import { signInWithGoogle } from '../../../util/Halper/index';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WelcomeItem {
  id: number;
  title: string;
  backgroundColor?: string;
  colors: string;
  onPress: () => void;
}

const WelcomeScreen: React.FC = () => {
  const [loginSubmit, { isError, isLoading }] = useLoginMutation();
  const [signUpHandle, { isLoading: signUpLoading }] = useSignUPMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const styles = useWellcomeStyle();
  const [signUpUserType, setSignUpUserType] = useState<boolean>(false);

  const googleSignIn = async (userType) => {
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
            dispatch(setIsLoading(true));
            console.log('res======', res);
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
  };

  const onHandleSignUp = async (res, userType) => {
    const { user } = res;

    const imageName = {
      uri: user.photo,
      name: `UserImage-${Date.now()}.jpg`,
      type: 'Images/jpg',
    };

    const formData = new FormData();
    formData.append('name', user?.name);
    formData.append('email', user?.email);
    formData.append('password', '');
    formData.append('userType', userType);
    formData.append('image', imageName);
    formData.append('latitude', 0);
    formData.append('longitude', 0);
    formData.append('socialId', res?.idToken),
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

  const array: WelcomeItem[] = [
    {
      id: 1,
      title: 'Continue With Google',
      backgroundColor: 'transparent',
      colors: Colors.darkGray,
      leftIcon: Svgs.google,
      onPress: () => {
        dispatch(setShowUserTypeModal(true));
        setSignUpUserType(false);
        dispatch(setIsVisitor(false));
      },
    },
    {
      id: 2,
      title: 'Continue With Apple',
      backgroundColor: Colors.black,
      colors: Colors.white,
      leftIcon: Svgs.apple,
      onPress: () => {
        dispatch(setIsVisitor(false));
        alert('apple');
      },
    },
    {
      id: 3,
      title: 'Sign in With Email',
      colors: Colors.white,
      onPress: () => {
        dispatch(setIsVisitor(false));
        navigation.navigate('Login');
      },
    },
    {
      id: 4,
      title: 'Visitor',
      colors: Colors.white,
      onPress: () => {
        dispatch(setIsVisitor(true));
        navigation.navigate('TabStack');
      },
    },
  ];

  const ListHeaderComponent = () => {
    return (
      <>
        <View style={styles.imgContainer}>
          <Image
            source={Images.gMap}
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        <CustomText
          label="Welcome To Evuro"
          alignSelf="center"
          fontSize={20}
          fontFamily={Fonts.Medium}
          marginBottom={metrics.height(25)}
        />
        <CustomText
          label="Sign in to access your evuro account"
          alignSelf="center"
          fontSize={15}
          color={Colors.lightGray}
        />
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View style={styles.signUpContainer}>
        <CustomText
          label="New user? "
          fontSize={16}
          fontFamily={Fonts.Regular}
        />
        <CustomText
          onPress={() => {
            setSignUpUserType(true);
            dispatch(setShowUserTypeModal(true));
          }}
          label="Sign up Now"
          fontSize={16}
          fontFamily={Fonts.Bold}
          color={Colors.darkBlue}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        data={array}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View key={item.id} style={styles.buttonContainer}>
              <CustomButton
                title={item.title}
                color={item.colors}
                borderWidth={index == 0 ? 1 : -1}
                borderColor={Colors.lightGray}
                backgroundColor={item.backgroundColor}
                onPress={item.onPress}
                LeftIcon={
                  index <= 1 ? (
                    <item.leftIcon height={Platform.OS === 'ios' ? 35 : 25} />
                  ) : undefined
                }
                SvgHeight={35}
              />
              {index === 3 && <View style={styles.border} />}
            </View>
          );
        }}
      />

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
    </SafeAreaView>
  );
};

export default WelcomeScreen;
