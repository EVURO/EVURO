import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../../common/components/CustomHeader';
import {verticalScale} from 'react-native-size-matters';
import colors from '../../../util/colors';

const Launches = () => {
  return (
    <View>
      <CustomHeader
        title="Product"
        size={verticalScale(20)}
        family={'AntDesign'}
        name="arrowleft"
        color={colors.white}
      />
    </View>
  );
};

export default Launches;

const styles = StyleSheet.create({});
