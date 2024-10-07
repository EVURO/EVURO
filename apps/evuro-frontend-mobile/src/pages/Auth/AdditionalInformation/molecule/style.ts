import { Colors } from '@evuro-frontend/assets';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import { StyleSheet } from 'react-native';

export const useVideoIconMoleculeStyle = ({ borderColor }) =>
  StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      borderColor: borderColor,
      marginTop: metrics.height(20),
      height: metrics.height(120),
      borderRadius: 20,
      paddingHorizontal: metrics.width(30),
      flexDirection: 'row',
      alignItems: 'center',
    },
    container: {
      borderLeftWidth: 1,
      borderLeftColor: Colors.lightGray,

      width: '70%',
      alignItems: 'center',
      marginLeft: metrics.width(50),
      height: '70%',
      justifyContent: 'center',
    },
    Container: {
      height: '100%',
      width: '100%',
    },
    video: {
      width: '70%',
      height: '100%',
      borderRadius: 8,
      marginLeft: metrics.width(50),
    },
  });
