import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useHomeStyle = () =>
  StyleSheet.create({
    mainContainer: { paddingHorizontal: metrics.width(20) },
    borderBttom: {
      borderBottomWidth: 1,
      borderColor: Colors.lightGray,
      marginTop: metrics.height(20),
    },
    scrollContainer: { paddingBottom: '30%' },
    contentContainerStyle: {
      marginTop: metrics.height(10),
    },
    epmtyComponent: {
      alignSelf: 'center',
      marginTop: metrics.height(30),
      marginBottom: metrics.height(30),
    },
  });
