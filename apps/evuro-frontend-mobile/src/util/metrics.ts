import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const minDimension = Math.min(width, height);
const scale = minDimension / 380;

export const normalizeSize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const metrics = {
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,

  // functions
  height(value: number | string) {
    const givenWidth = typeof value === 'number' ? value : parseFloat(value);
    const multiPly = givenWidth * 0.23;
    return PixelRatio.roundToNearestPixel((width * multiPly) / 100);
  },
  width(value: number | string) {
    const givenHeight = typeof value === 'number' ? value : parseFloat(value);
    const multiPly = givenHeight * 0.108;
    return PixelRatio.roundToNearestPixel((height * multiPly) / 100);
  },
};

export const globalStyle = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },
  alignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacebetweenAlignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxShadowWithoutBackground: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

// import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

// const { width, height } = Dimensions.get('window');
// const isTablet = width / PixelRatio.get() < 600;

// export const metrics = {
//   screenHeight: width < height ? height : width,
//   screenWidth: width < height ? width : height,

//   // functions
//   height(value: number | string) {
//     const givenWidth = typeof value === 'number' ? value : parseFloat(value);
//     const multiplier = givenWidth * 0.15; // Adjust this multiplier as needed
//     const responsiveHeight = PixelRatio.roundToNearestPixel(
//       (width * multiplier) / 100
//     );

//     // Adjust height for tablets
//     return isTablet ? responsiveHeight * 1.5 : responsiveHeight;
//   },
//   width(value: number | string) {
//     const givenHeight = typeof value === 'number' ? value : parseFloat(value);
//     const multiplier = givenHeight * 0.108;
//     const responsiveWidth = PixelRatio.roundToNearestPixel(
//       (height * multiplier) / 100
//     );

//     // Adjust width for tablets
//     const isTablet = width / PixelRatio.get() < 600;
//     return isTablet ? responsiveWidth * 1.1 : responsiveWidth;
//   },
// };

// export const globalStyle = StyleSheet.create({
//   directionRow: {
//     flexDirection: 'row',
//   },
//   alignedRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   spacebetweenAlignedRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   boxShadowWithoutBackground: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
// });
