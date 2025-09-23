import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  CustomImage,
  CustomText,
} from 'apps/evuro-frontend-mobile/src/components';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import DeliveryCard from 'apps/evuro-frontend-mobile/src/components/ui/DeliveryCard';
import { useOrderDetailsStyle } from '../OrderDetails/style';

const CheckOutProducts = ({
  delivery,
  productName,
  productPrice,
  quantity,
  imageName,
  discription,
}) => {
  const styles = useOrderDetailsStyle();

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.imgContainer}>
          <CustomImage url={imageName} isUser style={styles.img} />
        </View>

        <View style={styles.txtContainer}>
          <CustomText
            fontSize={13}
            fontFamily={Fonts.Medium}
            label={productName}
          />
          <CustomText
            fontSize={13}
            fontFamily={Fonts.Regular}
            label={discription}
          />

          {/* <View style={styles.deliverytxtContainer}>
            <CustomText
              label={`Delivery : $${delivery?.standardDelivery}`}
              color={Colors.darkBlue}
            />
          </View> */}

          <CustomText
            fontSize={14}
            fontFamily={Fonts.Medium}
            label={productPrice}
          />
          <CustomText
            label={quantity}
            fontSize={15}
            fontFamily={Fonts.Medium}
            marginRight={metrics.width(10)}
            marginTop={metrics.height(10)}
            marginBottom={metrics.height(15)}
          />
        </View>
      </View>

      <View style={styles.borderBottom} />
    </View>
  );
};

export default CheckOutProducts;

const styles = StyleSheet.create({});
