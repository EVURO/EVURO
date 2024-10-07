import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useShortsStyle } from '../style';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { metrics } from '../../../../../util/metrics';
import { Icons } from '../../../../../components';
import { Colors } from '@evuro-frontend/assets';
import CustomText from '../../../../../components/ui/CustomText';
import MasonryList from '@react-native-seoul/masonry-list';
import { useGetShortsQuery } from 'libs/store/src/lib/slices/shorts/shorts.api';

const Shorts = (userId) => {
  const styles = useShortsStyle();
  const navigation = useNavigation();

  const { data: shorts, isLoading } = useGetShortsQuery(userId);

  const data = shorts?.data || [];

  const videos = data?.map((item) => ({
    ...item,
    video: item.video,
  }));

  const VideoCard = ({ video, style }) => {
    const randomNum = useMemo(
      () => Math.floor(Math.random() * 5) * 23 + 110,
      []
    );

    return (
      <TouchableOpacity
        key={video._id}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('VideoShorts', {
            currentVideo: video,
            videos: videos,
          });
        }}
        style={{
          height: randomNum,
          backgroundColor: 'grey',
          alignSelf: 'stretch',
          margin: 2,
          borderRadius: 8,
        }}
      >
        <Video
          source={{ uri: video?.video }}
          style={{
            height: '100%',
            borderRadius: 8,
          }}
          resizeMode="cover"
          paused={true}
          muted
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            marginBottom: metrics.height(4),
            height: '100%',
            backgroundColor: 'black',
            borderRadius: 8,
            opacity: 0.17,
          }}
        />
        <View
          style={{
            opacity: 1,
            zIndex: 9999,
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 3,
            left: 5,
          }}
        >
          <Icons
            size={16}
            family={'MaterialCommunityIcons'}
            name={'cards-heart'}
            color={Colors.red}
          />
          <CustomText
            label={` : ${video.likes}`}
            color={Colors.white}
            fontSize={12}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, i }) => {
    return <VideoCard video={item} style={undefined} />;
  };

  return (
    <View style={styles.container}>
      <MasonryList
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          paddingHorizontal: 3,
          alignSelf: 'stretch',
        }}
        onEndReached={() => console.log('onEndReached')}
        numColumns={3}
        data={videos}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: metrics.height(40) }}>
            {isLoading ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <CustomText
                label="No Shorts found"
                color={Colors.red}
                fontSize={18}
              />
            )}
          </View>
        }
      />
    </View>
  );
};

export default Shorts;
