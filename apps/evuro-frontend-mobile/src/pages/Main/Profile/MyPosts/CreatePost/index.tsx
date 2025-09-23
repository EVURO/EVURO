import { View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useCreatePostStyle } from '../../MyPosts/style';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  Icons,
  MainWrapper,
  CustomImage,
} from '../../../../../components';
import { Fonts } from '../../../../../assets/fonts';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../../util/metrics';
import { onCamera, onGallery } from '../../../../../util/Halper';
import { useCreatePostMutation } from '@evuro-frontend/store';
import { useNavigation } from '@react-navigation/native';
import { useCreateJobMutation } from '@evuro-frontend/store';

const CreatePost = ({ route }) => {
  const user = route?.params?.user;
  const isJobPost = route?.params?.isJobPost;

  const styles = useCreatePostStyle();

  const navigation = useNavigation();

  const [createPost, { isLoading: isPostLoading }] = useCreatePostMutation();
  const [createJob, { isLoading: isJobLoading }] = useCreateJobMutation();

  const [postData, setPostData] = useState({
    description: '',
    images: [],
  });

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('description', postData.description);

    postData.images.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        type: 'image/jpg',
        name: image.substring(image.lastIndexOf('/') + 1),
      });
    });

    if (postData.images.length === 0 || postData.description === '') {
      alert('something is missing');
    } else {
      try {
        const res = await createPost(formData);
        console.log('create post api reponce=====', res);
        if (res?.data) {
          setPostData({
            description: '',
            images: [],
          });
          navigation.goBack();
        }
      } catch (error) {
        console.log('error=====', error);
      }
    }
  };

  const handleJobPost = async () => {
    console.log('creating a job=======', postData);
    const formData = new FormData();
    formData.append('description', postData.description);

    postData.images.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        type: 'image/jpg',
        name: image.substring(image.lastIndexOf('/') + 1),
      });
    });

    try {
      const res = await createJob(formData);
      console.log('create job api reponce=====', res);
      if (res?.data?.data) {
        setPostData({
          description: '',
          images: [],
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  const imageOption = {
    mediaType: 'photo',
    // cropping: true,
    quality: 0.8,
    compressImageQuality: 0.8,
    compressImageMaxHeight: 1280,
    compressImageMaxWidth: 1280,
    multiple: true,
    forceJpg: true,
  };

  const onCameraPick = () => {
    try {
      onCamera({
        imageOption,
        handleChange: (result) => {
          setPostData({
            ...postData,
            images: [...postData.images, result.path],
          });
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
          setPostData({
            ...postData,
            images: [...postData.images, ...result.map((item, i) => item.path)],
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainWrapper>
      <CustomHeader
        onBackHeader={true}
        headerTitle={isJobPost ? 'Job Post' : 'Create Post'}
        Spacer
      />
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={styles.userImageContainer}>
              <CustomImage
                isUser
                url={user?.profileImage}
                style={styles.userImage}
              />
            </View>
            <CustomText
              label={user?.name}
              fontSize={15}
              fontFamily={Fonts.Medium}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <TextInput
              placeholder={
                isJobPost ? 'Write a requirement...' : 'Write a discription...'
              }
              value={postData.description}
              onChangeText={(e) => {
                setPostData({ ...postData, description: e });
              }}
              multiline
              placeholderTextColor={Colors.lightGray}
              textAlignVertical="top"
              style={styles.description}
            />
          </View>
        </View>

        <FlatList
          horizontal
          scrollEnabled
          ListEmptyComponent={() => {
            return <View />;
          }}
          showsHorizontalScrollIndicator={false}
          data={postData.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <CustomImage useModel url={item} style={styles.image} />
              <TouchableOpacity
                onPress={() => {
                  const updatedImages = postData.images.filter(
                    (_, i) => i !== index
                  );
                  setPostData({ ...postData, images: updatedImages });
                }}
                activeOpacity={0.6}
                style={styles.crossButton}
              >
                <Icons
                  family={'Entypo'}
                  name="plus"
                  color={Colors.white}
                  size={16}
                />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.footerContainer}>
          <View style={styles.iconsContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={onGalleryPick}>
              <Icons
                family={'Entypo'}
                name={'images'}
                size={35}
                color={Colors.lightGray}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onCameraPick}>
              <Icons
                family={'Ionicons'}
                name={'camera'}
                size={35}
                color={Colors.lightGray}
              />
            </TouchableOpacity>
          </View>
          <CustomButton
            loading={isPostLoading || isJobLoading}
            backgroundColor={isJobPost ? Colors.buttonGreen : Colors.darkBlue}
            onPress={isJobPost ? handleJobPost : handleCreatePost}
            disabled={
              postData.description && postData.images.length > 0 ? false : true
            }
            title={'Post'}
            width={metrics.width(135)}
          />
        </View>
      </View>
    </MainWrapper>
  );
};

export default CreatePost;
