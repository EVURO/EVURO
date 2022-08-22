import {TextInput, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from './CustomText';
import colors from '../../util/colors';
import fonts from '../../assets/fonts';
import Icons from './Icons';
const CustomInput = ({
  placeholder,
  value,
  keyboardType,
  onChangeText,
  disable,
  multiline,
  withLabel,
  height,
  paddingTop,
  alignItems,
  leftIcon,
  onPress,
  withLabelSize,
  marginBottom,
  fontFamily,
  borderWidth,
  backgroundColor,
  borderRadius,
  placeholderTextColor,
  paddingHorizontal,
  marginTop,
  secureTextEntry,
  shadowColor,
  elevation,
  withLabelMarginBottom,
  inputStyle,
  family,
  name,
  size,
  color,
}) => {
  return (
    <View
      style={{
        marginBottom: marginBottom || verticalScale(25),
        marginTop: marginTop || 0,
      }}>
      {withLabel && (
        <CustomText
          textStyle={[
            styles.withLabel,
            {
              fontSize: withLabelSize || 15,
              fontFamily: fontFamily || fonts.medium,
              marginBottom: withLabelMarginBottom || verticalScale(15),
              color: colors.primary,
            },
          ]}
          label={withLabel}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        disable={!onPress}
        style={[
          styles.inputContainer,
          {
            height: height || verticalScale(41),
            alignItems: alignItems || 'center',
            paddingTop: paddingTop || 0,
            borderWidth: borderWidth || 1,
            backgroundColor: backgroundColor,
            borderRadius: borderRadius || 5,
            paddingHorizontal: paddingHorizontal || scale(15),
            shadowColor: shadowColor,
            elevation: elevation,
          },
          inputStyle,
        ]}>
        {leftIcon && (
          <Icons family={family} name={name} size={size} color={color} />
        )}
        <TextInput
          placeholder={placeholder}
          style={[styles.input, {width: leftIcon ? '94%' : '100%'}]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          editable={disable}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;

const styles = ScaledSheet.create({
  input: {
    padding: 0,
    margin: 0,
    color: colors.primary,
  },
  inputContainer: {
    borderColor: colors.textColor,

    padding: 0,
    margin: 0,

    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  withLabel: {
    marginBottom: '5@vs',
  },
});
