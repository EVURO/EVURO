import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import CustomText from '../base/CustomText';
import { Fonts } from '../../assets/fonts';
import { useDogTrailerStyle } from '../style';
import CustomImage from '../base/CustomImage';
import Icons from '../base/Icons';

interface DogTrailerProps {
  label: string;
  image?: string;
  onPress?: () => void;
  selected?: boolean;
}

const DogTrailer: FC<DogTrailerProps> = ({
  label,
  image,
  onPress,
  selected,
}) => {
  const styles = useDogTrailerStyle();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View style={styles.mainContainer}>
        {image === null || image === undefined ? (
          <Svgs.Trailer height={metrics.width(65)} width={metrics.width(65)} />
        ) : (
          <CustomImage url={image} style={styles.image} />
        )}
      </View>
      {selected && (
        <View style={styles.selectedButton}>
          <Icons
            family={'MaterialCommunityIcons'}
            name="check"
            color={Colors.white}
            size={12}
          />
        </View>
      )}
      <CustomText label={label} fontSize={12} fontFamily={Fonts.Regular} />
    </TouchableOpacity>
  );
};

export default DogTrailer;
