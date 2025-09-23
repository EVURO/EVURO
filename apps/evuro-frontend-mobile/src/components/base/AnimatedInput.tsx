import { Colors } from '@evuro-frontend/assets';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  View,
  LayoutChangeEvent,
  TouchableOpacity,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Icons from '../base/Icons';
import { useAnimatedInputStyle } from '../style';
import CustomText from './CustomText';
import { Fonts } from '../../assets/fonts';
import { isTablet } from 'react-native-device-info';
import { normalizeSize } from '../../util/metrics';
import { metrics } from '../../util/metrics';

interface AnimatedInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  errorMessage?: string;
  borderColor?: string;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholderText?: string;
  editable?: boolean;
  focused?: boolean;
  borderRadius?: number;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  value,
  onChange,
  placeholder,
  multiline,
  secureTextEntry,
  errorMessage,
  borderColor,
  keyboardType,
  onBlur,
  placeholderText,
  editable,
  focused,
  borderRadius,
}) => {
  const [inputHeight, setHeight] = useState<number | null>(null);
  const [placeholderWidth, setWidth] = useState<number | null>(null);
  const [hidePass, setHidePass] = useState<boolean>(secureTextEntry || false);
  const [isFocused, setIsFocused] = useState(focused || false);

  const animation = useRef(new Animated.Value(0)).current;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(inputHeight ?? 0) / (multiline ? 4.5 : 2)],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(placeholderWidth ?? 0) / 9],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const animate = useCallback(
    (val: number) => {
      Animated.spring(animation, {
        toValue: val,
        bounciness: 0,
        useNativeDriver: true,
      }).start();
    },
    [animation]
  );

  useEffect(() => {
    if (isFocused) animate(1);
  }, []);

  const animatedStyle = {
    transform: [{ translateY }, { translateX }, { scale }],
  };

  const onLayout = (e: LayoutChangeEvent) => {
    if (!inputHeight) {
      setHeight(e.nativeEvent.layout.height);
    }
  };

  const styles = useAnimatedInputStyle({
    inputHeight,
    secureTextEntry,
    borderColor,
    multiline,
    isFocused,
    errorMessage,
    value,
    borderRadius,
  });

  return (
    <>
      <View style={styles.inputContainer} onLayout={onLayout}>
        <View style={styles.placeholderContainer}>
          <Animated.Text
            style={[styles.placeholder, animatedStyle]}
            onTextLayout={(e) =>
              !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }
          >
            {placeholder}
          </Animated.Text>
        </View>
        <Animated.View style={styles.inputIconContainer}>
          <TextInput
            editable={editable}
            style={[styles.input, multiline && styles.multiline]}
            value={value}
            keyboardType={keyboardType || 'default'}
            onFocus={() => {
              setIsFocused(true);
              animate(1);
            }}
            onChangeText={onChange}
            onBlur={(e) => {
              onBlur && onBlur(e);
              setIsFocused(false);
              value.length < 1 && animate(0);
            }}
            placeholder={isFocused ? placeholderText : ''}
            placeholderTextColor={Colors.lightGray}
            multiline={multiline}
            secureTextEntry={hidePass}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setHidePass(!hidePass)}
            >
              <Icons
                family="Ionicons"
                name={hidePass ? 'eye-off-outline' : 'eye-outline'}
                color={Colors.black}
                size={metrics.width(22)}
              />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      {!!errorMessage && (
        <View style={styles.errorMessage}>
          <CustomText
            label={`${errorMessage}*`}
            color={Colors.red}
            fontFamily={Fonts.Regular}
            fontSize={13}
            fontStyle="italic"
          />
        </View>
      )}
    </>
  );
};

export default AnimatedInput;
