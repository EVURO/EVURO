import React, { FC } from 'react';
import { TouchableOpacity, TextStyle, ViewStyle, Text } from 'react-native';
import { useCustomTextStyle } from '../style';

interface iProps {
  label?: string;
  translationEnabled?: boolean;
  textStyle?: TextStyle;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  numberOfLines?: number;
}
const CustomText: FC<iProps & TextStyle> = ({
  textStyle,
  fontSize,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  alignSelf,
  fontFamily,
  fontStyle,
  textTransform,
  textAlign,
  label,
  color,
  fontWeight,
  bottom,
  width,
  borderColor,
  borderBottomWidth,
  onPress,
  marginVertical,
  paddingBottom,
  top,
  lineHeight,
  containerStyle,
  numberOfLines,
  textDecorationLine,
  textDecorationColor,
  letterSpacing,
}) => {
  const styles = useCustomTextStyle({
    fontSize,
    color,
    marginTop,
    marginBottom,
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
  });
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={!onPress}
      style={containerStyle}
    >
      <Text
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[styles.textStyle, textStyle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomText;
