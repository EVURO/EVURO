import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useHeaderMoleculeStyle = () =>
  StyleSheet.create({
    mainContainer: { backgroundColor: '#015A7E94', padding: metrics.width(20) },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleContainer: { flexDirection: 'row', alignItems: 'center' },
    imgContainer: {
      backgroundColor: Colors.alphaLightGray,
      height: metrics.width(50),
      width: metrics.width(50),
      borderRadius: 50,
      overflow: 'hidden',
    },
    iconContainer: { flexDirection: 'row', alignItems: 'center' },
    videoIcon: { marginRight: metrics.width(35) },
  });
