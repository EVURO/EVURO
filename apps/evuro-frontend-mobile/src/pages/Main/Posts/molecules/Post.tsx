import { View, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { metrics } from '../../../../util/metrics';
import CustomImage from '../../../../components/base/CustomImage';
import { usePostsStyle } from '../styles';
import { Colors } from '@evuro-frontend/assets';
import {
  CustomButton,
  CustomText,
  Icons,
  showToast,
} from '../../../../components';
import { Fonts } from '../../../../assets/fonts';
import {
  useAppSelector,
  useApplyForJobMutation,
  useGetApplicationsForJobQuery,
  useLikePostMutation,
} from '@evuro-frontend/store';
import CustomCommentModal from '../../../../components/modal/CustomCommentModal';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const Post = ({ item, isJobPost, isCreatedPost }) => {
  const FlatListRef = useRef();
  const styles = usePostsStyle();
  const { loginData } = useAppSelector((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showMore, setShowMore] = useState(false);

  const userType = loginData?.data?.userType;

  const [post, setPost] = useState({});

  useEffect(() => {
    if (isJobPost) {
      setPost({ ...item, url: item?.images });
    } else {
      setPost(item);
    }
  }, [item]);

  const navigation = useNavigation();

  const [isCommentModalVisbile, setCommentModalVisible] = useState(false);
  const [likes, setLikes] = useState({
    isLiked: item?.isLiked,
    totalLikes: item?.totalLikes,
  });

  const [applyForJob] = useApplyForJobMutation();

  const [likePost] = useLikePostMutation();

  const handleLike = async (id) => {
    setLikes({
      isLiked: !likes.isLiked,
      totalLikes: likes.isLiked ? likes.totalLikes - 1 : likes.totalLikes + 1,
    });
    try {
      const res = await likePost({ id });
      if (res) {
        console.log('post like api called---', res);
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  const handleApplyForJob = async (id) => {
    try {
      const res = await applyForJob({ id });
      if (res?.error?.data) {
        showToast('error', res?.error?.data?.message);
      } else if (res) {
        console.log(res);
        showToast('success', res?.data?.message);
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  return (
    <View>
      <Animated.View style={styles.postImageContainer}>
        <Animated.FlatList
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={post?.url}
          ref={FlatListRef}
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Number((x / metrics.screenWidth)?.toFixed(0)));
          }}
          initialScrollIndex={0}
          pagingEnabled
          keyExtractor={(post, i) => i?.toString()}
          renderItem={({ item, index }) => {
            return <CustomImage useModel url={item} style={styles.postImage} />;
          }}
        />
        {post?.url?.length > 1 && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: ' rgba(0, 0, 0, 0.5)',
              borderRadius: 30,
              paddingHorizontal: metrics.width(15),
              paddingVertical: metrics.width(3),
              right: 5,
              top: 5,
            }}
          >
            <CustomText
              label={`${currentIndex + 1}/${post?.url?.length}`}
              color={Colors.white}
              fontFamily={Fonts.Medium}
            />
          </View>
        )}
      </Animated.View>
      <View
        style={{
          flexDirection: 'column',
          // minHeight: metrics.height(65),
          justifyContent: 'center',
        }}
      >
        <View style={styles.dotsContainer}>
          {post.url?.length > 1 ? (
            Array(post?.url?.length)
              .fill('')
              .map((it, index) => {
                return (
                  <View key={index}>
                    {currentIndex === index ? (
                      <Icons
                        family={'Entypo'}
                        name="dot-single"
                        color={Colors.black}
                        size={24}
                      />
                    ) : (
                      <Icons
                        family={'Entypo'}
                        name="dot-single"
                        color={Colors.lightGray}
                        size={24}
                      />
                    )}
                  </View>
                );
              })
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            marginHorizontal: metrics.width(10),
            flexDirection: 'row',
            marginVertical: metrics.height(10),
          }}
        >
          <CustomText
            fontSize={12}
            fontFamily={Fonts.Regular}
            color={Colors.black}
            label={
              item?.description?.length > 45 && !showMore
                ? `${item?.description?.substring(0, 45)}..... `
                : item?.description
            }
          />
          {item?.description?.length > 45 && !showMore && (
            <CustomText
              label="show more"
              fontFamily={Fonts.Medium}
              onPress={() => {
                setShowMore(true);
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.postDetailsContainer}>
        <View style={styles.userContainer}>
          <TouchableOpacity
            onPress={() => {
              isJobPost
                ? navigation.navigate('Profile', {
                    specificUser: item?.postedBy,
                  })
                : navigation.navigate('Profile', {
                    specificUser: item?.user,
                  });
            }}
            style={styles.userImageContainer}
          >
            {console.log('item=======', item?.user)}
            <CustomImage
              isUser
              url={
                isJobPost
                  ? item?.postedBy?.profileImage
                  : item?.user?.profileImage
              }
              style={styles.userImage}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity
              onPress={() => {
                isJobPost
                  ? navigation.navigate('Profile', {
                      specificUser: item?.postedBy,
                    })
                  : navigation.navigate('Profile', {
                      specificUser: item?.user,
                    });
              }}
            >
              <CustomText
                label={isJobPost ? item?.postedBy?.name : item?.user?.name}
                fontSize={14}
                fontFamily={Fonts.Medium}
              />
            </TouchableOpacity>
            <CustomText
              label={moment(
                isJobPost || isCreatedPost
                  ? item?.createdAt
                  : item?.user?.createdAt
              ).fromNow()}
              fontSize={12}
              fontFamily={Fonts.Regular}
              color={Colors.lightGray}
            />
          </View>
        </View>

        {/* {console.log('item?.createdAt======', item?.createdAt)} */}

        {isJobPost ? (
          <TouchableOpacity
            onPress={() => {
              loginData?.data?.userType == 'Talent'
                ? handleApplyForJob(item?._id)
                : setCommentModalVisible(true);
            }}
            style={{ width: '35%', marginRight: metrics.width(20) }}
          >
            <CustomButton
              title={
                loginData?.data?.userType == 'Talent'
                  ? item?.Applied
                    ? 'Applied'
                    : 'Apply this job'
                  : 'View requests'
              }
              fontSize={14}
              backgroundColor={
                item?.Applied && loginData?.data?.userType == 'Talent'
                  ? Colors.darkSkyBlue
                  : Colors.buttonGreen
              }
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={() => {
                handleLike(item?._id);
              }}
            >
              <Icons
                size={25}
                family={'Ionicons'}
                name={likes.isLiked ? 'heart' : 'heart-outline'}
                color={likes.isLiked ? Colors.red : Colors.black}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 7, marginRight: 15 }}>
              <CustomText
                label={likes.totalLikes}
                fontSize={22}
                color={likes.isLiked ? Colors.black : Colors.lightGray}
              />
            </View>
            <Icons
              onPress={() => setCommentModalVisible(true)}
              size={22}
              style={styles.commentIcon}
              family={'Ionicons'}
              name={'chatbubble-outline'}
              color={Colors.black}
            />
            <View style={{ marginLeft: 7, marginRight: 15 }}>
              <CustomText
                label={item?.comments?.length}
                fontSize={22}
                color={Colors.lightGray}
              />
            </View>
          </View>
        )}
      </View>
      <CustomCommentModal
        isJobPost={isJobPost}
        commentsType="posts"
        visible={isCommentModalVisbile}
        onClose={() => {
          setCommentModalVisible(false);
        }}
        userData={loginData}
        comments={item?.comments}
        id={item?._id}
      />
    </View>
  );
};

export default Post;
