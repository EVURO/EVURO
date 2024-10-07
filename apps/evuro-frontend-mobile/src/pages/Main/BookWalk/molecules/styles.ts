import { Colors } from '@evuro-frontend/assets';
import { metrics, normalizeSize } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export const useListMapStyle = ({ activeTab }) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.white,
      height: metrics.width(100),
      width: metrics.width(50),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute',
      right: metrics.width(10),
      top: '35%',
      zIndex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    listContainer: {
      backgroundColor:
        activeTab === 'list' ? Colors.alphadarkgary : 'transparent',
      height: metrics.width(50),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    mapContainer: {
      backgroundColor:
        activeTab === 'map' ? Colors.alphadarkgary : 'transparent',
      height: metrics.width(50),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  });
