import { Colors } from '@evuro-frontend/assets';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import { StyleSheet } from 'react-native';

export const useWalkHistoryStyle = () =>
  StyleSheet.create({
    tabContainer: {
      backgroundColor: Colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
      height: metrics.height(45),
      justifyContent: 'center',
      borderRadius: 5,
      marginTop: metrics.height(20),
    },
    tabInnerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: metrics.width(10),
    },
    tabTextContainer: {
      height: metrics.height(30),
      width: metrics.width(90),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    contentContainerStyle: { paddingBottom: '25%' },
    WalkCardStyle: { marginVertical: metrics.height(13) },
    emptyComponent: { marginTop: metrics.height(30), alignItems: 'center' },
  });
