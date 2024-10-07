import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useUserTypeStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: metrics.width(20),
    },
    container: { alignItems: 'center' },
    headerContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '80%',
    },
    imgStyle: { width: '100%', height: '80%' },
    UserSection: {
      flexDirection: 'column',
      width: metrics.screenWidth,
      paddingHorizontal: metrics.width(20),
    },
    imgContainer: {
      width: '100%',
      height: metrics.height(300),
      alignItems: 'center',
      borderRadius: 10,
      marginTop: metrics.height(20),
      backgroundColor: Colors.white,
      marginBottom: metrics.width(20),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textContainer: {
      height: '20%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
