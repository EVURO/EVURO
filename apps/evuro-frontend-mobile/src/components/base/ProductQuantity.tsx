import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { Fonts } from '../../assets/fonts';
import { useProductQuantityStyle } from '../style';
import Icons from './Icons';
import { metrics } from '../../util/metrics';
import { Colors } from '@evuro-frontend/assets';

interface ProductQuantityProps {
  onIncreasePress?: () => void;
  onDecreasePress?: () => void;
  count: string | number;
  price: number;
  minusColor: string;
  plusColor: string;
  disabledMinus: boolean;
  disabledPlus: boolean;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  onIncreasePress,
  onDecreasePress,
  count,
  price,
  minusColor,
  plusColor,
  disabledMinus,
  disabledPlus,
}) => {
  const styles = useProductQuantityStyle();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          disabled={disabledMinus}
          activeOpacity={0.6}
          onPress={onDecreasePress}
        >
          <Icons
            family="Entypo"
            name="minus"
            size={metrics.width(22)}
            color={minusColor || Colors.black}
          />
        </TouchableOpacity>

        <CustomText label={String(count)} fontSize={20} />

        <TouchableOpacity
          disabled={disabledPlus}
          activeOpacity={0.6}
          onPress={onIncreasePress}
        >
          <Icons
            family="Entypo"
            name="plus"
            size={metrics.width(22)}
            color={plusColor || Colors.black}
          />
        </TouchableOpacity>
      </View>
      <CustomText label={`${price}`} fontSize={20} fontFamily={Fonts.Medium} />
    </View>
  );
};

export default ProductQuantity;
