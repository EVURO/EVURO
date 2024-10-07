import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from '../../../../../assets/fonts';
import {
  AnimatedInput,
  CustomButton,
  CustomHeader,
  CustomText,
  Icons,
  UploadPhoto,
  showToast,
} from '../../../../../components/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useUpdateProfileStyle } from './style';
import { metrics } from '../../../../../util/metrics';
import GooglePlacesInput from '../../../../../components/base/GooglePlacesInput';
import {
  setLoginData,
  useAppDispatch,
  useAppSelector,
} from '@evuro-frontend/store';
import CustomImage from '../../../../../components/base/CustomImage';
import { useUpdateProfileType, useUpdateProfile } from '@evuro-frontend/hooks';
import { useNavigation } from '@react-navigation/native';

const UpdateProfile: React.FC = () => {
  const { loginData } = useAppSelector((state) => state.user);
  const editUserData = loginData?.data;

  const dispatch = useAppDispatch();

  const { formik, isLoading } = useUpdateProfile({
    resolve: (data) => handleUpdateProfile(data),
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  const addressRef = useRef();
  const navigation = useNavigation();

  const styles = useUpdateProfileStyle();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    formik.setFieldValue('name', editUserData?.name);
    formik.setFieldValue('email', editUserData?.email);
    formik.setFieldValue('image', {
      name: editUserData?.profileImage,
    });
    formik.setFieldValue('longitude', editUserData?.longitude);
    formik.setFieldValue('latitude', editUserData?.latitude);
    formik.setFieldValue('address', editUserData?.address);

    editUserData?.address &&
      addressRef?.current?.setAddressText(editUserData?.address);
  }, []);

  const handleLatLng = (details: any) => {
    console.log('details====', details);
    if (
      details &&
      details?.geometry &&
      details?.geometry?.location &&
      details?.formatted_address
    ) {
      formik.setFieldValue('latitude', details?.geometry?.location?.lat);
      formik.setFieldValue('longitude', details?.geometry?.location?.lng);
      formik.setFieldValue('address', addressRef?.current?.getAddressText());
    } else {
      console.log('Invalid details object or missing location information');
      alert('Location is required');
    }
  };

  const handleUpdateProfile = async (response: useUpdateProfileType) => {
    if (response?.data?.status === 200) {
      dispatch(setLoginData(response?.data));
      showToast('success', 'Profile update successfully.');
      navigation.navigate('TabStack');
    } else {
      console.log(response);
      showToast('error', 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: metrics.width(20),
        }}
      >
        <CustomHeader onBackHeader />

        <UploadPhoto
          handleChange={(res) => {
            formik.setFieldValue('image', {
              uri: res?.path,
              name: res?.path.substring(res?.path.lastIndexOf('/') + 1),
              type: 'image/jpg',
            });
            setSelectedImage(res?.path);
            formik.setFieldValue('isImageChanged', true);
          }}
          renderButton={(handleChange) => {
            return (
              <View
                style={[
                  styles.imgContainer,
                  {
                    borderColor: Colors.darkGray,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.editImg}
                  activeOpacity={0.6}
                  onPress={handleChange}
                >
                  <Icons family="AntDesign" name="edit" size={20} />
                </TouchableOpacity>
                <View>
                  {selectedImage ? (
                    <View style={styles.pickImgContainer}>
                      <Image
                        style={styles.img}
                        source={{ uri: selectedImage }}
                      />
                    </View>
                  ) : (
                    <View style={styles.pickImgContainer}>
                      <CustomImage
                        style={styles.img}
                        url={formik.values?.image?.name}
                      />
                    </View>
                  )}
                  {touched.image && errors.image && (
                    <CustomText
                      label={errors.image.toString()}
                      alignSelf="center"
                      marginTop={metrics.height(5)}
                      color={Colors.red}
                      fontSize={13}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />

        <CustomText
          marginBottom={metrics.height(30)}
          label={'Edit Profile'}
          fontSize={25}
          fontFamily={Fonts.Medium}
        />

        <View style={styles.inputContainer}>
          <AnimatedInput
            placeholder="User Name"
            focused
            placeholderText={'Please enter name'}
            value={values?.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            errorMessage={
              touched.name && errors.name ? errors.name.toString() : ''
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <AnimatedInput
            placeholder="Email Address"
            focused
            editable={false}
            placeholderText={'Enter email address'}
            value={formik.values?.email}
            borderColor={Colors.lightGray}
          />
        </View>

        <View style={styles.googlePlaces}>
          <GooglePlacesInput
            value={values?.address ? values?.address : ''}
            onChange={(address) => {
              formik.setFieldValue('address', address);
            }}
            onBlur={handleBlur('address')}
            addressRef={addressRef}
            onPress={(data, details) => {
              handleLatLng(details);
            }}
            errorMessage={
              touched?.address && errors?.address
                ? errors?.address?.toString()
                : ''
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            loading={isLoading}
            disabled={
              isLoading ||
              (values?.name === editUserData?.name &&
                values?.address === editUserData?.address &&
                values?.image?.name === editUserData?.profileImage)
            }
            onPress={() => {
              handleSubmit();
            }}
            title={'Update'}
            borderRadius={50}
            fontSize={20}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
