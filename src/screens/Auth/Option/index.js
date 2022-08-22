import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../util/colors';
import CustomButton from '../../../common/components/CustomButton';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomText from '../../../common/components/CustomText';
import {ScaledSheet} from 'react-native-size-matters';
import LinearGradientBtn from '../../../common/components/LinearGradientBtn';
import MainStack from '../../../routes/MainStack';
const Option = ({navigation}) => {
  return (
    <SafeAreaView style={styles.ctn1}>
      <View style={styles.textContainer}>
        <CustomText
          label="Choose Account"
          alignSelf="center"
          fontSize={moderateScale(23)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LinearGradientBtn
          title="Dog Owner"
          width="90%"
          alignSelf="center"
          borderRadius={moderateScale(50)}
          onPress={() =>
            navigation.navigate('register', {
              title: 'walker',
            })
          }
        />
        <LinearGradientBtn
          marginTop={verticalScale(10)}
          title="Dog Walker "
          width="90%"
          borderRadius={moderateScale(50)}
          alignSelf="center"
          onPress={() =>
            navigation.navigate('register', {
              title: 'Walk Trail',
            })
          }
        />
        <LinearGradientBtn
          marginTop={verticalScale(10)}
          title="EVURODOG Ecoleash"
          width="90%"
          alignSelf="center"
          borderRadius={moderateScale(50)}
          onPress={() => navigation.navigate('MainStack')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Option;

const styles = ScaledSheet.create({
  ctn1: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  textContainer: {
    // backgroundColor: 'red',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
});
