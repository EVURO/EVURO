import { Colors } from '@evuro-frontend/assets';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { metrics, normalizeSize } from '../util/metrics';
import { Fonts } from '../assets/fonts';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export const useCustomTextStyle = ({
  fontSize,
  color,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  alignSelf,
  fontFamily,
  fontStyle,
  lineHeight,
  textAlign,
  textTransform,
  fontWeight,
  bottom,
  borderBottomWidth,
  borderColor,
  width,
  marginVertical,
  paddingBottom,
  top,
  textDecorationLine,
  textDecorationColor,
  letterSpacing,
}) =>
  StyleSheet.create({
    textStyle: {
      fontSize: metrics.width(fontSize || 12),
      color: color || Colors.black,
      marginTop: marginTop || 0,
      marginBottom: marginBottom || 0,
      marginLeft: marginLeft,
      marginRight: marginRight || 0,
      alignSelf: alignSelf || 'flex-start',
      fontFamily: fontFamily || Fonts.Regular,
      fontStyle,
      lineHeight,
      textAlign,
      textTransform,
      fontWeight,
      bottom,
      borderBottomWidth,
      borderColor,
      width,
      marginVertical,
      paddingBottom,
      top,
      textDecorationLine,
      textDecorationColor,
      letterSpacing,
    },
  });

export const useAuthWrapperStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    svgContainer: {
      alignSelf: 'center',
    },
    orContainer: {
      marginTop: metrics.height(40),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '50%',
      alignSelf: 'center',
    },
    orBorder: {
      borderBottomWidth: 1,
      width: '40%',
      borderBlockColor: Colors.lightGray,
    },
    socialButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '35%',
      alignSelf: 'center',
      marginTop: metrics.height(20),
    },
    bottomText: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',

      marginBottom: metrics.height(15),
      marginTop: metrics.height(25),
    },
  });

export const useCustomOTPStyle = ({ OtpCodeError }) =>
  StyleSheet.create({
    underlineStyleBase: {
      width: metrics.width(50),
      height: metrics.width(50),
      borderRadius: 5,
      fontSize: 20,
      color: Colors.black,
      backgroundColor: Colors.white,
      padding: 0,
      borderColor: OtpCodeError ? Colors.red : Colors.lightGray,
    },
    otp: {
      width: '70%',
      height: metrics.height(80),
      alignSelf: 'center',
      marginBottom: metrics.height(10),
    },
  });

export const useAnimatedInputStyle = ({
  inputHeight,
  secureTextEntry,
  borderColor,
  multiline,
  isFocused,
  errorMessage,
  value,
  borderRadius,
}) =>
  StyleSheet.create({
    container: {
      padding: metrics.width(20),
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: !!errorMessage ? Colors.red : Colors.lightGray,
      borderRadius: borderRadius ? borderRadius : multiline ? 20 : 100,
      marginVertical: metrics.height(5),
    },
    input: {
      fontSize: 18,
      height: normalizeSize(isTablet ? 30 : 45),
      padding: 0,
      margin: 0,
      paddingLeft: metrics.width(20),
      width: secureTextEntry ? '95%' : '100%',
      color: Colors.black,
    },
    placeholderContainer: {
      position: 'absolute',
      justifyContent: multiline ? 'flex-start' : 'center',
      height: inputHeight ?? 0,
    },
    placeholder: {
      color: errorMessage
        ? Colors.red
        : isFocused || value?.length > 1
        ? Colors.black
        : Colors.lightGray,
      fontSize: isTablet ? 20 : 15,
      position: 'absolute',
      marginHorizontal: metrics.width(20),
      paddingHorizontal: metrics.width(10),
      backgroundColor: Colors.white,
      fontFamily: Fonts.Regular,
      marginTop: metrics.height(10),
    },
    eyeIcon: {
      position: 'absolute',
      right: 0,
    },
    inputIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '95%',
    },
    multiline: {
      height: 100,
      padding: metrics.width(10),
    },
    errorMessage: {
      marginLeft: metrics.width(20),
    },
  });

