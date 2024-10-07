import { View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AnimatedInput,
  CustomText,
  UploadPhoto,
  showToast,
} from '../../../components/index';
import AuthInformation from '../../../components/ui/AuthInformation';
import { metrics } from '../../../util/metrics';
import VideoIconMolecule from './molecule';
import { useAdditionalInformationStyle } from './style';
import AddMedia from '../../../components/ui/AddMedia';
import { onCamera, onGallery } from '../../../util/Halper';
import { useNavigation } from '@react-navigation/native';
import { useAdditionalInfromation } from '@evuro-frontend/hooks';
import { Colors } from '@evuro-frontend/assets';
import {
  useAppSelector,
  useGetImageUrlQuery,
  useGetUsersQuery,
} from '@evuro-frontend/store';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';

const AdditionalInformation = ({ route }) => {
  const { loginData } = useAppSelector((state) => state?.user);

  const { data: userData, error } = useGetUsersQuery(loginData?.data?._id);

  const data = userData?.data;

  // console.log('========', data);

  // console.log('====error:', error);

  const isUpdating = route?.params?.isUpdating;

  const { data: videoLink } = useGetImageUrlQuery(data?.Video);

  const { formik, isLoading } = useAdditionalInfromation({
    resolve: handelAdditionalInfo,
  });
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  const navigation = useNavigation();
  const styles = useAdditionalInformationStyle();

  const [convertedImages, setConvertedImages] = useState([]);

  useEffect(() => {
    if (isUpdating) {
      formik.setFieldValue('video', {
        uri: videoLink?.data,
        type: 'video/mp4',
        name: data?.Video,
      });
      formik.setFieldValue('bio', data?.bio || '');
      formik.setFieldValue('breedName', data?.breedName || '');
      formik.setFieldValue('age', data?.age || '');
      formik.setFieldValue('experience', data?.experience || '');
      formik.setFieldValue('ratePerHour', data?.ratePerHour || '');
      formik.setFieldValue('images', convertedImages);
    }
  }, [convertedImages, data, videoLink?.data]);

  const inputArray = [
    {
      id: 'bio',
      placeholder: 'Enter your bio',
      value: values.bio,
    },
    {
      id: 'breedName',
      placeholder: 'Handle Breed Name',
      value: values.breedName,
    },
    {
      id: 'age',
      placeholder: 'Your Age',
      value: values.age,
      keyboardType: 'numeric',
    },
    {
      id: 'experience',
      placeholder: 'Your experience',
      value: values?.experience,
      keyboardType: 'numeric',
    },
    {
      id: 'ratePerHour',
      placeholder: 'Rate Per Hour',
      value: values.ratePerHour,
      keyboardType: 'numeric',
    },
    {
      id: 'Gander',
      placeholder: 'Gander',
      value: values.Gander,
    },
  ];

  const imageOption = {
    mediaType: 'photo',
    // cropping: true,
    quality: 0.8,
    compressImageQuality: 0.8,
    compressImageMaxHight: 1280,
    compressImageMaxWidth: 1280,
    multiple: true,
    forceJpg: true,
  };
  const onCameraPick = () => {
    try {
      onCamera({
        imageOption,
        handleChange: (result) => {
          formik.setFieldValue('images', [
            ...values.images,
            {
              uri: result.path,
              type: 'image/jpg',
              name: result.path.substring(result.path.lastIndexOf('/') + 1),
            },
          ]);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onGalleryPick = () => {
    try {
      onGallery({
        imageOption,
        handleChange: (result) => {
          formik.setFieldValue('images', [
            ...values.images,
            ...result.map((res, index) => {
              return {
                uri: res.path,
                type: 'image/jpg',
                name: res.path.substring(res.path.lastIndexOf('/') + 1),
              };
            }),
          ]);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = (formikProps, uri) => {
    console.log('forik props values====', formikProps.values);

    const index = formikProps.values.images.findIndex(
      (image) => image.uri === uri
    );

    if (index !== -1) {
      const updatedImages = [...formikProps.values.images];
      updatedImages.splice(index, 1);

      formikProps.setFieldValue('images', updatedImages);
    }
  };

  function handelAdditionalInfo(response) {
    console.log('response======', response);
    if (values?.images?.length > 12) {
      showToast('error', 'Only select 12 images');
    } else if (response?.data?.status == 200) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'TabStack',
            // params: { isSignUp },
          },
        ],
      });
      isUpdating
        ? showToast('success', 'information updated successfully.')
        : showToast('success', 'information added successfully.');
    } else if (response?.error) {
      showToast('error', 'Something went wrong');
    }
  }

  return (
    <AuthInformation
      loading={isLoading}
      disabled={isLoading}
      title={
        isUpdating ? 'Update Additional Information' : 'Additional information'
      }
      subTitle={
        isUpdating
          ? ''
          : 'Add your information. You can update them later in settings'
      }
      bottomTitle={isUpdating ? '' : 'Not a Trail? '}
      bottomSubTitle={isUpdating ? '' : 'Sign up as a Dog Owner'}
      onButtonPress={handleSubmit}
    >
      {data?.bio === undefined ||
        (loginData?.data && (
          <CustomText
            label="Please update all feilds"
            color={Colors.red}
            alignSelf="center"
            marginTop={metrics.height(-10)}
          />
        ))}

      {data?.Images?.map((image, index) => {
        return (
          <ConvertImages
            key={index}
            image={image}
            handleImageChange={(url) =>
              setConvertedImages((prevData) => [
                ...prevData,
                { name: image, uri: url, type: 'image/jpg' },
              ])
            }
          />
        );
      })}
      {!isUpdating && (
        <CustomText
          label="Promote your gig"
          fontSize={20}
          marginTop={metrics.height(20)}
          marginBottom={metrics.height(-10)}
          fontFamily={Fonts.Medium}
        />
      )}

      <UploadPhoto
        handleChange={(res) => {
          // console.log('res======', res);
          formik.setFieldValue('video', {
            uri: res.path,
            type: 'video/mp4',
            name: res.path.substring(res.path.lastIndexOf('/') + 1),
          });
        }}
        isVideo
        renderButton={(handleChange) => {
          return (
            <>
              <VideoIconMolecule
                onPress={handleChange}
                url={values.video?.uri}
                label={'Record or Upload video'}
                borderColor={
                  touched['video'] && errors['video']
                    ? Colors.red
                    : Colors.lightGray
                }
              />

              {touched['video'] && errors['video'] ? (
                <CustomText
                  label={errors['video']}
                  color={Colors.red}
                  marginLeft={metrics.width(20)}
                  marginTop={metrics.height(5)}
                />
              ) : (
                <View />
              )}
            </>
          );
        }}
      />

      {/* {console.log('data========', data.bio)} */}

      {inputArray.map((item, index) => {
        return (
          <View key={item.id} style={styles.inputContainer}>
            <AnimatedInput
              focused={data?.bio === undefined ? false : isUpdating}
              placeholder={item.placeholder}
              multiline={index === 0 ? true : false}
              value={values[item.id]}
              onChange={handleChange(item.id)}
              onBlur={handleBlur(item.id)}
              keyboardType={item.keyboardType}
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
        );
      })}

      <View style={styles.mediaContainer}>
        <AddMedia
          heading="Media"
          onCameraPress={onCameraPick}
          onGalleryPress={onGalleryPick}
          images={values.images}
          OndeleteImage={(uri) => deleteImage(formik, uri)}
          borderColor={
            touched.images && errors.images && values.images.length === 0
              ? Colors.red
              : Colors.lightGray
          }
        />
        {touched.images && errors.images && values.images.length === 0 && (
          <CustomText
            label={errors.images.toString()}
            color={Colors.red}
            fontSize={13}
          />
        )}
      </View>
    </AuthInformation>
  );
};

export default AdditionalInformation;

const ConvertImages = ({ image, handleImageChange }) => {
  const { data } = useGetImageUrlQuery(image);
  useEffect(() => {
    if (data?.data) handleImageChange(data?.data);
  }, [data]);
  return <></>;
};
