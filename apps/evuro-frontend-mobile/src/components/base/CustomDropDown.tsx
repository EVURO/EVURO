import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  UIManager,
} from 'react-native';

import CustomText from './CustomText';
import Icons from './Icons';

import { Fonts } from '../../assets/fonts';
import { Colors } from '@evuro-frontend/assets';

import { useCustomDropDownStyle } from '../style';
import { metrics } from '../../util/metrics';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

interface CustomDropDownProps {
  data: { label: string; value: string }[];
  value: string;
  setValue: (arg0: string) => void;
  label: string;
  errorMessage?: string;
  disabled?: boolean;
  emptyLabel?: string;
  showIcon?: boolean;
  emptyLabelPress?: () => void;
  open?: boolean;
  setOpen?: (arg0: boolean) => void;
  borderColor?: string;
}

const CustomDropdown: React.FC<CustomDropDownProps> = ({
  data,
  value,
  setValue,
  label,
  errorMessage,
  disabled,
  emptyLabel,
  showIcon,
  emptyLabelPress,
  open,
  setOpen,
  borderColor,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [select, setSelect] = useState(value);
  useEffect(() => {
    setTimeout(() => {
      setSelect(value);
    }, 200);
  }, [value]);

  const styles = useCustomDropDownStyle({ borderColor });

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    setOpen?.(!open);
  };

  const isLabel = select?.length === 0 || select?.length === undefined;

  const selectOption = (option) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setValue(option?.value);
    setSelect(option?.label);
    setIsOpen(false);
    setOpen?.(false);
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setOpen?.(false);
    emptyLabelPress?.();
  }, [emptyLabelPress, setOpen]);

  return (
    <>
      <View
        style={[
          styles.dropdownMainContainer,
          { borderRadius: isOpen ? 15 : 50 },
        ]}
      >
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.6}
          style={styles.dropDownContainer}
          onPress={toggleDropdown}
        >
          <CustomText
            label={isLabel ? label : select}
            fontSize={isLabel ? 16 : 20}
            fontFamily={Fonts.Regular}
            color={isLabel ? Colors.lightGray : Colors.black}
          />
          {!showIcon ? (
            <Icons
              family="Entypo"
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              size={metrics.width(22)}
              color={Colors.lightGray}
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>

        {isOpen && data?.length > 0 && (
          <ScrollView
            style={styles.dropdown}
            showsVerticalScrollIndicator={false}
          >
            {data?.map((option, i) => (
              <TouchableOpacity key={i} onPress={() => selectOption(option)}>
                <CustomText
                  label={option?.label}
                  fontSize={16}
                  marginTop={10}
                  marginBottom={data?.length - 1 === i ? 10 : 0}
                  color={Colors.black}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {isOpen && data?.length === 0 && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={closeDropdown}
            style={styles.emptyContainer}
          >
            <CustomText
              label={emptyLabel || 'No Data'}
              color={Colors.black}
              fontSize={14}
              fontFamily={Fonts.Medium}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <View
          style={{
            marginLeft: metrics.width(20),
            marginTop: metrics.height(5),
          }}
        >
          <CustomText label={errorMessage} color={Colors.red} />
        </View>
      ) : null}
    </>
  );
};

export default CustomDropdown;
