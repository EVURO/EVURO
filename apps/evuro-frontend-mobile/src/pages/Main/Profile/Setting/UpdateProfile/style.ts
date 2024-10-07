import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../../util/metrics';
import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';

export const useUpdateProfileStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    imgContainer: {
      borderWidth: 1,
      alignSelf: 'center',
      height: metrics.width(120),
      width: metrics.width(120),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: isTablet ? 20 : 15,
      marginTop: metrics.height(30),
      marginBottom: metrics.height(30),
    },
    inputContainer: { marginBottom: metrics.height(20) },
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
    buttonContainer: { marginTop: '40%' },
    pickImgContainer: {
      overflow: 'hidden',
      borderRadius: isTablet ? 20 : 15,
      // borderWidth: 1,
      // borderColor: Colors.black,
    },
    img: {
      height: metrics.width(130),
      width: metrics.width(130),
    },
    bottomText: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: metrics.height(60),
      marginBottom: metrics.height(15),
    },
    googlePlaces: { marginTop: metrics.height(-15) },
    editImg: {
      borderWidth: 1,
      padding: metrics.width(5),
      borderRadius: 100,
      position: 'absolute',
      zIndex: 1,
      bottom: metrics.height(-12),
      right: metrics.width(-15),
      backgroundColor: Colors.white,
    },
  });
