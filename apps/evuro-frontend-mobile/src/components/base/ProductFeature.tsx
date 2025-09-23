import React, { FC, useEffect } from 'react';
import {
  Image,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics, normalizeSize } from '../../util/metrics';
import Icons from './Icons';
import CustomText from './CustomText';
import { Fonts } from '../../assets/fonts';
import { useProductFeatureStyle } from '../style';
import { useGetImageUrlQuery } from '@evuro-frontend/store';
import { API_ROUTES } from 'libs/store/src/lib/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomImage from './CustomImage';

interface ProductFeatureProps {
  onPress?: () => void;
  productName: string;
  age: string;
  price: string;
  onCartPress?: () => void;
  isDispatchItem?: boolean;
  image?: string;
}

const ProductFeature: FC<ProductFeatureProps> = ({
  onPress,
  productName,
  age,
  price,
  onCartPress,
  isDispatchItem,
  image,
}) => {
  const styles = useProductFeatureStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.mainContainer}
      onPress={onPress}
    >
      {isDispatchItem ? null : (
        <Pressable onPress={onCartPress} style={styles.cartContainer}>
          <Icons
            family="MaterialCommunityIcons"
            name="cart"
            color={Colors.white}
            size={metrics.width(30)}
          />
        </Pressable>
      )}
      <View style={styles.foodTextContainer}>
        <CustomText
          label={productName}
          fontSize={20}
          color={Colors.white}
          fontFamily={Fonts.Medium}
          marginBottom={metrics.height(8)}
        />
        {age && (
          <CustomText
            label={age}
            fontSize={15}
            color={Colors.white}
            marginBottom={metrics.height(8)}
          />
        )}
        <CustomText label={price} fontSize={20} color={Colors.white} />
      </View>
      {image ? (
        <CustomImage url={image} style={{ height: '100%', width: '100%' }} />
      ) : (
        <Svgs.Food height={230} width={380} />
      )}
    </TouchableOpacity>
  );
};

export default ProductFeature;
