/* eslint-disable react/jsx-pascal-case */
import { Colors, Svgs } from '@evuro-frontend/assets';
import { useNavigation } from '@react-navigation/native';
import { CustomHeader, MainWrapper, UploadPhoto } from '../../../components';
import { metrics } from '../../../util/metrics';
import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { useMyVideoShortsStyle } from './styles';
import VideoIconMolecule from '../../Auth/AdditionalInformation/molecule';

function MyShorts() {
  const navigation = useNavigation();
  const styles = useMyVideoShortsStyle();

  const [data, setData] = useState([]);

  useState(() =>
    setData([
      ...data,
      {
        _id: 1,
        url: 'https://player.vimeo.com/external/389783900.sd.mp4?s=093e605bc7972afe7e84eef2d924de24b3f602fc&profile_id=165&oauth2_token_id=57447761',
        liked: false,
        disliked: false,
        likes: 0,
        dislikes: 0,
      },
      {
        _id: 2,
        url: 'https://player.vimeo.com/external/387164767.hd.mp4?s=428c8090d6d3aee39f82e16f2f4ea330f9165793&profile_id=174&oauth2_token_id=57447761',
        liked: false,
        disliked: false,
        likes: 0,
        dislikes: 0,
      },
      {
        _id: 3,
        url: 'https://player.vimeo.com/external/406088665.hd.mp4?s=38be26bc4ccd0a46c8ea210c9ac5e4969db0bc26&profile_id=174&oauth2_token_id=57447761',
        liked: false,
        disliked: false,
        likes: 0,
        dislikes: 0,
      },
      {
        _id: 4,
        url: 'https://player.vimeo.com/external/387164767.hd.mp4?s=428c8090d6d3aee39f82e16f2f4ea330f9165793&profile_id=174&oauth2_token_id=57447761',
        liked: false,
        disliked: false,
        likes: 0,
        dislikes: 0,
      },
    ])
  );

  const videos = data.map((item) => ({
    ...item,
    uri: { uri: item.url },
  }));

  return (
    <MainWrapper>
      <CustomHeader headerTitle="My Shorts" onBackHeader Spacer />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('VideoShorts', {
                currentVideo: video,
                videos: videos,
              });
            }}
            style={styles.videoContainer}
            activeOpacity={0.9}
          >
            <Video
              source={video.uri}
              style={styles.video}
              resizeMode="cover"
              paused={false}
              muted
              repeat={true}
            />
          </TouchableOpacity>
        ))}
        <View style={styles.emptyView} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <UploadPhoto
          handleChange={(res) => {
            setData([
              ...data,
              {
                _id: data.length + 1,
                url: res.path,
                liked: false,
                disliked: false,
                likes: 0,
                dislikes: 0,
              },
            ]);
          }}
          isVideo
          renderButton={(handleChange) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={handleChange}
              >
                <Svgs.plus
                  width={metrics.width(40)}
                  height={metrics.width(40)}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainWrapper>
  );
}

export default MyShorts;
