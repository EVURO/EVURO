import {Text, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import colors from '../../util/colors';
import Icons from './Icons';
import CustomText from './CustomText';
import fonts from '../../assets/fonts';

const CustomHeader = ({title, family, name, size, color, onPress}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: verticalScale(10),
          marginHorizontal: scale(10),
          justifyContent: 'space-between',
        }}>
        <Icons
          family={family}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
        <CustomText
          label={title}
          fontSize={moderateScale(16)}
          color={colors.white}
          fontFamily={fonts.semiBold}
        />
        <View style={{height: 20, width: 20}} />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = ScaledSheet.create({
  container: {
    height: verticalScale(48),
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: colors.blue,
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
});
