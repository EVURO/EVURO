import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useResetPasswordStyle = () =>
  StyleSheet.create({
    inputContainer: { marginBottom: '25%', marginTop: metrics.height(10) },
    inputInnerContainer: { marginTop: metrics.height(30) },
  });
