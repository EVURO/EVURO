import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CustomText } from '../../components';
import CustomImage from '../../components/base/CustomImage';
import { Fonts } from '../../assets/fonts';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import CustomModal from '../base/CustomModal';
import {
  useAddLaunchpadCommentMutation,
  useAddPostCommentMutation,
  useGetApplicationsForJobQuery,
  useLikePostCommentMutation,
} from '@evuro-frontend/store';
import { useCustomCommentModalStyle } from '../style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

interface iProps {
  visible: boolean;
  onClose: () => void;
  userData: object;
  comments: [];
  id?: string;
  commentsType?: string;
  isJobPost?: boolean;
}

const CustomCommentModal: React.FC<iProps> = ({
  isJobPost,
  visible,
  onClose,
  userData,
  comments,
  id,
  commentsType,
}) => {
  const styles = useCustomCommentModalStyle();
  const navigation = useNavigation();

  const flatlistRef = useRef(null);

  const { data: appliedBy, error } = useGetApplicationsForJobQuery(id);

  const [myComment, setMyComment] = useState('');

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [addALaunchpadComment, { isLoading: isAddLaunchpadCommentLoading }] =
    useAddLaunchpadCommentMutation();
  const [addAPostComment, { isLoading: isAddPostsCommentLoading }] =
    useAddPostCommentMutation();
  const [likePostComment] = useLikePostCommentMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      flatlistRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        const height = event.endCoordinates.height;
        setKeyboardHeight(height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const addComment = async () => {
    const payload = {
      comment: myComment,
    };

    if (commentsType === 'posts') {
      try {
        const res = await addAPostComment({ payload, id });

        if (res?.data) {
          console.log('post comment added');
          setMyComment('');
        }
      } catch (error) {
        console.log('error=====', error);
      }
    } else {
      try {
        const res = await addALaunchpadComment({ payload, id });
        if (res?.data?.data) {
          console.log('launchpad comment added successfullyy=====', res);
        }
        if (res?.data) setMyComment('');
      } catch (error) {
        console.log('error=====', error);
      }
    }
  };

  const likeComment = async ({ postId, commentId }) => {
    try {
      const res = await likePostComment({ postId, commentId });
      if (res?.data) console.log('comment liked successfully');
    } catch (error) {
      console.log('error=====', error);
    }
  };

  return (
    <CustomModal
      visible={visible}
      height={metrics.screenHeight - metrics.height(320)}
      onRequestClose={onClose}
      // marginBottom={keyboardHeight / 2}
    >
      <Pressable onPress={onClose} style={styles.commentsSection}>
        <View style={styles.commentSectionHeader} />
        <CustomText
          label={isJobPost ? 'Job Requests' : 'Comments'}
          fontSize={18}
        />
      </Pressable>
      <FlatList
        horizontal={false}
        ref={flatlistRef}
        data={isJobPost ? appliedBy?.data?.applyCandidate : comments}
        keyExtractor={(item, index) => index?.toString()}
        onContentSizeChange={() =>
          flatlistRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={useCallback(
          ({ item }) => {
            return (
              <TouchableOpacity
                style={styles.commentSectionContainer}
                activeOpacity={1}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      isJobPost
                        ? navigation.navigate('Profile', {
                            specificUser: item,
                          })
                        : navigation.navigate('Profile', {
                            specificUser: item?.user,
                          });
                      onClose();
                    }}
                    style={styles.userImageContainer}
                  >
                    <CustomImage
                      isUser
                      url={
                        isJobPost
                          ? item?.profileImage
                          : item?.user?.profileImage
                      }
                      style={styles.userImage}
                    />
                  </TouchableOpacity>
                  <View style={styles.commentRowContainer}>
                    <View style={styles.commentRow}>
                      <CustomText
                        label={
                          commentsType === 'posts'
                            ? isJobPost
                              ? item?.name
                              : item?.user?.name
                            : `${item?.user?.name} - `
                        }
                        fontFamily={Fonts.Medium}
                        fontSize={16}
                      />
                      {!(commentsType === 'posts') && (
                        <CustomText
                          label={moment(item?.createdAt).fromNow()}
                          fontSize={14}
                          color={Colors.lightGray}
                        />
                      )}
                    </View>
                    {!isJobPost && (
                      <CustomText
                        fontSize={14}
                        containerStyle={{ marginTop: metrics.height(5) }}
                        label={item?.comment}
                      />
                    )}
                  </View>
                </View>
                {/* ======Like option for the comments which have======== */}
                {!isJobPost && commentsType === 'posts' && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      likeComment({ postId: id, commentId: item?._id });
                    }}
                    style={styles.commentLike}
                  >
                    {item?.isLiked ? (
                      <Svgs.HeartFilledRed />
                    ) : (
                      <Svgs.HeartOutlined />
                    )}
                    <CustomText label={item?.totalLikes?.toString()} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          },
          [appliedBy?.data?.applyCandidate, comments]
        )}
        ListEmptyComponent={
          <CustomText
            marginTop={metrics.height(120)}
            label={isJobPost ? 'No applicants found.' : 'No Comments found.'}
            color={Colors.red}
            fontFamily={Fonts.Medium}
            fontSize={15}
          />
        }
      />
      {!isJobPost && (
        <KeyboardAvoidingView
          style={[
            styles.commentsSectionFooter,
            // { marginBottom: keyboardHeight / 2 },
          ]}
        >
          <View style={styles.userImageContainer}>
            <CustomImage
              url={userData?.data?.profileImage}
              style={styles.userImage}
            />
          </View>
          <View style={styles.postCommentContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.lightGray}
              onChangeText={setMyComment}
              value={myComment}
              placeholder="Add a comment"
            />
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.postButton}
              onPress={addComment}
            >
              {isAddLaunchpadCommentLoading || isAddPostsCommentLoading ? (
                <ActivityIndicator
                  color={Colors.white}
                  style={{ position: 'absolute' }}
                />
              ) : (
                <Svgs.SendIcon />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </CustomModal>
  );
};

export default CustomCommentModal;
