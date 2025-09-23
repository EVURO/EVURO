import { Colors } from '@evuro-frontend/assets';
import { metrics, normalizeSize } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useAddPetsStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: metrics.width(25),
      paddingVertical: metrics.width(20),
    },
    headerContainer: {
      flexDirection: 'column',
    },
    petContainer: {
      backgroundColor: Colors.skin,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: metrics.width(160),
      height: normalizeSize(40),
      borderRadius: 8,
      paddingHorizontal: metrics.width(15),
      marginRight: metrics.width(20),
      marginVertical: metrics.height(25),
    },
    petNameContainer: {
      width: '60%',
      height: metrics.height(20),
    },
    icons: { flexDirection: 'row' },
    icon: { marginHorizontal: metrics.width(2) },
    inputs: {
      marginBottom: metrics.height(30),
    },
    input: {
      marginTop: metrics.width(20),
    },
    addPetContainer: {
      backgroundColor: Colors.darkBlue,
      flexDirection: 'row',
      alignItems: 'center',
      width: metrics.width(160),
      height: normalizeSize(40),
      borderRadius: 8,
      justifyContent: 'center',
    },
  });
