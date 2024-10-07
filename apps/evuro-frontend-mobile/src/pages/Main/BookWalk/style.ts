import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useBookWalkStyle = () =>
  StyleSheet.create({
    contentContainerStyle: {
      paddingBottom: '25%',
      paddingHorizontal: metrics.width(20),
    },
    walkContainer: { marginVertical: metrics.height(13) },
    notFound: { marginTop: metrics.height(30), alignItems: 'center' },
    mapContainer: {
      paddingBottom: '60%',
    },
    innerMapContainer: {
      height: '100%',
      width: '100%',
    },
    map: {
      height: '100%',
      width: '100%',
    },
  });
