import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  AnimatedInput,
  CustomButton,
  CustomHeader,
  CustomText,
  MainWrapper,
  showToast,
} from '../../../../../components';
import { metrics } from '../../../../../util/metrics';
import Video from 'react-native-video';
import { Colors } from '@evuro-frontend/assets';
import { useCreateShortMutation } from 'libs/store/src/lib/slices/shorts/shorts.api';
import { useNavigation } from '@react-navigation/native';

const CreateShort = ({ route }) => {
  const videoUrl = route?.params?.videoUrl;

  const navigation = useNavigation();

  const [createShort, { isLoading }] = useCreateShortMutation();

  const [desciption, setDescription] = useState('');
  const [desciptionError, setDescriptionError] = useState('');

  const handleCreateShort = async () => {
    if (!desciption) {
      return setDescriptionError('Caption is required');
    } else {
      const formData = new FormData();
      formData.append('description', desciption);
      formData.append('video', {
        uri: videoUrl,
        type: 'video/mp4',
        name: videoUrl.substring(videoUrl.lastIndexOf('/') + 1),
      });

      // console.log('formData====', formData);

      try {
        const res = await createShort(formData);
        console.log('createshort res======', res);
        if (res?.data?.status == 201) {
          showToast('success', 'Video short created successfully');
          navigation.goBack();
        } else if (res?.data?.status == 500) {
          showToast('error', 'something went wrong');
        } else if (res?.data?.status == 422) {
          showToast('error', 'something is missing');
        }
      } catch (error) {
        console.log('error=====', error);
      }
    }
  };

  return (
    <MainWrapper>
      <CustomHeader onBackHeader={true} headerTitle="New Short" Spacer />
      <View style={{ flex: 1, marginBottom: metrics.height(40) }}>
        <View
          style={{
            marginVertical: metrics.height(20),
            width: metrics.screenWidth,
            paddingHorizontal: metrics.width(20),
            height: '70%',
            alignSelf: 'center',
            borderRadius: 20,
          }}
        >
          {videoUrl && (
            <Video
              source={{ uri: videoUrl }}
              style={{
                borderRadius: 20,
                width: '100%',
                height: '100%',
                backgroundColor: Colors.lightGray,
              }}
              controls={false}
              resizeMode="cover"
            />
          )}
        </View>
        <View>
          <CustomText label="Write Caption" fontSize={18} />
          {/* <CustomTextArea
            value={''}
            onChangeText={function (e: string): void {
              throw new Error('Function not implemented.');
            }}
            editable={true}
          /> */}
          <AnimatedInput
            borderRadius={10}
            multiline
            value={desciption}
            placeholder={'Caption'}
            onChange={(e) => {
              setDescription(e);
              setDescriptionError('');
            }}
            errorMessage={desciptionError}
          />
        </View>
      </View>
      <CustomButton
        loading={isLoading}
        title={'Share'}
        onPress={handleCreateShort}
        borderRadius={50}
        marginBottom={metrics.height(20)}
        width={'90%'}
      />
    </MainWrapper>
  );
};

export default CreateShort;

const styles = StyleSheet.create({});
