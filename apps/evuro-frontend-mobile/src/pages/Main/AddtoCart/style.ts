import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { Dimensions, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export const useAddtoCartStyle = () =>
  StyleSheet.create({
    footerContainer: { paddingBottom: '10%' },
    borderBottom: {
      borderColor: Colors.lightGray,
      marginBottom: metrics.height(20),
    },
    deliveryContainer: {
      borderWidth: 1,
      borderColor: Colors.darkBlue,
      // marginTop: metrics.height(30),
      borderRadius: 10,
      width: Dimensions.get('screen').width / (isTablet ? 2.5 : 2),
      height: metrics.width(90),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    noData: {
      marginTop: metrics.height(30),
      alignItems: 'center',
    },
    contentContainerStyle: {
      paddingBottom: '10%',
      marginTop: metrics.height(10),
    },
    innerContainer: {
      paddingHorizontal: metrics.width(5),
      // marginBottom: metrics.height(12),
    },
  });
