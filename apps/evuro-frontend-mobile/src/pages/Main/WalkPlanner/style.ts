import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useWalkPlannerStyle = () =>
  StyleSheet.create({
    screenContainer: {
      paddingTop: metrics.height(20),
    },
    container: { marginVertical: metrics.height(15) },
    calenderTitle: {
      position: 'absolute',
      left: metrics.width(10),
      top: metrics.height(8),
    },
    calenderHeader: {
      justifyContent: 'flex-end',
      right: metrics.width(10),
    },
    selectedRangeStart: {
      backgroundColor: '#196F92',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    selectedRangeEnd: {
      backgroundColor: '#196F92',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    selectedRangeStartText: { color: Colors.white },
    selectedRangeEndText: { color: Colors.white },
    petsSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    petAddButton: {
      backgroundColor: Colors.lightskyBlue,
      height: metrics.width(40),
      width: metrics.width(40),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: metrics.height(8),
    },
    daysRowHalf: {
      width: '80%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalChargesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopColor: Colors.grey2,
      borderTopWidth: 1,
      paddingVertical: metrics.height(10),
      marginVertical: metrics.height(5),
    },
    requirementsContainer: { marginVertical: metrics.height(5) },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: metrics.width(20),
      justifyContent: 'space-between',
      marginTop: metrics.height(50),
      marginBottom: metrics.height(30),
    },
    buttonStyle: {
      width: metrics.width(30),
      height: metrics.width(30),
      backgroundColor: Colors.darkBlue,
      borderRadius: metrics.width(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export const useConfirmWalkPlannerStyle = () =>
  StyleSheet.create({
    screenContainer: {
      width: metrics.screenWidth,
    },
    petImageContainer: {
      width: metrics.screenWidth,
    },
    bottomScreenContainer: { marginHorizontal: metrics.width(20) },
    walkerDetailsContainer: {
      marginTop: metrics.height(20),
    },
    walkerInfoContaier: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: metrics.height(10),
    },
    walkerImageConatiner: {
      height: metrics.height(40),
      width: metrics.height(40),
      borderRadius: 50,
    },
    walkerImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      backgroundColor: Colors.lightGray,
    },
    walkDurationContainer: {
      marginTop: metrics.height(20),
    },
    walkTimeContainer: {
      marginTop: metrics.height(20),
    },
    timeRowContainer: {
      flexDirection: 'row',
      marginBottom: metrics.height(5),
    },
    dayNameContainer: { width: '15%' },
    timeRow: {
      flexDirection: 'row',
      width: '85%',
      justifyContent: 'space-between',
    },
    totalFeeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopColor: Colors.grey2,
      borderTopWidth: 1,
      paddingVertical: metrics.height(10),
      marginVertical: metrics.height(5),
    },
    locationContainer: {
      marginTop: metrics.height(20),
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: metrics.width(20),
      justifyContent: 'space-between',
      marginTop: metrics.height(50),
      marginBottom: metrics.height(30),
    },
  });
