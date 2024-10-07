/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
// packages Imports
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';

import Buttons from './Buttons';
import Header from './Header';
import helper from '../utils/Helper';
import { useNavigation } from '@react-navigation/native';
import CustomImage from '../../../base/CustomImage';
import CustomText from '../../CustomText';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';
import Icons from '../../../base/Icons';
import {
  useDislikeShortMutation,
  useLikeShortMutation,
} from 'libs/store/src/lib/slices/shorts/shorts.api';
import { useAppSelector } from '@evuro-frontend/store';
import { handleLargerText } from 'apps/evuro-frontend-mobile/src/util/Halper';
import colors from 'libs/assets/src/colors/colors';
// Screen Dimensions
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

function VideoCard({
  item,
  ViewableItem,
  // liked = false,
  // disliked = false,
  index,

  // Container Props
  backgroundColor = 'black',

  // Header Props
  headerTitle = 'Video shorts',
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress = () => {},

  // Options Props

  pauseOnOptionsShow = true,
  onSharePress = (_id: number) => {},
  onCommentPress = (_id: number) => {},

  // Player Props
  onFinishPlaying = (index: number) => {},

  // Slider Props
  minimumTrackTintColor = 'white',
  maximumTrackTintColor = 'grey',
  thumbTintColor = 'white',

  // Time Props
  timeElapsedColor = 'white',
  totalTimeColor = 'white',
}) {
  const navigation = useNavigation();
  // ref for Video Player
  const VideoPlayer = useRef(null);

  const [likeShort] = useLikeShortMutation();
  const [dislikeShort] = useDislikeShortMutation();
  const { loginData } = useAppSelector((state) => state?.user);

  // States
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  const [Progress, SetProgress] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [Paused, SetPaused] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isPauseButtonVisible, setIsPauseButtonVisible] = useState(true);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const ref = useRef();
  useEffect(() => {
    if (!Paused) {
      ref.current = setTimeout(() => setIsPauseButtonVisible(false), 1000);
    } else {
      clearTimeout(ref.current);
    }
  }, [Paused]);

  const handlePlayPause = () => {
    if (Paused) {
      SetPaused(false);
    } else {
      SetPaused(true);
      setIsPauseButtonVisible(true);
    }
  };

  const onLikePress = async (_id: number) => {
    try {
      const res = await likeShort(_id);
      if (res?.data) {
        console.log('like api done');
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  const onDislikePress = async (_id: number) => {
    try {
      const res = await dislikeShort(_id);
      if (res?.data) {
        console.log('dislike api done');
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  // Play/Pause video according to viisibility
  useEffect(() => {
    if (ViewableItem === item?._id) SetPaused(false);
    else SetPaused(true);
  }, [ViewableItem, item]);

  // Callbhack for Seek Update
  const SeekUpdate = useCallback(
    async (seekTime) => {
      try {
        if (VideoPlayer.current)
          VideoPlayer.current.seek((seekTime * Duration) / 100 / 1000);
      } catch (error) {
        /* empty */
      }
    },
    [Duration]
  );

  // Callback for PlayBackStatusUpdate
  const PlayBackStatusUpdate = (playbackStatus) => {
    try {
      const currentTime = Math.round(playbackStatus.currentTime);
      const duration = Math.round(playbackStatus.seekableDuration);
      if (currentTime)
        if (duration) SetProgress((currentTime / duration) * 100);
    } catch (error) {
      /* empty */
    }
  };

  // function for getting video dimensions on load complete
  const onLoadComplete = (event) => {
    const { naturalSize } = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(event.duration * 1000);
    } catch (error) {
      /* empty */
    }
  };

  // fuction to Go back 10 seconds
  const onFirstHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        const toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        if (toSeek > 10) VideoPlayer.current.seek(toSeek - 10);
      }
    } catch (error) {}
  };

  // fuction to skip 10 seconds
  const onSecondHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        const toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        VideoPlayer.current.seek(toSeek + 10);
      }
    } catch (error) {}
  };

  // Manage error here
  const videoError = (error) => {};

  // useMemo for Slider
  const GetSlider = useMemo(
    () => (
      <View style={styles.SliderContainer}>
        <Text style={[styles.TimeOne, { color: timeElapsedColor }]}>
          {helper.GetDurationFormat(Math.floor((Progress * Duration) / 100))}
        </Text>
        <Slider
          style={{ height: 40, width: '100%' }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
          value={Progress}
          onSlidingComplete={(data) => SeekUpdate(data)}
        />
        <Text style={[styles.TimeTwo, { color: totalTimeColor }]}>
          {helper.GetDurationFormat(Duration || 0)}
        </Text>
      </View>
    ),
    [
      timeElapsedColor,
      Progress,
      Duration,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      totalTimeColor,
      SeekUpdate,
    ]
  );

  // useMemo for Slider
  const GetHeader = useMemo(
    () => (
      <View style={styles.HeaderContainer}>
        <Header
          onPress={() => {}}
          GoBack={() => navigation.goBack()}
          text={headerTitle}
          customComponent={headerComponent}
          customIcon={headerIcon}
          color={headerIconColor}
          name={headerIconName}
          size={headerIconSize}
        />
      </View>
    ),
    [
      headerComponent,
      headerIcon,
      headerIconColor,
      headerIconName,
      headerIconSize,
      headerTitle,
      onHeaderIconPress,
    ]
  );

  // useMemo for Options
  const GetButtons = useMemo(
    () => (
      <View
        style={{
          width: metrics.screenWidth,
          position: 'absolute',
          zIndex: 100,
          bottom: 60,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Pressable style={{ width: '80%', padding: 10 }}>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
            }}
          >
            {showMore
              ? `${item?.description}`
              : handleLargerText(item?.description, 30)}
            {item?.description?.length > 30 && (
              <Text
                onPress={toggleDescription}
                style={{
                  fontSize: 16,
                  color: colors.lightGray,
                }}
              >
                {showMore ? 'show less' : 'show more'}
              </Text>
            )}
          </Text>
        </Pressable>
        <View
          style={{
            alignItems: 'center',
            width: '20%',
            justifyContent: 'center',
            paddingHorizontal: metrics.width(5),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={
              () =>
                navigation.navigate('Profile', {
                  specificUser: item?.user,
                  isShorts: true,
                })
              // console.log('profile pressed======', item?.user?._id)
            }
            style={{
              width: metrics.width(60),
              height: metrics.width(60),
              borderWidth: 1,
              borderRadius: 50,
              borderColor: 'white',
              alignItems: 'center',
              marginBottom: metrics.height(5),
            }}
          >
            <CustomImage
              url={item?.user?.profileImage}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
                marginBottom: metrics.height(5),
              }}
            />
          </TouchableOpacity>
          <View>
            <CustomText
              label={handleLargerText(item?.user?.name, 7)}
              color={Colors.white}
              fontFamily={Fonts.Medium}
              fontSize={17}
            />
          </View>

          <Buttons
            name={item?.liked ? 'like1' : 'like2'}
            text={`${item?.likes} likes`}
            color={item?.liked ? 'dodgerblue' : 'white'}
            onPress={() => onLikePress(item?._id)}
            customComponent={undefined}
          />

          <Buttons
            name={item?.disliked ? 'dislike1' : 'dislike2'}
            text={item?.disliked ? 'disliked' : 'dislike'}
            color={item?.disliked ? 'dodgerblue' : 'white'}
            onPress={() => onDislikePress(item?._id)}
            customComponent={undefined}
          />

          {!(loginData?.data?.userType == 'Talent') &&
            item?.user?.userType == 'Talent' && (
              <Buttons
                name={'pluscircle'}
                text={'Book Now'}
                color={'white'}
                onPress={() =>
                  navigation.navigate('WalkPlanner', { data: item?.user })
                }
                customComponent={undefined}
              />
            )}
        </View>
      </View>
    ),
    [onLikePress, item, onDislikePress]
  );

  return (
    <Pressable
      style={[styles.container, { backgroundColor: backgroundColor }]}
      onPress={handlePlayPause}
    >
      <Pressable style={styles.FirstHalf} onPress={handlePlayPause} />
      <Pressable style={styles.SecondHalf} onPress={handlePlayPause} />
      <Video
        ref={VideoPlayer}
        source={{
          uri: item?.video,
        }}
        style={VideoDimensions}
        resizeMode="cover"
        onError={videoError}
        playInBackground={false}
        progressUpdateInterval={1000}
        paused={Paused}
        muted={false}
        repeat={true}
        onLoad={onLoadComplete}
        onProgress={PlayBackStatusUpdate}
        onEnd={() => onFinishPlaying(index)}
      />

      <>
        {GetHeader}
        {GetButtons}
        {GetSlider}
      </>
      {isPauseButtonVisible && (
        <TouchableOpacity
          onPress={handlePlayPause}
          style={{
            position: 'absolute',
            width: metrics.width(80),
            height: metrics.width(80),
            backgroundColor: 'white',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.4,
          }}
        >
          <Icons
            family={'FontAwesome6'}
            size={26}
            name={Paused ? 'play' : 'pause'}
          />
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

// Exports
export default VideoCard;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SliderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    height: 55,
    bottom: 0,
    zIndex: 100,
  },
  TimeOne: {
    color: 'grey',
    position: 'absolute',
    left: 15,
    fontSize: 13,
    bottom: 5,
  },
  TimeTwo: {
    color: 'grey',
    position: 'absolute',
    right: 15,
    fontSize: 13,
    bottom: 5,
  },
  OptionsContainer: { position: 'absolute', zIndex: 100 },
  HeaderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    top: 0,
    height: 50,
    zIndex: 100,
  },
  FirstHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  SecondHalf: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
});
