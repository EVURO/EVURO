import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CustomHeader, CustomText, MainWrapper } from '../../../components';
import { usePostsStyle } from './styles';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';

import {
  useAppSelector,
  useGetAllJobsQuery,
  useGetJobsQuery,
} from '@evuro-frontend/store';
import Post from './molecules/Post';
import CustomImage from 'apps/evuro-frontend-mobile/src/components/base/CustomImage';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';
import { useNavigation } from '@react-navigation/native';

interface postsInterface {
  route?: unknown;
  postsData?: [];
  onDrawerPress?: () => void;
}

const Posts: React.FC<postsInterface> = ({
  route,
  postsData,
  onDrawerPress,
}) => {
  const styles = usePostsStyle();
  const isCreatedPost = route?.params?.isCreatedPost;

  const { loginData } = useAppSelector((state) => state.user);
  const flatListRef = useRef<FlatList | null>(null);
  const [initialItem, setInitialItem] = useState();

  const [data, setData] = useState([]);

  const isJobPost = route?.params?.isJobPost;

  const { data: specificParentJobs, error: jobsError } = useGetJobsQuery(null);
  const { data: allJobsData, error: allJobsError } = useGetAllJobsQuery(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.data) {
      setData(route?.params?.data);
      setInitialItem(route?.params?.initial);
    } else if (route?.params?.isJobPost) {
      if (loginData?.data?.userType === 'Talent') {
        setData(allJobsData?.data);
      } else setData(specificParentJobs?.data);
    } else {
      setData(postsData);
    }
  }, [
    allJobsData,
    loginData?.data?.userType,
    postsData,
    route?.params?.data,
    route?.params?.initial,
    route?.params?.isJobPost,
    specificParentJobs?.data,
  ]);

  useEffect(() => {
    if (initialItem) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: data?.indexOf(initialItem),
      });
    }
  }, [initialItem]);

  return (
    <MainWrapper paddingHorizontal={-1} backgroundColor={Colors.lighterGray}>
      {route?.params?.data ? (
        <CustomHeader
          onBackHeader
          paddingHorizontal={20}
          headerTitle={loginData?.data.name}
          backgroundColor={Colors.lighterGray}
          Spacer
        />
      ) : isJobPost && !(loginData?.data?.userType == 'Talent') ? (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('CreatePost', {
                user: loginData?.data,
                isJobPost: isJobPost,
              });
            }}
            style={{
              paddingHorizontal: metrics.width(20),
              marginTop: metrics.width(15),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: Colors.alphaLightGray,
                  height: metrics.width(50),
                  width: metrics.width(50),
                  marginRight: metrics.width(20),
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
              >
                <CustomImage
                  url={loginData?.data?.profileImage}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>

              <View>
                <CustomText
                  label="Post a Job"
                  fontSize={15}
                  fontFamily={Fonts.Medium}
                  color={Colors.darkGray}
                />
              </View>
            </View>
            <View>
              <Svgs.GalleryImageLogo />
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.lightGray,
              marginTop: metrics.height(10),
              width: '95%',
              alignSelf: 'center',
            }}
          />
        </>
      ) : !isJobPost ? (
        <View
          style={{
            marginHorizontal: metrics.width(10),
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
            paddingVertical: metrics.height(10),
            // marginVertical: metrics.height(20),
          }}
        >
          <View>
            <CustomHeader
              isTitle
              bellIcon
              WelcomeText
              isProfile
              onDrawer
              onDrawerPress={onDrawerPress}
              backgroundColor={Colors.lighterGray}
              onBackHeader={false}
            />
          </View>
        </View>
      ) : (
        <View style={{ paddingHorizontal: metrics.width(10) }}>
          <CustomHeader
            onBackHeader={true}
            headerTitle="Jobs"
            backgroundColor="transparent"
            Spacer
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.lightGray,
              marginTop: metrics.height(10),
            }}
          />
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={data}
        contentContainerStyle={{
          paddingBottom: '20%',
          marginTop: metrics.height(10),
        }}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: metrics.height(454),
          offset: metrics.height(454) * index,
          index,
        })}
        renderItem={useCallback(({ item, index }) => {
          return (
            <View
              style={{
                backgroundColor: Colors.white,
                margin: metrics.height(10),
                borderRadius: 15,
              }}
            >
              <Post
                item={item}
                isCreatedPost={isCreatedPost}
                isJobPost={isJobPost}
              />
            </View>
          );
        }, [])}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                marginTop: metrics.height(100),
                alignItems: 'center',
              }}
            >
              <CustomText
                label={isJobPost ? 'No Job Post found.' : 'No Post found.'}
                color={Colors.red}
                fontSize={16}
              />
            </View>
          );
        }}
      />
    </MainWrapper>
  );
};

export default Posts;
