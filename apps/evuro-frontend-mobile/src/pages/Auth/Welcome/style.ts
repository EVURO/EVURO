import { Colors } from '@evuro-frontend/assets';
import { metrics, normalizeSize } from '../../../util/metrics';
import { Dimensions, StyleSheet } from 'react-native';

export const useWellcomeStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    imgContainer: {
      height: normalizeSize(250),
      width: Dimensions.get('window').width,
      marginBottom: metrics.height(25),
    },
    buttonContainer: {
      marginTop: metrics.height(20),
      paddingHorizontal: metrics.width(20),
    },
    border: {
      borderBottomWidth: 1,
      marginTop: metrics.height(35),
      borderColor: Colors.lightGray,
      backgroundColor: 'red',
    },
    signUpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: normalizeSize(30),
      marginTop: '35%',
    },
  });
