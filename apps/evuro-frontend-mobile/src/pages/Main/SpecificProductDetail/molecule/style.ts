import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { Platform, StyleSheet } from 'react-native';

export const useMostPopularStyle = () =>
  StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      borderColor: Colors.lightGray,
      height: metrics.screenHeight / 3.9,
      width: metrics.screenWidth / 2.3,
      borderRadius: 10,
      overflow: 'hidden',
    },
    img: { height: metrics.height(130), width: '100%' },
    textContainer: {
      paddingHorizontal: metrics.width(10),
      marginTop: metrics.height(5),
    },
  });
