import {View, Text} from 'react-native';
import React from 'react';
import colors from '../../../../util/colors';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import Icons from '../../../../common/components/Icons';
import CustomText from '../../../../common/components/CustomText';

const Card = ({label}) => {
  return (
    <View style={styles.cardContainer}>
      <Icons
        family="MaterialCommunityIcons"
        name="dog"
        size={40}
        color={colors.blue}
      />
      <CustomText label={label} marginTop={verticalScale(10)} />
    </View>
  );
};
const styles = ScaledSheet.create({
  cardContainer: {
    height: 150,
    width: '30%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(5),
    margin: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
export default Card;
