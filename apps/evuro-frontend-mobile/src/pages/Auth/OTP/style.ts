import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useOTPStyle = () =>
  StyleSheet.create({
    textContainer: {
      marginTop: metrics.height(5),
      marginBottom: metrics.height(30),
    },
    contentContainer: { marginBottom: metrics.height(150) },
  });
