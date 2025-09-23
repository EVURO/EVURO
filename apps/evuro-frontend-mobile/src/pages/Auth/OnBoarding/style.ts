import { Colors } from '@evuro-frontend/assets';
import { metrics, normalizeSize } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useOnBoardingStyle = () =>
  StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: Colors.darkBlue },
    parent: {
      backgroundColor: Colors.white,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headingContainer: {
      paddingHorizontal: metrics.width(35),
      alignSelf: 'center',
      alignItems: 'center',
    },
    pawContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 50,
    },
    pawInnerContainer: {
      marginBottom: metrics.height(30),
      marginLeft: metrics.width(10),
    },
    bottomContainer: {
      height: '20%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: metrics.width(30),
      paddingTop: normalizeSize(40),
    },
    imgContainer: {
      // width: metrics.screenWidth,
      height: '100%',
      width: '100%',
      backgroundColor: 'red',
    },
    startContainer: {
      // flex: 1,
      paddingHorizontal: metrics.width(40),
      alignItems: 'center',
      // justifyContent: 'center',
    },
    parent1: { height: '25%' },
    parentHight: { height: '85%', width: '100%' },
    headingContainer1: { height: '30%' },
    onLoad: {
      zIndex: 1,
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
      width: '100%',
    },
  });
