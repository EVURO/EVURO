import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';

export const useSignUpStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    imgContainer: {
      borderWidth: 1,
      alignSelf: 'center',
      height: metrics.width(180),
      width: metrics.width(180),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: isTablet ? 200 : 100,
      marginTop: metrics.height(30),
      marginBottom: metrics.height(10),
    },
    inputContainer: { marginTop: metrics.height(20) },
    aimatedInput: {
      color: Colors.black,
      fontSize: 15,
      position: 'absolute',
      marginHorizontal: metrics.width(20),
      paddingHorizontal: metrics.width(10),
      backgroundColor: Colors.white,
      fontFamily: Fonts.Regular,
      marginTop: metrics.height(10),
    },
    buttonContainer: { marginTop: '20%' },
    pickImgContainer: {
      overflow: 'hidden',
      borderRadius: isTablet ? 200 : 100,
    },
    img: {
      height: metrics.width(180),
      width: metrics.width(180),
    },
    bottomText: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: metrics.height(60),
      marginBottom: metrics.height(15),
    },
  });
