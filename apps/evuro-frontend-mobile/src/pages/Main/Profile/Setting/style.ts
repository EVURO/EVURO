import { metrics } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useSettingStyle = () =>
  StyleSheet.create({
    container: { marginTop: metrics.height(30) },
  });

export const useChangePasswordStyle = () =>
  StyleSheet.create({
    inputContainer: { marginBottom: '25%' },
    inputInnerContainer: { marginTop: metrics.height(30) },
  });
