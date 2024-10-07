import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useSpecificDogWalkerDetailStyle = () =>
  StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 30,
    },
    videoBoxContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: metrics.height(15),
      height: metrics.height(240),
      borderWidth: 1,
      borderColor: Colors.black,
      borderRadius: 15,
    },
    videoContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
      borderRadius: 14,
    },
    playPauseButton: {
      position: 'absolute',
      width: metrics.width(70),
      height: metrics.width(70),
      backgroundColor: 'white',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5,
    },
    payContainer: { width: '100%' },
    descriptionContainer: { width: '100%', marginTop: metrics.width(40) },
    hrContainer: {
      backgroundColor: Colors.darkBlue,
      opacity: 0.6,
      padding: metrics.width(5),
      position: 'absolute',
      zIndex: 99,
      top: metrics.height(15),
      right: metrics.width(15),
      borderRadius: 5,
    },
    innerImgContainer: {
      backgroundColor: Colors.alphaLightGray,
      height: metrics.width(160),
      width: metrics.width(160),
      borderRadius: 30,
      // overflow: 'hidden',
    },
    buttonContainer: {
      // flex: 1,
      // justifyContent: 'flex-end',
      marginTop: metrics.height(10),
    },
  });
