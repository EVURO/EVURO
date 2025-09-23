import React, { FC } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { CustomText, CustomStars } from '../index';
import { Fonts } from '../../assets/fonts';
import { Colors } from '@evuro-frontend/assets';
import { useRatingCardStyle } from '../style';
import CustomImage from '../base/CustomImage';
import { metrics } from '../../util/metrics';
import { placeholderImage } from '../../util/Halper';

interface RatingCardProps {
  label: string;
  source: any;
  country: string;
  year: string;
  rating: number;
  setRating: (rating: number) => void;
  onPress: () => void;
  paddingHorizontal: number;
  marginRight: number;
  productImage?: string;
  talentImage?: string;
  isTalents?: boolean;
  marginLeft?: number;
  status?: boolean;
}

const RatingCard: FC<RatingCardProps> = ({
  paddingHorizontal,
  marginRight,
  label,
  source,
  country,
  year,
  rating,
  setRating,
  onPress,
  productImage,
  talentImage,
  isTalents,
  marginLeft,
  status,
}) => {
  const styles = useRatingCardStyle({
    marginRight,
    paddingHorizontal,
    marginLeft,
  });
  // console.log('productImage=', productImage);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.mainContainer}
    >
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          {isTalents ? (
            !talentImage ? (
              <Image
                source={{ uri: placeholderImage }}
                resizeMode="cover"
                style={styles.img}
              />
            ) : (
              <CustomImage url={talentImage} style={styles.img} />
            )
          ) : productImage ? (
            <CustomImage url={productImage} style={styles.img} />
          ) : null}
        </View>

        <View style={styles.txtContainer}>
          {isTalents && (
            <View
              style={{
                backgroundColor: status === true ? 'green' : 'red',
                height: metrics.width(15),
                width: metrics.width(15),
                borderRadius: 50,
                position: 'absolute',
                zIndex: 1,
                right: metrics.width(10),
                top: metrics.height(5),
              }}
            />
          )}
          <CustomText
            label={label}
            fontSize={16}
            fontFamily={Fonts.Medium}
            marginBottom={metrics.height(3)}
          />
          <CustomText
            label={country}
            fontFamily={Fonts.Medium}
            color={Colors.lightGray}
            fontSize={14}
            marginBottom={metrics.height(year ? 3 : 0)}
          />
          {year && (
            <CustomText
              label={year}
              fontFamily={Fonts.Medium}
              color={Colors.lightGray}
            />
          )}
          <CustomStars disabled setRating={setRating} rating={rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RatingCard;
