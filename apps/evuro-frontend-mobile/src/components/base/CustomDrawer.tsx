import { View, StyleProp, ViewStyle } from 'react-native';
import React, { FC, ReactNode } from 'react';
import Modal from 'react-native-modal';
import { setShowDrawer, useAppDispatch } from '@evuro-frontend/store';
interface CustomModalProps {
  isVisible: boolean;
  modalStyle?: StyleProp<ViewStyle>;
  animationIn?: string;
  animationOut?: string;
  animationInTiming?: number;
  animationOutTiming?: number;
  children: ReactNode;
  modalContainer?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
}
const CustomDrawer: FC<CustomModalProps> = ({
  isVisible,
  modalStyle,
  animationIn,
  animationOut,
  animationInTiming,
  animationOutTiming,
  children,
  modalContainer,
  backdropOpacity,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      style={[{ margin: 0, marginTop: 0, width: '100%' }, modalStyle]}
      onBackdropPress={() => dispatch(setShowDrawer(false))}
      onBackButtonPress={() => dispatch(setShowDrawer(false))}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      isVisible={isVisible}
      backdropOpacity={backdropOpacity}
    >
      <View style={[{ flex: 1 }, modalContainer]}>{children}</View>
    </Modal>
  );
};

export default CustomDrawer;
