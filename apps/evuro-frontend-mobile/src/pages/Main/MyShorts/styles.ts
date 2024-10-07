import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useMyVideoShortsStyle = () =>
  StyleSheet.create({
    container: { width: '100%' },
    contentContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingVertical: metrics.height(17),
    },
    videoContainer: {
      width: '32%',
      marginVertical: metrics.height(4),
      height: metrics.width(172),
      borderRadius: 10,
      backgroundColor: Colors.lightGray,
    },
    video: { width: '100%', height: '100%', borderRadius: 10 },
    emptyView: {
      width: '31%',
      marginVertical: metrics.height(12),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginVertical: metrics.height(30),
    },
    button: {
      width: metrics.width(70),
      height: metrics.width(70),
      backgroundColor: Colors.lightskyBlue,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: Colors.darkSkyBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
