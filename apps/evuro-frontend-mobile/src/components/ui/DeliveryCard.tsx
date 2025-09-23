import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { Colors } from '@evuro-frontend/assets';
import { useAddtoCartStyle } from '../../pages/Main/AddtoCart/style';
import moment from 'moment';

const DeliveryCard = ({ daysDuration, deliveryFee }) => {
  const styles = useAddtoCartStyle();

  return (
    <View style={styles.deliveryContainer}>
      <CustomText
        label={`Delivery Charges: $${deliveryFee || '0'}`}
        color={Colors.darkBlue}
        fontSize={18}
      />
      <CustomText
        label={`Duration: ${moment().format('DD MMM')} to ${moment()
          .add(daysDuration, 'days')
          .format('DD MMM')}`}
        color={Colors.lightGray}
        fontSize={14}
        marginTop={2}
      />
    </View>
  );
};

export default DeliveryCard;

const styles = StyleSheet.create({});
