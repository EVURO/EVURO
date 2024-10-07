import React, { useState } from 'react';
import { TextInput, View, PanResponder, Text } from 'react-native';

import { Fonts } from '../../assets/fonts';
import { useTextAreaStyle } from '../style';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';

interface CustomTextAreaProps {
  style?: any;
  placeholder?: string;
  label?: string;
  marginBottom?: number;
  labelColor?: string;
  labelMarginLeft?: number;
  familyFont?: string;
  labelStyle?: any;
  fontSize?: number;
  value: string;
  onChangeText: (e: string) => void;
  editable: boolean;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  style,
  label,
  marginBottom,
  labelColor,
  labelMarginLeft,
  familyFont,
  labelStyle,
  value,
  onChangeText,
  fontSize,
  editable,
}) => {
  const styles = useTextAreaStyle();
  const [dimensions, setDimensions] = useState({
    height: 130,
    width: metrics.screenWidth - metrics.width(40),
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = Math.max(
        50,
        Math.min(200, dimensions.height + gestureState.dy)
      );
      const newWidth = Math.max(
        100,
        Math.min(340, dimensions.width + gestureState.dx)
      );

      setDimensions({
        height: newHeight,
        width: newWidth,
      });
    },
  });

  return (
    <>
      {label && (
        <Text
          style={[
            {
              marginBottom: marginBottom || 5,
              color: labelColor || Colors.black,
              marginLeft: labelMarginLeft,
              fontSize: fontSize || 18,
              fontFamily: Fonts.Medium,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <View style={[styles.container, dimensions, style]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline
          placeholderTextColor={Colors.lightGray}
          textAlignVertical="top"
          style={styles.textArea}
          editable={editable}
        />
        <View {...panResponder.panHandlers} style={styles.emptyContainer}>
          <View style={[styles.emptyView, { width: '50%' }]} />
          <View style={[styles.emptyView, { width: '25%' }]} />
        </View>
      </View>
    </>
  );
};

export default CustomTextArea;
