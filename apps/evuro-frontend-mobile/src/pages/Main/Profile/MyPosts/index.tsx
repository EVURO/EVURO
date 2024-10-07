/* eslint-disable react/jsx-pascal-case */
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  MainWrapper,
  UploadPhoto,
} from '../../../../components/index';
import { metrics } from '../../../../util/metrics';
import { useProfileStyle } from './style';
import CustomImage from '../../../../components/base/CustomImage';
import { Colors, Svgs } from '@evuro-frontend/assets';
import Posts from './tabs/Posts';
import Shorts from './tabs/Shorts';
import MyProfile from './tabs/MyProfile';
import { useAppSelector, useGetPostsQuery } from '@evuro-frontend/store';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }) => {
  const navigation = useNavigation();
  const { loginData } = useAppSelector((state) => state.user);
  // console.log('loginData=====', loginData?.data?.address);

  const user = route?.params?.specificUser;
  const isShorts = route?.params?.isShorts;

  const { data } = useGetPostsQuery({ id: user?._id });

  const userData = data?.data[0]?.user;

  const styles = useProfileStyle();

  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabs, setTabs] = useState([]);

  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    if (loginData?.data?.userType === 'Talent') {
      if (user) {
        if (user?.userType === 'Talent') {
          setTabs([...allTabs]);
        } else {
          setTabs(allTabs.filter((item, index) => index < 2));
        }
      } else setTabs([...allTabs]);
    } else {
      if (user) {
        if (user?.userType === 'Talent') {
          setTabs([...allTabs]);
        } else {
          setTabs(allTabs.filter((item, index) => index < 2));
        }
      } else setTabs([...allTabs]);
    }
  }, [loginData, userData]);

  const allTabs = [
    {
      icon: Svgs.postsGrey,
      activeIcon: Svgs.postsBlue,
      name: 'posts',
      component: <Posts id={user?._id} />,
    },
    {
      icon: Svgs.videosGrey,
      activeIcon: Svgs.videosBlue,
      name: 'shorts',
      component: <Shorts userId={user ? user?._id : loginData?.data?._id} />,
    },
    {
      icon: Svgs.personGrey,
      activeIcon: Svgs.personBlue,
      name: 'profile',
      component: <MyProfile video={userData?.Video} />,
    },
  ];

  const moveToTab = useCallback(
    (index) => {
      setActiveTab(index);
      flatListRef.current?.scrollToIndex({
        index: index,
        animated: true,
      });
    },
    [flatListRef]
  );
  useEffect(() => {
    if (tabs.length > 0) {
      moveToTab(isShorts ? 1 : 0);
    }
  }, [isShorts, tabs]);

  return (
    <MainWrapper paddingHorizontal={-1}>
      <CustomHeader
        paddingHorizontal={metrics.width(20)}
        onBackHeader
        liked={liked}
        handleFavourite={() => setLiked(!liked)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfoCotainer}>
          <TouchableOpacity activeOpacity={0.7} style={styles.imageContainer}>
            <CustomImage
              isUser
              url={
                user
                  ? user?.profileImage
                  : loginData?.data?._id === user?._id && user?.profileImage
              }
              style={styles.image}
            />
            <View style={styles.payContainer}>
              {user?.userType === 'Talent' ? (
                <CustomText
                  label={
                    user?.ratePerHour ? `$${user?.ratePerHour}/hr` : '$0/hr'
                  }
                  color={Colors.white}
                />
              ) : (
                <View></View>
              )}
            </View>
          </TouchableOpacity>
          <CustomText
            label={
              user
                ? user?.name
                : loginData?.data?.name === user?.name
                ? user?.name
                : 'User name'
            }
            color={
              user?.name || loginData?.data?.name === user?.name
                ? Colors.black
                : Colors.lightGray
            }
            fontSize={20}
            containerStyle={styles.nameText}
          />
          <CustomText
            label={`Location : ${loginData?.data?.address}`}
            color={Colors.black}
            fontSize={14}
          />
          {(user ? user?._id === loginData?.data?._id : loginData) &&
            activeTab < 2 &&
            (activeTab === 0 ? (
              <CustomButton
                onPress={() => {
                  navigation.navigate('CreatePost', {
                    user: loginData?.data,
                  });
                }}
                title={'Create Post'}
                width={'50%'}
                borderRadius={10}
                marginTop={metrics.height(15)}
              />
            ) : (
              <View style={{ width: '100%' }}>
                <UploadPhoto
                  handleChange={(res) => {
                    navigation.navigate('CreateShort', { videoUrl: res?.path });
                  }}
                  isVideo
                  renderButton={(handleChange) => {
                    return (
                      <CustomButton
                        onPress={handleChange}
                        title={'Create Short'}
                        width={'50%'}
                        borderRadius={10}
                        marginTop={metrics.height(15)}
                      />
                    );
                  }}
                />
              </View>
            ))}
          {!(loginData?.data?.userType === 'Talent') &&
            user?.userType === 'Talent' && (
              <CustomButton
                onPress={() =>
                  navigation.navigate('WalkPlanner', { data: user })
                }
                title={'Book Now'}
                width={'50%'}
                borderRadius={10}
                marginTop={metrics.height(15)}
              />
            )}
        </View>
        <View style={styles.tabsContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => moveToTab(index)}
              activeOpacity={0.9}
              style={{
                ...styles.tab,
                width: tabs.length === 2 ? '50%' : '32.7%',
                borderBottomColor:
                  activeTab === index ? '#196F92' : 'transparent',
              }}
            >
              {activeTab === index ? (
                <tab.activeIcon
                  height={metrics.width(35)}
                  width={metrics.width(35)}
                />
              ) : (
                <tab.icon
                  height={metrics.width(35)}
                  width={metrics.width(35)}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Animated.FlatList
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={tabs}
          ref={flatListRef}
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setActiveTab(Number((x / metrics.screenWidth)?.toFixed(0)));
          }}
          initialScrollIndex={0}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => item?.component}
          getItemLayout={(data, index) => ({
            length: metrics.screenWidth,
            offset: metrics.screenWidth * index,
            index,
          })}
        />
      </ScrollView>
    </MainWrapper>
  );
};

export default Profile;
