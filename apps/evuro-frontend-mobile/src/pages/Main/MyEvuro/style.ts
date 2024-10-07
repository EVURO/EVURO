import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useMyEvuroStyle = () =>
  StyleSheet.create({
    profileContainer: { alignSelf: 'center', alignItems: 'center' },
    imgContainer: {
      backgroundColor: Colors.lightGray,
      height: metrics.width(130),
      width: metrics.width(130),
      borderRadius: 100,
      overflow: 'hidden',
    },
    innerContainer: { marginTop: metrics.height(30) },
  });