export const useCustomButtonStyle = ({
  disabled,
  backgroundColor,
  borderWidth,
  borderColor,
  width,
  height,
  alignSelf,
  marginRight,
  marginTop,
  marginLeft,
  marginBottom,
  borderRadius,
  shadow,
  LeftIcon,
}) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',

      backgroundColor: disabled
        ? Colors.alphaLightGray
        : backgroundColor || Colors.darkBlue,
      borderWidth: borderWidth,
      borderColor: borderColor || Colors.white,
      width: width || '100%',
      height: height || normalizeSize(isTablet ? 30 : 50),
      alignSelf: alignSelf || 'center',
      marginRight: marginRight,
      marginTop: marginTop,
      marginLeft: marginLeft,
      marginBottom: marginBottom,
      borderRadius: borderRadius || 5,
      justifyContent: 'center',

      ...(shadow
        ? {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }
        : {}),
    },
    iconContainer: {
      position: 'absolute',
      left: normalizeSize(40),
      zIndex: 99,
    },
    textContainer: {
      width: isTablet ? '50%' : '70%',
      alignItems: 'center',
    },
  });

export const useUploadImage = () =>
  StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
    },
    iconStyle: {
      position: 'absolute',
      bottom: 15,
      right: 5,
      borderRadius: 50,
      borderWidth: 1,
      backgroundColor: Colors.white,
      padding: 5,
    },
    container: {
      alignSelf: 'center',
    },
    headModalContainer: {
      flex: 1,
      backgroundColor: Colors.black,
      opacity: 0.8,
    },
    modalContainer: {
      height: '26%',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: Colors.white,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: '5%',
      justifyContent: 'space-between',
    },

    modalIconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });

export const useAuthInformationStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    bottomText: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: metrics.height(30),
      marginBottom: metrics.height(10),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
export const useAddMediaStyle = () =>
  StyleSheet.create({
    Container: {
      flexDirection: 'row',
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderRadius: 15,
      padding: metrics.width(10),
      justifyContent: 'space-between',
      marginTop: metrics.height(15),
    },
    icons: {
      alignItems: 'center',
      // width: '40%',
      width: Dimensions.get('screen').width / (isTablet ? 4 : 3),
      justifyContent: 'space-between',
      // height: Dimensions.get('screen').height / (isTablet ? 4 : 6.5),
    },
    icon: {
      height: metrics.width(55),
      width: metrics.width(55),
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#196F92',
    },
    images: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: isTablet ? '60%' : '70%',
      alignItems: 'center',
    },
    image: {
      margin: metrics.width(2),
    },
    moreImageButton: {
      height: normalizeSize(45),
      width: normalizeSize(65),
      backgroundColor: '#D9D9D9',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: metrics.width(12),
      marginLeft: metrics.width(5),
    },
    emptyView: {
      backgroundColor: '#D9D9D9',
      height: normalizeSize(45),
      width: normalizeSize(65),
      marginTop: metrics.width(3),
      borderRadius: 10,
      marginLeft: metrics.width(4),
    },
    deleteIcon: {
      position: 'absolute',
      top: -2,
      right: -2,
      zIndex: 1,
    },
  });

export const useCustomDropDownStyle = ({ borderColor }) =>
  StyleSheet.create({
    dropdownMainContainer: {
      paddingHorizontal: metrics.width(30),
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: borderColor,
      width: '100%',
      paddingVertical: metrics.height(5),
      maxHeight: metrics.height(200),
    },
    dropDownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: metrics.width(isTablet ? 38 : 43),
    },
    dropdown: { borderTopColor: Colors.lightGray, borderTopWidth: 1 },
    emptyContainer: {
      width: '100%',
      height: metrics.height(40),
      alignItems: 'center',
      justifyContent: 'center',
      borderTopColor: Colors.darkGray,
      borderTopWidth: 1,
    },
  });

