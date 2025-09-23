import { View } from 'react-native';
import React from 'react';

const Spacer = ({ height }) => {
  return (
    <View
      style={{
        height: height || '40%',
      }}
    />
  );
};

export default Spacer;
