/* eslint-disable react/jsx-pascal-case */
import { TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { CustomText } from '../../../../components/index';
import { Fonts } from '../../../../assets/fonts';
import { useVideoIconMoleculeStyle } from './style';
import Video from 'react-native-video';
import CustomVideoModal from '../../../../components/modal/CustomVideoModal';

const VideoIconMolecule = ({ onPress, label, url, borderColor }) => {
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);

  const styles = useVideoIconMoleculeStyle({ borderColor });
  return (
    <>
      <View style={styles.mainContainer}>
        <Svgs.videoIcon height={metrics.height(60)} onPress={onPress} />

        <View style={styles.container}>
          {url?.length > 0 ? (
            <TouchableOpacity
              onPress={() => setVideoModalVisible(true)}
              style={styles.Container}
              activeOpacity={0.9}
            >
              <Video
                source={{ uri: url }}
                style={styles.video}
                resizeMode="cover"
                paused={isVideoModalVisible}
                muted
              />
            </TouchableOpacity>
          ) : (
            <CustomText label={label} fontSize={13} fontFamily={Fonts.Medium} />
          )}
        </View>
      </View>
      <CustomVideoModal
        isVisible={isVideoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        label={'Video'}
        url={url}
      />
    </>
  );
};

export default VideoIconMolecule;
