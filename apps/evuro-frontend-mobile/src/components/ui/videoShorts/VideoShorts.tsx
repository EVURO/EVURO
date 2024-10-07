import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

import VideoCard from './molecules/VideoCard';
import { useGetShortsQuery } from 'libs/store/src/lib/slices/shorts/shorts.api';
import CustomText from '../CustomText';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
const ScreenHeight = Dimensions.get('window').height;

function VideoShorts(
  { route },
  {
    backgroundColor = 'black',
    headerTitle,
    headerIconName,
    headerIconColor,
    headerIconSize,
    headerIcon,
    headerComponent,
    onHeaderIconPress,
    optionsComponent,
    pauseOnOptionsShow,
    onSharePress,
    onCommentPress,
    onLikePress,
    onDislikePress,
    onFinishPlaying,
    minimumTrackTintColor,
    maximumTrackTintColor,
    thumbTintColor,
    timeElapsedColor,
    totalTimeColor,
  }
) {
  const { data } = useGetShortsQuery('');

  const isAllShorts = route?.params?.allShorts;

  const currentVideo = route?.params?.currentVideo;

  // const videos = route?.params?.videos;
  const videos = isAllShorts ? data?.data || [] : route?.params?.videos;

  const FlatlistRef = useRef(null);
  const [ViewableItem, SetViewableItem] = useState('');
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });
  const applyProps = {
    backgroundColor: backgroundColor,
    headerTitle: headerTitle,
    headerIconName: headerIconName,
    headerIconColor: headerIconColor,
    headerIconSize: headerIconSize,
    headerIcon: headerIcon,
    headerComponent: headerComponent,
    onHeaderIconPress: onHeaderIconPress,
    optionsComponent: optionsComponent,
    pauseOnOptionsShow: pauseOnOptionsShow,
    onSharePress: onSharePress,
    onCommentPress: onCommentPress,
    onLikePress: onLikePress,
    onDislikePress: onDislikePress,
    onFinishPlaying: onFinishPlaying,
    minimumTrackTintColor: minimumTrackTintColor,
    maximumTrackTintColor: maximumTrackTintColor,
    thumbTintColor: thumbTintColor,
    timeElapsedColor: timeElapsedColor,
    totalTimeColor: totalTimeColor,
  };

  // Viewable configuration
  const onViewRef = useRef((viewableItems) => {
    if (viewableItems?.viewableItems?.length > 0)
      SetViewableItem(viewableItems?.viewableItems[0]?.item._id || 0);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={FlatlistRef}
        data={videos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <VideoCard
            item={item}
            index={index}
            ViewableItem={ViewableItem}
            onFinishPlaying={(index) => {
              if (index !== videos.length - 1) {
                FlatlistRef?.current?.scrollToIndex({
                  index: index + 1,
                });
              }
            }}
            {...applyProps}
          />
        )}
        getItemLayout={(_data, index) => ({
          length: ScreenHeight,
          offset: ScreenHeight * index,
          index,
        })}
        ListEmptyComponent={
          <View
            style={{
              height: metrics.screenHeight,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.lightGray,
            }}
          >
            <ActivityIndicator size={'large'} />
            <CustomText label="Loading..." fontSize={16} color={Colors.white} />
          </View>
        }
        snapToInterval={ScreenHeight}
        decelerationRate={0.9}
        onViewableItemsChanged={onViewRef?.current}
        viewabilityConfig={viewConfigRef?.current}
        initialScrollIndex={!isAllShorts && videos?.indexOf(currentVideo)}
      />
    </SafeAreaView>
  );
}

export default VideoShorts;
