import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import {verticalScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import colors from '../../util/colors';
import fonts from '../../assets/fonts';
const CheckBox = ({
  value,
  label,
  textStyle,
  containerStyle,
  onChangeValue,
  buttonContainer,
  backgroundColor,
  elevation,
  shadowColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, containerStyle]}
      activeOpacity={0.9}
      onPress={() => {
        if (typeof onChangeValue == 'function') {
          onChangeValue(!value);
        }
      }}>
      <View
        style={[
          {
            width: 18,
            height: verticalScale(18),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor || colors.inputColor,
            elevation: elevation,
            shadowColor: shadowColor,

            borderRadius: 3,
          },
          buttonContainer,
        ]}>
        {value == true && (
          <IconMaterial name={'check'} color={colors.blue} size={16} />
        )}
      </View>
      <CustomText label={label} textStyle={[styles.text, textStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 22,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputColor,
    borderRadius: 3,
  },
  text: {
    color: colors.boxColor,
    marginLeft: verticalScale(8),
    fontSize: verticalScale(12),
    lineHeight: verticalScale(15),
    fontFamily: fonts.regular,
  },
});

export default CheckBox;
