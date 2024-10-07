import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useLocateWalkerStyle = () =>
  StyleSheet.create({
    mainContainer: { backgroundColor: '#F4F7FF', flex: 1 },
    container: {
      height: metrics.height(340),
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    msgContainer: {
      marginTop: metrics.height(20),
      paddingHorizontal: metrics.width(10),
    },
    imgContainer: {
      backgroundColor: Colors.alphaLightGray,
      height: metrics.width(40),
      width: metrics.width(40),
      borderRadius: 50,
      overflow: 'hidden',
    },
    txtContainer: {
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      padding: metrics.width(8),
      maxWidth: '80%',
    },
    sendContainer: {
      marginBottom: metrics.height(15),
      marginTop: metrics.height(5),
    },
    innerSendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: metrics.width(10),
      justifyContent: 'space-between',
    },
    inputContainer: {
      backgroundColor: Colors.alphaLightGray,
      height: metrics.height(50),
      width: '83%',
      borderRadius: 10,
    },
    input: {
      paddingHorizontal: metrics.width(25),
      color: Colors.black,
    },
    sendimgContainer: {
      backgroundColor: Colors.darkBlue,
      height: metrics.width(50),
      width: metrics.width(50),
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      zIndex: 1,
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: Colors.white,
      borderRadius: 100,
      height: metrics.width(45),
      width: metrics.width(45),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
    },
  });
