import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { Colors } from '@evuro-frontend/assets';
import { useLoadingModalStyle } from '../style';

const LoadingModal = () => {
  const styles = useLoadingModalStyle();

  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator color={Colors.darkBlue} size={40} />
    </View>
  );
};

export default LoadingModal;
