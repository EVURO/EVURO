import { StyleSheet } from 'react-native';
import { metrics, normalizeSize } from '../../../util/metrics';

export const useForgotPasswordStyle = () =>
  StyleSheet.create({
    textContainer: {
      width: '70%',
      marginTop: metrics.height(5),
      marginBottom: metrics.height(30),
    },
    buttonContainer: {
      marginBottom: metrics.height(50),
    },
  });
