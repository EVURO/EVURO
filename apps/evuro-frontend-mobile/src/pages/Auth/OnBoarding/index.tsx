import {
  View,
  FlatList,
  Animated,
  SafeAreaView,
  Image,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Easing,
} from 'react-native';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useOnBoardingStyle } from './style';
import { metrics, normalizeSize } from '../../../util/metrics';
import { Colors, Images, Svgs } from '@evuro-frontend/assets';
import { CustomButton, CustomText } from '../../../components';
import { Fonts } from '../../../assets/fonts';
import {
  setIsVisitor,
  useAppDispatch,
  useGetLaunchPadByUnAuthUserQuery,
  useGetVideoUrlQuery,
} from '@evuro-frontend/store';
import Video from 'react-native-video';

const OnBoarding = ({ navigation }) => {
  const { data } = useGetVideoUrlQuery();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>();
  const styles = useOnBoardingStyle();
  const dispatch = useAppDispatch();
  const [videoLoading, setVideoLoading] = useState(false);

  const scaleValue = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(pulse);
  };

  useEffect(() => {
    pulse();
  }, []);

  const onBoardingData = [
    {
      backgroundColor: 'red',
      component: Images.onboarding1,
      id: '1',
    },
    {
      backgroundColor: 'green',
      component: Images.onboarding2,
      id: '2',
    },
    {
      backgroundColor: 'blue',
      component: Images.onboarding3,
      id: '3',
    },
    {
      id: '4',
    },
  ];

  const isLastIndex = currentIndex === onBoardingData.length - 1;

  const moveToNextIndex = useCallback(() => {
    if (isLastIndex) {
      navigation.navigate('GetStarted');
    } else {
      const nextIndex =
        currentIndex === onBoardingData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }
  }, [isLastIndex, currentIndex, flatListRef]);

  const renderOnBoardingData = useCallback(
    ({ item, index }) => {
      return (
        <>
          {currentIndex === 3 ? (
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            >
              {data?.data?.video && (
                <Video
                  source={{ uri: data?.data?.video }}
                  repeat
                  muted={true}
                  style={{ height: '100%', width: '100%' }}
                  resizeMode="cover"
                  onLoadStart={() => setVideoLoading(true)}
                  onLoad={() =>
                    setTimeout(() => {
                      setVideoLoading(false);
                    }, 2000)
                  }
                />
              )}
            </View>
          ) : (
            <View
              style={{
                height: normalizeSize(485),
                width: Dimensions.get('window').width,
                // backgroundColor: item.backgroundColor,
              }}
            >
              {item.component && (
                <Image
                  source={item.component}
                  resizeMode="cover"
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              )}
            </View>
          )}

          {currentIndex === 3 && videoLoading && (
            <View style={styles.onLoad}>
              <ActivityIndicator size="large" color={Colors.white} />
            </View>
          )}
        </>
      );
    },
    [currentIndex, data, videoLoading]
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <Animated.View
        style={{
          backgroundColor: currentIndex === 3 ? 'transparent' : Colors.white,
          height: '85%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          overflow: 'hidden',
          width: Dimensions.get('window').width,
        }}
      >
        <Animated.FlatList
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          data={onBoardingData}
          ref={flatListRef}
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Number((x / metrics.screenWidth)?.toFixed(0)));
          }}
          initialScrollIndex={0}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOnBoardingData}
        />
        {currentIndex === 3 ? null : (
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: metrics.height(20),
            }}
          >
            <CustomText
              label={
                currentIndex === 0
                  ? 'Dogwalker earning'
                  : currentIndex === 1
                  ? 'Dog is part of the family'
                  : 'Pet industry economics'
              }
              fontSize={30}
              fontFamily={Fonts.Bold}
            />
            <View
              style={{
                width: '90%',
              }}
            >
              <CustomText
                label={
                  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout'
                }
                fontSize={17}
                textAlign="center"
                marginBottom={metrics.height(15)}
                fontFamily={Fonts.Regular}
                marginTop={10}
              />
            </View>
          </View>
        )}
        <View style={styles.pawContainer}>
          {!isLastIndex &&
            Array(onBoardingData.length - 1)
              .fill('')
              .map((item, index) => {
                return (
                  <View key={index} style={styles.pawInnerContainer}>
                    {currentIndex == index ? (
                      <Svgs.paw height={25} />
                    ) : (
                      <Svgs.lightpaw height={25} />
                    )}
                  </View>
                );
              })}
        </View>
      </Animated.View>

      {isLastIndex ? (
        <View style={styles.startContainer}>
          <CustomButton
            onPress={() => navigation.navigate('WelcomeScreen')}
            title="Get Started"
            backgroundColor={Colors.white}
            color={Colors.darkBlue}
            borderRadius={50}
            shadow
          />

          <Animated.Text
            onPress={() => {
              dispatch(setIsVisitor(true));
              navigation.navigate('Launchpad');
            }}
            style={{
              fontSize: 15,
              transform: [{ scale: scaleValue }],
              color: Colors.white,
              fontFamily: Fonts.Medium,
              fontStyle: 'italic',
              marginTop: normalizeSize(20),
              textDecorationLine: 'underline',
            }}
          >
            Visit Launchpad
          </Animated.Text>

          {/* <CustomText
            label="Visit Launchpad"
            fontSize={16}
            fontFamily={Fonts.Medium}
            color={Colors.white}
            marginTop={metrics.height(20)}
            onPress={() => navigation.navigate('Launchpad')}
          /> */}
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <CustomText
            onPress={() => navigation.navigate('WelcomeScreen')}
            label={'Skip'}
            color={Colors.white}
            fontSize={20}
            textDecorationLine="underline"
          />
          <CustomText
            onPress={moveToNextIndex}
            label={'Next'}
            color={Colors.white}
            fontSize={20}
            textDecorationLine="underline"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnBoarding;
