import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import colors from '../../../util/colors';
import CustomHeader from '../../../common/components/CustomHeader';

const Post = () => {
  return (
    <View>
      <CustomHeader
        title="Post"
        size={verticalScale(20)}
        family={'AntDesign'}
        name="arrowleft"
        color={colors.white}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
