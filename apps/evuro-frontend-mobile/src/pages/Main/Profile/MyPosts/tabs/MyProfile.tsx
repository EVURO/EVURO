import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CustomText, Icons } from '../../../../../components';
import { useMyProfileStyle } from '../style';
import Video from 'react-native-video';
import { useGetImageUrlQuery } from '@evuro-frontend/store';

const MyProfile = ({ video }) => {
  const styles = useMyProfileStyle();
  const [paused, setPaused] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  // const videoUrl = {
  //   data: 'https://player.vimeo.com/external/387164767.hd.mp4?s=428c8090d6d3aee39f82e16f2f4ea330f9165793&profile_id=174&oauth2_token_id=57447761',
  // };

  const { data: videoUrl } = useGetImageUrlQuery(video);

  const ref = useRef();
  useEffect(() => {
    if (!paused) {
      ref.current = setTimeout(() => setIsButtonVisible(false), 2000);
    } else {
      clearTimeout(ref.current);
    }
  }, [paused]);

  const handlePlayPause = () => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
      setIsButtonVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoBoxContainer}>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.videoContainer}
          activeOpacity={0.9}
        >
          {videoUrl && (
            <Video
              source={{ uri: videoUrl?.data }}
              style={styles.video}
              resizeMode="cover"
              paused={paused}
              muted
              repeat={true}
            />
          )}
          {isButtonVisible ? (
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.playPauseButton}
            >
              <Icons
                family={'FontAwesome6'}
                size={26}
                name={paused ? 'play' : 'pause'}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
      <CustomText label="Description" fontSize={22} />
      <CustomText
        label="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here"
        fontSize={14}
      />
    </View>
  );
};

export default MyProfile;
