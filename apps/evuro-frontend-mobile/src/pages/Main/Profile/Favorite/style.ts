import { metrics } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useFavoriteStyle = () =>
  StyleSheet.create({
    notFound: { alignItems: 'center' },
    contentContainerStyle: {
      marginTop: metrics.height(20),
      paddingBottom: '10%',
    },
    walkContainer: { marginVertical: metrics.height(13) },
  });
