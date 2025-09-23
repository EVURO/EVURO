import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { StyleSheet } from 'react-native';

export const useProfileStyle = () =>
  StyleSheet.create({
    profileInfoCotainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Colors.lightGray,
      paddingBottom: metrics.height(20),
    },
    imageContainer: {
      height: metrics.height(150),
      width: metrics.height(150),
      marginVertical: metrics.height(10),
      backgroundColor: Colors.lightGray,
      borderRadius: 15,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    payContainer: {
      position: 'absolute',
      backgroundColor: Colors.payback,
      borderRadius: 3,
      paddingHorizontal: metrics.width(8),
      bottom: 5,
      right: 10,
    },
    nameText: {
      marginTop: metrics.height(10),
      marginBottom: metrics.height(5),
    },
    parent: { flex: 1, width: metrics.screenWidth, backgroundColor: 'red' },
    tabsContainer: {
      flexDirection: 'row',
      width: metrics.screenWidth,
      height: metrics.height(55),
      justifyContent: 'space-between',
    },
    tab: {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1.5,
    },
  });

export const usePostsStyle = () =>
  StyleSheet.create({
    container: {
      width: metrics.screenWidth,
      marginTop: metrics.height(20),
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-between',
    },
    post: {
      width: '32.7%',
      height: metrics.height(140),
      marginBottom: metrics.height(4),
      backgroundColor: Colors.lightGray,
    },
    postImage: { width: '100%', height: '100%' },
    emptyView: { width: '33%' },
  });
export const useShortsStyle = () =>
  StyleSheet.create({
    container: {
      width: metrics.screenWidth,
      marginTop: metrics.height(20),
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-between',
    },
    videoContainer: {
      width: '32.7%',
      height: metrics.height(140),
      marginBottom: metrics.height(4),
      backgroundColor: Colors.lightGray,
    },
    emptyView: { width: '33%' },
  });
export const useMyProfileStyle = () =>
  StyleSheet.create({
    container: {
      width: metrics.screenWidth,
      paddingHorizontal: metrics.width(20),
      paddingBottom: metrics.height(50),
    },
    videoBoxContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: metrics.height(15),
      height: metrics.height(180),
      borderWidth: 1,
      borderColor: Colors.lightGray,
      borderRadius: 15,
      marginBottom: metrics.height(100),
    },
    videoContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
      borderRadius: 14,
    },
    playPauseButton: {
      position: 'absolute',
      width: metrics.width(80),
      height: metrics.width(80),
      backgroundColor: 'white',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.8,
    },
  });

export const useCreatePostStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      marginTop: metrics.height(30),
      marginBottom: metrics.height(20),
    },
    userImageContainer: {
      height: metrics.height(50),
      width: metrics.height(50),
      backgroundColor: Colors.lightGray,
      borderRadius: 50,
      marginRight: metrics.width(10),
    },
    userImage: { width: '100%', height: '100%', borderRadius: 50 },
    descriptionContainer: {
      width: '100%',
      marginTop: metrics.height(20),
      overflow: 'hidden',
      height: metrics.height(150),
    },
    description: {
      padding: metrics.width(10),
      color: Colors.black,
      fontSize: 15,
    },
    imageContainer: {
      marginTop: metrics.width(10),
      width: metrics.width(120),
      height: metrics.height(120),
      backgroundColor: 'grey',
      marginRight: metrics.width(20),
      borderRadius: 5,
    },
    image: {
      width: metrics.width(120),
      height: metrics.width(120),
      marginRight: metrics.width(20),
      borderRadius: 5,
    },
    crossButton: {
      backgroundColor: Colors.darkBlue,
      alignItems: 'center',
      justifyContent: 'center',
      width: metrics.width(20),
      height: metrics.height(20),
      borderRadius: 50,
      position: 'absolute',
      top: -metrics.width(8),
      right: -metrics.height(8),
      transform: [{ rotate: '45deg' }],
    },
    footerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      bottom: 0,
    },
    iconsContainer: {
      flexDirection: 'row',
      marginLeft: metrics.width(10),
      width: metrics.width(120),
      justifyContent: 'space-between',
    },
  });
