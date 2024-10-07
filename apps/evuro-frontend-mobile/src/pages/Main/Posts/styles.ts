import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../../util/metrics';
import { StyleSheet } from 'react-native';

export const usePostsStyle = () =>
  StyleSheet.create({
    postImageContainer: {
      backgroundColor: Colors.lightGray,
      width: metrics.screenWidth - metrics.width(40),
      borderRadius: 15,
      height: metrics.height(250),
      alignSelf: 'center',
      margin: metrics.width(10),
    },
    postImage: {
      width: metrics.screenWidth - metrics.width(40),
      height: metrics.height(250),
      borderRadius: 15,
    },
    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },

    postDetailsContainer: {
      borderTopWidth: 1,
      height: metrics.height(100),
      borderTopColor: Colors.grey2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImageContainer: {
      height: metrics.height(50),
      width: metrics.height(50),
      borderRadius: 50,
      marginHorizontal: metrics.width(20),
    },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      backgroundColor: Colors.lightGray,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    commentIcon: { transform: [{ scaleX: -1 }] },
    likesInfoCotainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    likedUserImagesContainer: {
      flexDirection: 'row',
      marginLeft: metrics.width(20),
      marginRight: metrics.width(10),
    },
    likedUserImages: {
      backgroundColor: Colors.lightGray,
      width: metrics.width(40),
      height: metrics.width(40),
      borderRadius: 50,
      borderWidth: 1.5,
      borderColor: Colors.white,
    },
    commentDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: metrics.width(20),
      marginVertical: metrics.width(10),
    },
    commentsSection: {
      width: '100%',
      alignItems: 'center',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      height: metrics.height(70),
      justifyContent: 'space-evenly',
      borderBottomWidth: 1,
      borderBottomColor: Colors.black,
    },
    commentSectionHeader: {
      width: '15%',
      borderWidth: 1,
      borderColor: Colors.black,
    },
    commentSectionContainer: {
      width: metrics.screenWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: metrics.height(5),
    },
    commentText: {
      width: '65%',
    },
    commentLike: {
      alignItems: 'center',
      marginRight: metrics.width(20),
    },
    commentsSectionFooter: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: Colors.black,
      height: metrics.height(70),
      justifyContent: 'space-between',
    },
    commentPost: { marginRight: metrics.width(30) },
  });
