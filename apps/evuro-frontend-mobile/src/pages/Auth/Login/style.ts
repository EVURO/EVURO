import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useLoginStyle = () =>
  StyleSheet.create({
    inputContainer: {
      marginTop: metrics.height(20),
    },
    textContainer: {
      alignSelf: 'flex-end',
      marginRight: metrics.width(5),
      height: metrics.height(100),
    },
  });
