import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useAdditionalInformationStyle = () =>
  StyleSheet.create({
    inputContainer: { marginTop: metrics.height(20) },
    mediaContainer: { marginVertical: metrics.height(20) },
  });
