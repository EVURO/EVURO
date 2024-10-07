import { TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import { CustomText, Icons, ProductQuantity } from '../index';
import { Fonts } from '../../assets/fonts';
import { metrics } from '../../util/metrics';
import { useProductDetailStyle } from '../style';
import CustomImage from '../base/CustomImage';
import { Colors } from '@evuro-frontend/assets';

interface ProductDetailProps {
  label: string;
  detail: string;
  checkBox?: boolean;
  cartScreen?: boolean;
  isChecked?: boolean;
  onIncreasePress?: () => void;
  onDecreasePress?: () => void;
  count?: number;
  price?: number;
  onCheck?: () => void;
  image?: string;
  minusColor?: string;
  plusColor?: string;
  disabledMinus: boolean;
  disabledPlus: boolean;
}

const ProductDetail: FC<ProductDetailProps> = ({
  label,
  detail,
  checkBox,
  cartScreen,
  onIncreasePress,
  onDecreasePress,
  count,
  price,
  onCheck,
  isChecked,
  image,
  minusColor,
  plusColor,
  disabledMinus,
  disabledPlus,
}) => {
  const styles = useProductDetailStyle({ cartScreen });

  return (
    <View style={styles.container}>
      {cartScreen && (
        <View style={styles.imgContainer}>
          <CustomImage url={image} style={styles.img} />
        </View>
      )}
      <View style={styles.innerContainer}>
        <View style={styles.mainContainer}>
          <CustomText label={label} fontSize={20} fontFamily={Fonts.Medium} />
          {!!checkBox && (
            <TouchableOpacity onPress={onCheck}>
              {isChecked ? (
                <Icons
                  family="Ionicons"
                  name="checkbox"
                  color={Colors.darkBlue}
                  size={metrics.width(25)}
                />
              ) : (
                <View style={styles.emptyBox} />
              )}
            </TouchableOpacity>
          )}
        </View>

        <CustomText
          label={detail}
          fontSize={14}
          marginTop={metrics.height(10)}
        />
        {cartScreen && (
          <ProductQuantity
            onIncreasePress={onIncreasePress}
            onDecreasePress={onDecreasePress}
            count={count}
            price={price}
            minusColor={minusColor}
            plusColor={plusColor}
            disabledMinus={disabledMinus}
            disabledPlus={disabledPlus}
          />
        )}
      </View>
    </View>
  );
};

export default ProductDetail;
