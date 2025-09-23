import { TouchableOpacity, View, ImageSourcePropType } from 'react-native';
import React from 'react';
import { CustomText } from '../../../../components/index';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from '../../../../assets/fonts';
import { useMostPopularStyle } from './style';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { CustomImage } from '../../../../components/index';

interface MostPopularProps {
  onPress: () => void;
  source: ImageSourcePropType;
  detail: string;
  priceLabel: string;
  isWalker: boolean;
  label: string;
  Experience: string;
  KM: string;
  Gander: string;
}

const MostPopular: React.FC<MostPopularProps> = ({
  onPress,
  source,
  detail,
  priceLabel,
  isWalker,
  label,
  Experience,
  KM,
  Gander,
}) => {
  const styles = useMostPopularStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.mainContainer}
    >
      <CustomImage url={source} isUser style={styles.img} />

      <View style={styles.textContainer}>
        {isWalker ? (
          <>
            <CustomText label={label} fontSize={15} fontFamily={Fonts.Medium} />
            <CustomText
              label={Experience}
              fontSize={12}
              color={Colors.darkGray}
            />
            <View style={{ flexDirection: 'row' }}>
              <CustomText
                label={KM}
                fontFamily={Fonts.Regular}
                color={Colors.darkGray}
              />
              <EvilIcon name={'location'} size={16} color={Colors.red} />
            </View>
            <CustomText
              label={Gander}
              color={Colors.darkGray}
              fontFamily={Fonts.Regular}
            />
          </>
        ) : (
          <>
            <CustomText
              label={detail}
              fontSize={15}
              fontFamily={Fonts.Medium}
              color={Colors.black}
            />
            <CustomText
              label={priceLabel}
              fontSize={15}
              color={Colors.lightGray}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MostPopular;
