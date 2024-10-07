import React, { FC } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from '../../assets/fonts';
import { useCustomButtonStyle } from '../style';
import CustomText from '../base/CustomText';
import Icons from './Icons';
import { metrics } from '../../util/metrics';
import { useAppSelector } from '@evuro-frontend/store';

interface CustomButtonProps {
  onPress?: () => void;
  title: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  width?: string | number;
  height?: number;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  borderRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: 'normal' | 'bold' | '700' | '800' | '900';
  ShowIcon?: boolean;
  fontFamily?: string;
  IconFamily?: string;
  IconName?: string;
  IconSize?: number;
  IconColor?: string;
  loading?: boolean;
  disabled?: boolean;
  ActivityIndicatorColor?: string;
  LeftIcon?: boolean;
  SvgHeight?: number;
  svgRightMargin?: number;
  shadow?: boolean;
  iconFamily?: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  IconLeftMargin?: number;
}

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  backgroundColor,
  borderWidth,
  borderColor,
  width,
  height,
  alignSelf,
  borderRadius,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  fontSize,
  color,
  fontFamily,
  loading,
  disabled,
  ActivityIndicatorColor,
  LeftIcon,
  shadow,
  iconFamily,
  iconName,
  iconColor,
  iconSize,
  IconLeftMargin,
}) => {
  const { data } = useAppSelector((state) => state?.user?.loginData);
  const userType = data?.userType;

  const styles = useCustomButtonStyle({
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
  });
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled || !onPress}
      style={styles.mainContainer}
    >
      {LeftIcon && <View style={styles.iconContainer}>{LeftIcon}</View>}

      {userType === 'Talent' && iconFamily && (
        <Icons
          family={iconFamily}
          name={iconName}
          color={iconColor}
          size={iconSize}
          style={{ left: IconLeftMargin }}
        />
      )}

      <View style={styles.textContainer}>
        {loading ? (
          <ActivityIndicator color={ActivityIndicatorColor || Colors.white} />
        ) : (
          <CustomText
            label={title}
            fontSize={fontSize || 18}
            color={disabled ? Colors.darkGray : color || Colors.white}
            fontFamily={fontFamily || Fonts.Medium}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