export const useCustomImageListModalStyle = () =>
  StyleSheet.create({
    Screen: {
      height: '100%',
      backgroundColor: Colors.white,
      padding: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '95%',
      alignItems: 'center',
      paddingBottom: '20%',
    },
    buttonView: {
      width: '40%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: metrics.height(10),
      justifyContent: 'space-between',
      alignContent: 'space-between',
    },
    icon: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    emptyView: {
      backgroundColor: '#D9D9D9',
      height: metrics.width(120),
      width: metrics.width(120),
      margin: metrics.width(8),
      borderRadius: 10,
    },
  });
export const useCustomVideoModalStyle = () =>
  StyleSheet.create({
    Container: {
      height: '100%',
      width: '100%',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    crossButton: {
      width: metrics.width(50),
      height: metrics.width(50),
      left: metrics.width(13),
      position: 'absolute',
      zIndex: 9999,
      marginTop: metrics.height(40),
    },
    buttonView: {
      width: '40%',
      display: 'flex',
      flexDirection: 'row',
      marginVertical: metrics.height(10),
      justifyContent: 'space-between',
      alignContent: 'space-between',
    },
  });

export const useCustomModalStyle = ({
  justifyContent,
  width,
  borderRadius,
  alignItems,
  borderTopLeftRadius,
  borderTopRightRadius,
}) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: justifyContent || 'flex-end',
      alignItems: 'center',
    },
    container: {
      backgroundColor: Colors.white,
      width: width || '100%',
      height: '100%',
      alignItems: alignItems || 'center',
      borderTopLeftRadius: borderTopLeftRadius || 15,
      borderTopRightRadius: borderTopRightRadius || 15,
      borderRadius: borderRadius,
    },
  });

export const addressContainerStyle = {
  textInput: {
    backgroundColor: Colors.white,
    paddingHorizontal: metrics.width(15),
    color: Colors.black,
    fontFamily: Fonts.Medium,
    fontSize: metrics.height(13),
    height: metrics.height(isTablet ? 35 : 53),
    marginTop: metrics.height(20),
    zIndex: 1,
  },
  row: {
    padding: metrics.width(10),
    height: metrics.height(65),
  },
};

export const useCustomHeaderStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    backButton: {
      backgroundColor: Colors.alphaLightGray,
      height: metrics.width(50),
      width: metrics.width(50),
      borderRadius: 50,
      overflow: 'hidden',
    },
    petsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    plusContainer: {
      backgroundColor: Colors.lightskyBlue,
      height: metrics.width(25),
      width: metrics.width(25),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: metrics.width(10),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
    },
  });

export const useMainWrapperStyle = ({ paddingHorizontal, backgroundColor }) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: backgroundColor || Colors.white,
      paddingHorizontal: paddingHorizontal || metrics.width(20),
    },
  });

export const useSearchInputStyle = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.darkBlue,
      marginTop: metrics.height(20),
      borderRadius: 50,
      height: metrics.height(43),
      justifyContent: 'center',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: metrics.width(12),
      width: Platform.OS === 'android' ? '100%' : '98%',
    },
    inputContainer: {
      backgroundColor: Colors.white,
      width: '90%',
      borderRadius: 50,
      height: metrics.height(35),
      paddingHorizontal: metrics.width(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      fontSize: metrics.width(15),
      color: Colors.black,
      padding: 0,
      fontFamily: Fonts.Regular,
      width: '100%',
    },
  });

