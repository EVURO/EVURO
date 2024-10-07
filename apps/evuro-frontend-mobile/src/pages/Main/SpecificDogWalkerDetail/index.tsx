/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useRef, useState } from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  MainWrapper,
  RatingCard,
  showToast,
} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';
import { useSpecificDogWalkerDetailStyle } from './style';
import { Colors, Svgs } from '@evuro-frontend/assets';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from '../../../components/base/Icons';
import CustomImage from '../../../components/base/CustomImage';
import { metrics, normalizeSize } from '../../../util/metrics';
import { Fonts } from '../../../assets/fonts';
import Video from 'react-native-video';
import CustomVideoModal from '../../../components/modal/CustomVideoModal';
import {
  useAppDispatch,
  useGetImageUrlQuery,
  useGetTalentsQuery,
  useToggleFavoriteTalentMutation,
} from '@evuro-frontend/store';
import {
  addToFavorites,
  removeFromFavorites,
} from 'libs/store/src/lib/slices/user/favorite.Slice';
import DeviceInfo from 'react-native-device-info';
import MostPopular from '../SpecificProductDetail/molecule';
import { placeholderImage } from 'apps/evuro-frontend-mobile/src/util/Halper';

const SpecificDogWalkerDetail = ({ route }) => {
  const data = route?.params.data;
  const dispatch = useAppDispatch();

  const { data: videoUrl } = useGetImageUrlQuery(data?.Video);

  const [paused, setPaused] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const {
    data: getTalentsData,
    isLoading: talentsLoading,
    refetch,
  } = useGetTalentsQuery(data._id);
  const [setFavoriteTalent, { isLoading: favoriteLoading }] =
    useToggleFavoriteTalentMutation();

  const liked = getTalentsData?.data[0]?.liked;
  const talendID = getTalentsData?.data[0]?.talent?._id;
  const talendavAilability = getTalentsData?.data[0]?.talent?.availability;
  const talentAddress = getTalentsData?.data[0]?.talent?.address;

  // console.log('getTalentsData========', getTalentsData?.suggested);

  const navigation = useNavigation();
  const styles = useSpecificDogWalkerDetailStyle();

  const ref = useRef();
  useEffect(() => {
    if (!paused) {
      ref.current = setTimeout(() => setIsButtonVisible(false), 2000);
    } else {
      clearTimeout(ref.current);
    }
    refetch();
  }, [paused]);

  const handlePlayPause = () => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
      setIsButtonVisible(true);
    }
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ marginTop: metrics.height(30), alignItems: 'center' }}>
        <CustomText
          label="Data not found"
          fontSize={15}
          fontFamily={Fonts.Medium}
          color={Colors.red}
        />
      </View>
    );
  };
  const isTablet = DeviceInfo.isTablet();
  return (
    <MainWrapper headerShown={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader
          onBackHeader
          showFavIcon
          liked={liked}
          handleFavourite={async () => {
            if (liked === true) {
              showToast('success', 'Remove from wishlist success');
              await setFavoriteTalent(talendID);
              refetch();
            } else {
              showToast('success', 'Add to wishlist success');
              await setFavoriteTalent(talendID);
              refetch();
            }
          }}
        />
        <View style={styles.imageContainer}>
          <View style={styles.innerImgContainer}>
            <View
              style={{
                backgroundColor: talendavAilability === true ? 'green' : 'red',
                height: metrics.width(15),
                width: metrics.width(15),
                borderRadius: 50,
                position: 'absolute',
                zIndex: 1,
                alignSelf: 'flex-end',
                top: metrics.width(isTablet ? 0 : 5),
              }}
            />
            {data?.profileImage ? (
              <CustomImage url={data?.profileImage} style={styles.image} />
            ) : (
              <Image
                source={{ uri: 'https://picsum.photos/id/237/200/300' }}
                resizeMode="cover"
                style={styles.image}
              />
            )}
          </View>
          <CustomText
            label={data?.name}
            fontFamily={Fonts.Medium}
            fontSize={metrics.width(16)}
            marginTop={metrics.height(15)}
          />
          <CustomText label={`Location : ${talentAddress || ''}`} />
          <View style={styles.videoBoxContainer}>
            <View style={styles.hrContainer}>
              <CustomText
                label={`$${data?.ratePerHour ? data?.ratePerHour : '00'}/hr`}
                fontSize={13}
                color={Colors.white}
                fontFamily={Fonts.Medium}
              />
            </View>

            {!data?.video ? (
              <TouchableOpacity
                onPress={handlePlayPause}
                style={styles.videoContainer}
                activeOpacity={0.9}
              >
                <Video
                  source={{ uri: videoUrl?.data }}
                  style={styles.video}
                  resizeMode="cover"
                  paused={paused}
                  muted
                  repeat={true}
                />
                {isButtonVisible && (
                  <TouchableOpacity
                    onPress={handlePlayPause}
                    style={styles.playPauseButton}
                  >
                    <Icons
                      family={'Feather'}
                      size={26}
                      name={paused ? 'play' : 'pause'}
                    />
                  </TouchableOpacity>
                )}

                <Icons
                  family={'MaterialIcons'}
                  position={'absolute'}
                  name="fullscreen"
                  size={25}
                  bottom={metrics.height(10)}
                  right={metrics.width(10)}
                  onPress={() => setVideoModalVisible(true)}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              <CustomText
                label={'Video your self'}
                fontFamily={Fonts.Bold}
                fontSize={metrics.width(18)}
              />
            )}
          </View>
          <View style={styles.descriptionContainer}>
            <CustomText
              label="Discription"
              fontFamily={Fonts.Medium}
              fontSize={metrics.width(26)}
              marginBottom={metrics.height(10)}
            />
            <CustomText
              label={data?.bio}
              fontFamily={Fonts.Regular}
              fontSize={metrics.width(15)}
            />
          </View>
        </View>

        <CustomText
          label="Suggested Walkers"
          fontSize={20}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(20)}
        />
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            paddingBottom: '10%',
            marginTop: metrics.height(10),
          }}
          ListEmptyComponent={ListEmptyComponent}
          numColumns={2}
          data={new Array(4).fill('')}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  paddingHorizontal: metrics.width(5),
                  marginBottom: metrics.height(12),
                }}
              >
                <RatingCard
                  label="Walker Name"
                  country="Experience : 3 Year"
                  year="Male"
                  isTalents
                  source={{ uri: placeholderImage }}
                />
              </View>
            );
          }}
        />

        <CustomVideoModal
          isVisible={isVideoModalVisible}
          onClose={() => {
            setVideoModalVisible(false);
            setPaused(true);
            setIsButtonVisible(true);
          }}
          label={'Video'}
          url={videoUrl?.data}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() =>
            navigation.navigate('WalkPlanner', {
              data,
            })
          }
          title={'Let’s go walking'}
          marginBottom={metrics.height(10)}
          borderRadius={50}
        />
      </View>
    </MainWrapper>
  );
};

export default SpecificDogWalkerDetail;
