import { View } from 'react-native';
import React, { FC } from 'react';
import Stars from 'react-native-stars';
import Icons from './Icons';
import { useCustomStarsStyle } from '../style';
import { normalizeSize } from '../../util/metrics';

interface CustomStarsProps {
  setRating: (rating: number) => void;
  rating: number;
  disabled: boolean;
  spacing?: number;
}

const CustomStars: FC<CustomStarsProps> = ({
  setRating,
  rating,
  disabled,
  spacing,
}) => {
  const styles = useCustomStarsStyle();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <View style={styles.mainContainer}>
      <Stars
        disabled={disabled}
        default={rating}
        count={5}
        half={true}
        // starSize={20}
        spacing={spacing || 5}
        fullStar={
          <Icons
            family="AntDesign"
            name={'star'}
            size={normalizeSize(15)}
            style={styles.fullStar}
          />
        }
        emptyStar={
          <Icons
            family="AntDesign"
            name={'staro'}
            size={normalizeSize(15)}
            style={styles.emptyStar}
          />
        }
        halfStar={
          <Icons
            family="FontAwesome"
            name={'star-half-empty'}
            size={normalizeSize(15)}
            style={styles.halfStar}
          />
        }
        update={(val: number) => handleRatingChange(val)}
      />
    </View>
  );
};

export default CustomStars;
