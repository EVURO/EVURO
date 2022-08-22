import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, title, container}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, container]}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: '#4FC2F8',
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});
