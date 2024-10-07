import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import React, { ReactNode } from 'react';
import { useCustomModalStyle } from '../style';

interface CustomModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children?: ReactNode;
  height?: number;
  justifyContent?: string;
  width?: number;
  borderRadius?: number;
  alignItems?: string;
  marginBottom?: number;
  statusBarTranslucent?: boolean;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onRequestClose,
  children,
  height,
  justifyContent,
  width,
  borderRadius,
  alignItems,
  marginBottom,
  statusBarTranslucent,
  borderTopLeftRadius,
  borderTopRightRadius,
}) => {
  const styles = useCustomModalStyle({
    justifyContent,
    width,
    borderRadius,
    alignItems,
    borderTopLeftRadius,
    borderTopRightRadius,
  });
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      // statusBarTranslucent={statusBarTranslucent || true}
    >
      <Pressable
        style={[
          styles.mainContainer,
          {
            marginBottom: marginBottom,
          },
        ]}
        onPress={onRequestClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ ...styles.container, height: height }}
        >
          {children}
        </TouchableOpacity>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;
