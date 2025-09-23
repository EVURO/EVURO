import React, { useRef } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { Fonts } from '../../../assets/fonts';
import {
  AnimatedInput,
  AuthBottomText,
  CustomButton,
  CustomText,
  UploadPhoto,
  showToast,
} from '../../../components/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSignUpStyle } from './style';
import { useNavigation } from '@react-navigation/native';
import { useSignUpType, useSignup } from '@evuro-frontend/hooks';
import { metrics } from '../../../util/metrics';
import GooglePlacesInput from '../../../components/base/GooglePlacesInput';
import { setShowDrawer, useAppDispatch } from '@evuro-frontend/store';

interface InputItem {
  id: string;
  placeholder: string;
  secureTextEntry?: boolean;
  placeholderText?: string;
}

const SignUp: React.FC = ({ route }) => {
  const isSignUp = route.params?.isSignUp;
  const userType = route.params?.userType;

  const addressRef = useRef();

  const { formik, isLoading } = useSignup({
    userType: userType,
    resolve: (data) => handelSignUp(data),
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  const navigation = useNavigation();
  const styles = useSignUpStyle();
  const dispatch = useAppDispatch();

  const inputArray: InputItem[] = [
    {
      id: 'fullName',
      placeholder: 'Full Name',
      placeholderText: 'Please enter name',
    },
    {
      id: 'email',
      placeholder: 'Email Address',
      placeholderText: 'Enter email address',
    },
    {
      id: 'password',
      placeholder: 'Password',
      secureTextEntry: true,
      placeholderText: 'Enter password',
    },
  ];

  const handleLatLng = (details: any) => {
    if (details && details?.geometry && details?.geometry?.location) {
      const lat = details?.geometry?.location?.lat;
      const lng = details?.geometry?.location?.lng;
      formik.setFieldValue('location.latitude', lat);
      formik.setFieldValue('location.longitude', lng);
      formik.setFieldValue(
        'location.address',
        addressRef?.current?.getAddressText()
      );
    } else {
      console.log('Invalid details object or missing location information');
      formik.setFieldError('location', 'Location is required');
    }
  };

  const handelSignUp = async (response: useSignUpType) => {
    const { data } = response;

    if (data?.status == 200) {
      if (userType == 'Talent') {
        navigation.navigate('AdditionalInformation', {
          isSignUp: true,
        });
      } else {
        navigation.navigate('AddPets', {
          isSignUp: true,
        });
      }
    } else {
      if (response?.error?.status == 400) {
        showToast('error', `${response?.error?.data?.message}`);
      } else if (response?.error?.status == 401) {
        showToast('error', `Invalid email and password`);
      } else if (response?.error?.status == 409) {
        showToast('error', `${'Email already exist'}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: metrics.width(25),
        }}
      >
        <UploadPhoto
          handleChange={(res) => {
            handleChange('image')(res?.path);
          }}
          renderButton={(handleChange) => {
            return (
              <>
                <View
                  style={[
                    styles.imgContainer,
                    {
                      borderColor:
                        touched.image && errors.image
                          ? Colors.red
                          : Colors.darkGray,
                    },
                  ]}
                >
                  <TouchableOpacity activeOpacity={0.6} onPress={handleChange}>
                    {values.image ? (
                      <View style={styles.pickImgContainer}>
                        <Image
                          source={{ uri: values.image }}
                          resizeMode="cover"
                          style={styles.img}
                        />
                      </View>
                    ) : (
                      <Svgs.Camera height={80} />
                    )}
                  </TouchableOpacity>
                </View>
                {touched.image && errors.image && (
                  <CustomText
                    label={errors.image.toString()}
                    alignSelf="center"
                    color={Colors.red}
                    fontSize={13}
                  />
                )}
              </>
            );
          }}
        />

        <CustomText label="Signup" fontSize={25} fontFamily={Fonts.Medium} />

        {inputArray.map((item, index) => (
          <View key={index} style={styles.inputContainer}>
            <AnimatedInput
              placeholder={item.placeholder}
              placeholderText={item.placeholderText}
              value={values[item.id]}
              onChange={handleChange(item.id)}
              onBlur={handleBlur(item.id)}
              secureTextEntry={item.secureTextEntry}
              errorMessage={
                touched[item.id] && errors[item.id]
                  ? errors[item.id].toString()
                  : ''
              }
              borderColor={
                touched[item.id] && errors[item.id]
                  ? Colors.red
                  : Colors.lightGray
              }
            />
          </View>
        ))}

        <GooglePlacesInput
          addressRef={addressRef}
          onPress={(data, details) => {
            handleLatLng(details);
          }}
          borderColor={
            touched.location && errors.location ? Colors.red : Colors.lightGray
          }
        />
        {touched.location && errors.location && (
          <CustomText
            label={errors.location}
            color={Colors.red}
            marginLeft={metrics.width(20)}
          />
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            loading={isLoading}
            disabled={isLoading}
            onPress={() => {
              handleSubmit();
            }}
            title="Signup"
            borderRadius={50}
            fontSize={20}
          />
        </View>

        <AuthBottomText isSignUp={isSignUp} />

        <View style={styles.bottomText}>
          <CustomText label="Do you have an account? " fontSize={16} />
          <CustomText
            onPress={() => navigation.navigate('Login')}
            label="Login"
            fontSize={16}
            fontFamily={Fonts.Bold}
            color={Colors.darkBlue}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
