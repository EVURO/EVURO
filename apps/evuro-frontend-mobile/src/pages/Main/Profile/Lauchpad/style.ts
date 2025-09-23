import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const LaunchpadStyle = () =>
  StyleSheet.create({
    productContainer: {
      marginTop: metrics.height(40),
    },
    iconsContainer: {
      marginTop: metrics.height(10),
      marginBottom: metrics.height(35),
      flexDirection: 'row',
      height: metrics.width(40),
    },
    commentIcon: { transform: [{ scaleX: -1 }] },
    imagesSection: {
      width: '60%',
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: metrics.height(250),
    },
    imageBox: {
      width: '50%',
      height: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: { height: '65%', width: '65%' },
    image: { width: '100%', height: '100%' },
    descriptionHeader: {
      marginTop: metrics.height(40),
    },
  });
