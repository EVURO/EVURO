import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import colors from '../../util/colors';
import fonts from '../../assets/fonts';
import {ActivityIndicator} from 'react-native-paper';

const LinearGradientBtn = ({
  title,
  height,
  borderRadius,
  marginBottom,
  marginTop,
  justifyContent,
  alignItems,
  fontSize,
  alignSelf,
  width,
  color,
  fontFamily,
  textStyle,
  onPress,
  loading,
}) => {
  return (
    <LinearGradient
      colors={['#a842fc', '#a842fc', '#6448fc']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        width: width || '70%',
        borderRadius: borderRadius || moderateScale(10),
        elevation: 5,
        alignSelf: alignSelf || 'flex-start',
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
      }}>
      <TouchableOpacity
        style={{
          height: height || verticalScale(41),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          justifyContent: justifyContent || 'center',
          alignItems: alignItems || 'center',
        }}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.blue} />
        ) : (
          <CustomText
            label={title}
            fontFamily={fontFamily || fonts.medium}
            textStyle={textStyle}
            fontSize={fontSize || verticalScale(12)}
            color={color || colors.white}
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LinearGradientBtn;

const styles = StyleSheet.create({});