export const useProductFeatureStyle = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.alphaLightGray,
      height: metrics.height(230),
      borderRadius: 30,
      marginTop: metrics.height(20),
      overflow: 'hidden',
    },
    cartContainer: {
      backgroundColor: Colors.alphaLightBlack,
      height: metrics.width(60),
      width: metrics.width(60),
      position: 'absolute',
      zIndex: 1,
      right: 0,
      borderBottomLeftRadius: normalizeSize(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    foodTextContainer: {
      backgroundColor: Colors.alphaLightBlack,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export const useDogTrailerStyle = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.lightGray,
      height: metrics.width(65),
      width: metrics.width(65),
      borderRadius: 15,
      marginTop: metrics.height(25),
      marginBottom: metrics.height(5),
      overflow: 'hidden',
    },
    container: { alignItems: 'center' },
    selectedButton: {
      backgroundColor: Colors.darkBlue,
      width: metrics.width(20),
      height: metrics.width(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      position: 'absolute',
      bottom: 24,
      right: 5,
    },
    image: { height: metrics.width(65), width: metrics.width(65) },
  });

export const useProductDetailStyle = ({ cartScreen }) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    emptyBox: {
      borderWidth: 1,
      height: metrics.width(23),
      width: metrics.width(23),
      borderRadius: 3,
      borderColor: Colors.lightGray,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imgContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      height: metrics.height(180),
      width: '35%',
    },
    img: { height: '100%', width: '100%' },
    innerContainer: { width: cartScreen ? '60%' : '90%' },
  });

export const useGoBackIconStyle = ({ borderWidth, borderColor, marginLeft }) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.white,
      // marginLeft: marginLeft || 10,
      borderRadius: 50,
      height: metrics.width(40),
      width: metrics.width(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: borderWidth,
      borderColor: borderColor,
    },
  });

export const useWalkCardStyle = ({ width }) =>
  StyleSheet.create({
    image: {
      backgroundColor: Colors.alphaLightGray,
      height: '100%',
      width: '100%',
      borderRadius: 15,
    },
    cardContent: {
      backgroundColor: Colors.white,
      height: metrics.width(110),
      // width: width || '63%',
      width: isTablet ? '70%' : '60%',
      justifyContent: 'center',
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      padding: metrics.width(12),
      // paddingBottom: metrics.height(20),
      shadowColor: '#000',
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.41,
      elevation: 2,
    },
    likeButton: {
      position: 'absolute',
      width: metrics.width(30),
      height: metrics.width(30),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: metrics.width(10),
      bottom: metrics.width(10),
      backgroundColor: 'transparent',
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: Dimensions.get('screen').width,
    },
    containerStyle: { marginBottom: metrics.width(3) },
    locationContainer: { flexDirection: 'row' },
    imgContainer: {
      height: metrics.width(140),
      width: metrics.width(140),
      borderRadius: 15,
      overflow: 'hidden',
    },
  });
export const useProductQuantityStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    counterContainer: {
      marginTop: metrics.height(20),
      marginBottom: metrics.height(30),
      borderWidth: 1,
      height: metrics.width(32),
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: metrics.width(120),
      borderRadius: 8,
      alignItems: 'center',
      borderColor: Colors.lightGray,
    },
  });

export const useTextAreaStyle = () =>
  StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: Colors.lightGray,
      borderRadius: 5,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    textArea: {
      flex: 1,
      padding: metrics.width(10),
      fontFamily: Fonts.Light,
      color: Colors.black,
    },
    emptyView: {
      height: metrics.height(3),
      backgroundColor: Colors.black,
      borderRadius: 100,
      marginBottom: metrics.height(2.5),
    },
    emptyContainer: {
      width: metrics.height(50),
      height: metrics.height(50),
      position: 'absolute',
      bottom: metrics.height(-30),
      right: metrics.height(-30),
      transform: [{ rotate: '-45deg' }],
      alignItems: 'center',
      zIndex: 1,
    },
  });
export const useCustomStarsStyle = () =>
  StyleSheet.create({
    mainContainer: {
      width: Platform.OS === 'ios' ? '50%' : '60%',
      marginTop: normalizeSize(3),
      marginBottom: metrics.height(20),
    },
    fullStar: {
      color: Colors.staryellow,
    },
    emptyStar: {
      color: Colors.iconColor,
    },
    halfStar: {
      color: Colors.staryellow,
    },
  });

