import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useOrderDetailsStyle = () =>
  StyleSheet.create({
    deliverContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: metrics.height(20),
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: metrics.height(25),
    },
    imgContainer: {
      height: metrics.height(120),
      width: metrics.height(120),
      borderRadius: 5,
      overflow: 'hidden',
    },
    img: { height: '100%', width: '100%' },
    txtContainer: { marginLeft: metrics.width(10) },
    deliverytxtContainer: {
      borderWidth: 1,
      borderColor: Colors.darkBlue,
      width: metrics.width(90),
      height: metrics.height(30),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: metrics.height(10),
      marginBottom: metrics.height(10),
    },
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.lightGray,
      marginTop: metrics.height(20),
    },
    addAddress: {
      flexDirection: 'row',
      marginTop: metrics.height(20),
      marginBottom: metrics.height(10),
      alignSelf: 'center',
    },
    plusContainer: {
      backgroundColor: Colors.darkBlue,
      borderRadius: 50,
      height: metrics.width(20),
      width: metrics.width(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: metrics.height(2),
      marginLeft: metrics.width(5),
    },
  });
