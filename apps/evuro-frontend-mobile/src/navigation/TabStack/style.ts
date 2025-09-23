import { StyleSheet, Platform } from 'react-native';
import { metrics, normalizeSize } from '../../util/metrics';
import { Colors } from '@evuro-frontend/assets';

export const useCustomTabBarStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: metrics.height(Platform.OS === 'android' ? 90 : 80),
      backgroundColor: Colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      left: 0,
      right: 0,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      height: metrics.height(Platform.OS === 'android' ? 80 : 60),
    },
    innerView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: normalizeSize(50),
      height: normalizeSize(60),
      borderRadius: 10,
    },
  });
