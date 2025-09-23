import { View } from 'react-native';
import React from 'react';
import { CustomText } from '../../../components/index';
import { useNavigation } from '@react-navigation/native';

const Order = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomText
        label="OrderScreen"
        fontSize={25}
        onPress={() => navigation.navigate('LocateWalker')}
      />
    </View>
  );
};

export default Order;
