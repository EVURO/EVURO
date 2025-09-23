import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useSpecificProductDetailStyle = () =>
  StyleSheet.create({
    iconContainer: {
      backgroundColor: Colors.white,
      left: metrics.width(20),
      top: metrics.height(20),
      borderRadius: 50,
      height: metrics.width(40),
      width: metrics.width(40),
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    mainContainer: {
      paddingHorizontal: metrics.width(20),
      marginTop: metrics.height(25),
    },
    img: {
      height: metrics.width(400),
      width: '100%',
    },
    contentContainerStyle: {
      paddingBottom: '10%',
      marginTop: metrics.height(10),
    },
    innerContainer: {
      paddingHorizontal: metrics.width(5),
      marginBottom: metrics.height(12),
    },
    buttonContainer: {
      paddingHorizontal: metrics.width(20),
      marginBottom: metrics.height(10),
    },
  });
