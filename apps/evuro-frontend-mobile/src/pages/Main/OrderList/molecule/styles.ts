import { Colors } from '@evuro-frontend/assets';
import {
  metrics,
  normalizeSize,
} from 'apps/evuro-frontend-mobile/src/util/metrics';
import { StyleSheet } from 'react-native';

export const useOrderListCardStyle = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.white,
      // height: normalizeSize(430),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 15,
      padding: metrics.width(15),
      overflow: 'hidden',
    },
    txtContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imgContainer: {
      height: normalizeSize(200),
      borderRadius: 15,
      overflow: 'hidden',
      marginTop: metrics.height(5),
      marginBottom: metrics.height(12),
    },
    img: { height: '100%', width: '100%', backgroundColor: Colors.lightGray },
  });