export const useRatingCardStyle = ({
  paddingHorizontal,
  marginRight,
  marginLeft,
}) =>
  StyleSheet.create({
    mainContainer: {
      marginTop: metrics.height(20),
      marginBottom: metrics.height(20),
      paddingHorizontal: paddingHorizontal,
      marginRight: marginRight,
      marginLeft: marginLeft,
    },
    container: {
      backgroundColor: Colors.white,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      height: metrics.screenHeight / (isTablet ? 3 : 4),
      // width: metrics.screenWidth / 2.9,
      width: Dimensions.get('screen').width / (isTablet ? 2.2 : 2.3),
      borderRadius: 10,
      justifyContent: 'center',
    },
    imgContainer: { width: '100%', height: metrics.height(140) },
    img: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
    },
    txtContainer: {
      paddingHorizontal: metrics.width(10),
      marginTop: metrics.height(5),
    },
  });

export const useEvuroOptionsStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    innerContainer: { flexDirection: 'row', alignItems: 'center' },
  });

export const useCustomCommentModalStyle = () =>
  StyleSheet.create({
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
      width: '20%',
      borderWidth: 1,
      borderColor: Colors.lightGray,
    },
    commentSectionContainer: {
      width: metrics.screenWidth,
      height: metrics.height(66),
      flexDirection: 'row',
      marginVertical: metrics.height(5),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    commentText: {
      width: '65%',
    },
    commentLike: {
      alignItems: 'center',
      marginRight: metrics.width(20),
    },
    commentRowContainer: {
      marginLeft: metrics.width(10),
      justifyContent: 'center',
      width: '70%',
    },
    commentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    commentsSectionFooter: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: Colors.black,
      height: metrics.height(70),
    },
    userImageContainer: {
      height: metrics.height(50),
      backgroundColor: Colors.lightGray,
      width: metrics.height(50),
      borderRadius: 50,
      marginLeft: metrics.width(20),
      marginRight: metrics.width(5),
    },
    userImage: { width: '100%', height: '100%', borderRadius: 50 },
    postCommentContainer: {
      width: '80%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      width: '80%',
      height: '60%',
      color: 'black',
      // borderWidth: 1,
      borderRadius: 8,
      padding: 0,
      marginLeft: metrics.width(10),
      // paddingLeft: metrics.height(20),
      // borderColor: Colors.lightGray,
    },
    postButton: {
      width: metrics.width(40),
      height: metrics.width(40),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.darkBlue,
    },
  });

export const useLoadingModalStyle = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.white,
      height: metrics.width(100),
      width: metrics.width(100),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute',
      alignSelf: 'center',
      top: '43%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      zIndex: 1,
    },
  });

export const useDrawerDataStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    iconContainer: {
      position: 'absolute',
      right: metrics.width(15),
      top: metrics.height(10),
      zIndex: 1,
    },
    container: {
      backgroundColor: Colors.darkBlue,
      height: metrics.height(120),
      flexDirection: 'row',
      paddingHorizontal: metrics.width(20),
      alignItems: 'center',
    },
    imgContainer: {
      backgroundColor: Colors.alphadarkgary,
      height: metrics.width(75),
      width: metrics.width(75),
      borderRadius: 15,
      overflow: 'hidden',
    },
    img: { height: '100%', width: '100%' },
    txtContainer: { marginLeft: metrics.width(20) },
    drawerTabsContainer: { flex: 1 },
    drawerRow1: {
      flex: 2,
      flexDirection: 'row',
    },
    firstTwoTabs: { flex: 1, flexDirection: 'column' },
    tab1: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab1,
    },
    tab2: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab2,
    },
    tab3: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab3,
    },
    secondTwoTabs: {
      flex: 1,
      flexDirection: 'column',
    },
    tab4: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab4,
    },
    tab5: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab5,
    },
    thirdTwoTabs: {
      flex: 1,
      flexDirection: 'row',
    },
    tab6: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab6,
    },
    tab7: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab7,
    },
    lastThreeTabs: {
      flex: 1,
      flexDirection: 'row',
    },
    tab8: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab8,
    },
    tab9: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab9,
    },
    tab10: {
      flex: 1,
      borderWidth: metrics.width(3),
      borderColor: Colors.drawerBorder,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.drawerTab10,
    },
  });
