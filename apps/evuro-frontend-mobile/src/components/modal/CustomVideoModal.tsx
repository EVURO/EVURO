/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useCustomVideoModalStyle } from '../style';
import CustomModal from '../base/CustomModal';

import Video from 'react-native-video';
import Icons from '../base/Icons';
import { metrics } from '../../util/metrics';

interface iProps {
  isVisible: boolean;
  onClose: () => void;
  label: string;
  url: string;
}

const CustomVideoModal: React.FC<iProps> = ({
  isVisible,
  label,
  onClose,
  url,
}) => {
  const styles = useCustomVideoModalStyle();
  return (
    <CustomModal visible={isVisible} onRequestClose={onClose}>
      <View style={styles.Container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.crossButton}
          onPress={onClose}
        >
          <Icons
            family={'Entypo'}
            size={35}
            name="circle-with-cross"
            color="black"
          />
        </TouchableOpacity>
        <Video
          source={{ uri: url }}
          repeat
          style={styles.video}
          resizeMode="contain"
          controls
        />
      </View>
    </CustomModal>
  );
};

export default CustomVideoModal;
