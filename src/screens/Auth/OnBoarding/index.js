import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef, createRef} from 'react';
import images from '../../../assets/images';
import icons from '../../../assets/icons';
import colors from '../../../util/colors';
import CustomText from '../../../common/components/CustomText';
import CustomButton from '../../../common/components/CustomButton';

import fonts from '../../../assets/fonts';
import LinearGradientBtn from '../../../common/components/LinearGradientBtn';
import {moderateScale, scale} from 'react-native-size-matters';
import Preference from 'react-native-preference';
const {width, height} = Dimensions.get('window');
const onBoardings = [
  {
    _id: '0',
    title: 'Dog walker join evurodog',
    img: images.logo,
  },
  {
    _id: '1',
    title: 'Book your next walk',
    img: images.logo,
  },
  {
    _id: '2',
    title: 'Get clean tech gears',
    img: images.logo,
  },
];

const OnBoarding = ({navigation}) => {
  const [completed, setCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);
  const [btn, setBtn] = useState(true);
  const ref = useRef();

  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    setViewableItems(viewableItems);
  });
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const response = Preference.get('userID');
    console.log(response);
    if (response) {
      console.log('hello', response);
      navigation.navigate('MainStack');
    }
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
    scrollX.addListener(({value}) => {
      if (Math.floor(value / width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });
    console.log(completed);

    return () => scrollX.removeListener();
  }, [viewableItems]);
  const handleNext = () => {
    if (currentPage == onBoardings.length - 1) return;

    ref.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };
  const handleBack = () => {
    if (currentPage == 0) return;
    ref.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };
  const renderFLatlist = ({item, index}) => {
    return (
      <View style={{width: width}} key={index}>
        <View style={styles.flatlistContainer} key={index}>
          <Image
            resizeMode="contain"
            source={item.img}
            style={{height: '70%', width: '60%'}}
          />
        </View>
        <CustomText
          label={item.title}
          textStyle={styles.flatlistText}
          alignSelf="center"
          fontFamily={fonts.medium}
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <Animated.FlatList
        data={onBoardings}
        horizontal
        ref={ref}
        pagingEnabled={true}
        // onContentSizeChange={handleViewableItemsChanged.current}
        // scrollEnabled
        onViewableItemsChanged={handleViewableItemsChanged?.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={2}
        renderItem={renderFLatlist}
        initialNumToRender={0}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
    );
  };
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <>
        <View style={styles.renderDotsContiner}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={icons.left}
              style={{width: 11, height: 21, tintColor: colors.blue}}
            />
          </TouchableOpacity>
          <View style={styles.dotContainer}>
            {onBoardings.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              const dotSize = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [8, 17, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  style={[styles.dot, {height: dotSize, width: dotSize}]}
                  key={`dot-${index}`}
                  opacity={opacity}></Animated.View>
              );
            })}
          </View>
          <TouchableOpacity onPress={handleNext}>
            <Image
              source={icons.right}
              style={{width: 11, height: 21, tintColor: colors.blue}}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <>
        <View
          style={[styles.mainContainer, {paddingRight: ref == null ? 40 : 0}]}>
          {renderContent()}
        </View>
        <View style={styles.dotRootContainer}>{renderDots()}</View>
        <View style={styles.buttonContiner}>
          {currentPage != onBoardings.length - 1 ? null : (
            <View style={styles.getStarted}>
              <LinearGradientBtn
                title="Get Started"
                alignSelf="center"
                borderRadius={moderateScale(50)}
                fontSize={moderateScale(14)}
                width="90%"
                onPress={() => navigation.navigate('login')}
              />
            </View>
          )}
        </View>
      </>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  mainContainer: {
    marginHorizontal: scale(15),
    // paddingRight: 20,
    // marginHorizontal: 40,
    backgroundColor: '#fafafa',
    height: 370,
    // width: '90%',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  flatlistContainer: {
    flex: 1,
    // backgroundColor: 'red',
    paddingRight: scale(17),
    alignItems: 'center',
    // backgroundColor: 'red',
    // marginRight: 70,
    justifyContent: 'center',
  },
  flatlistText: {
    color: colors.primary,
    fontSize: 23,
    lineHeight: 38,
    paddingRight: scale(17),
    paddingBottom: 20,
  },
  renderDotsContiner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'blue',
    width: '70%',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 12,
    backgroundColor: colors.blue,
    marginHorizontal: 6,
  },
  dotContainer: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  dotRootContainer: {
    marginTop: 40,
  },
  buttonContiner: {
    position: 'absolute',
    width: '90%',
    bottom: 0,
  },
  getStarted: {
    // position: 'absolute',
    // elevation: 5,
    // backgroundColor: 'red',
    bottom: 6,
    // width: '100%',
    borderRadius: 12,
    // backgroundColor: colors.green,
  },
  btn: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OnBoarding;
