import {SafeAreaView, Text, View, Image} from 'react-native';
import React from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import images from '../../../assets/images';
import colors from '../../../util/colors';
import CustomText from '../../../common/components/CustomText';
import Icons from '../../../common/components/Icons';
import fonts from '../../../assets/fonts';
import CustomInput from '../../../common/components/CustomInput';
import LinearGradientBtn from '../../../common/components/LinearGradientBtn';
import {useNavigation} from '@react-navigation/native';
const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icons
          family="FontAwesome5"
          name="chevron-left"
          size={20}
          color={colors.blue}
          onPress={() => navigation.goBack()}
        />
        <CustomText
          label="Forgot Password"
          fontSize={moderateScale(15)}
          fontFamily={fonts.semiBold}
        />
        <View />
      </View>
      <View
        style={{
          marginHorizontal: scale(20),
          marginVertical: verticalScale(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image resizeMode="contain" style={styles.image} source={images.logo} />
      </View>
      <View style={{marginHorizontal: scale(20), alignItems: 'center'}}>
        <CustomInput
          placeholder="Enter Email"
          borderRadius={moderateScale(50)}
          borderWidth={-1}
          backgroundColor="#e8e8e8"
          placeholderTextColor={colors.boxColor}
        />
        <LinearGradientBtn
          title="Submit"
          alignSelf="center"
          borderRadius={moderateScale(50)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    // backgroundColor: 'red',
    marginTop: verticalScale(15),
  },
  image: {
    height: 163,
    width: 115,
  },
});
