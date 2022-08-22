import {Image, SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import colors from '../../../util/colors';
import images from '../../../assets/images';
import CustomText from '../../../common/components/CustomText';
import fonts from '../../../assets/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CheckBox from '../../../common/components/Checkbox';

const Otp = ({navigation}) => {
  const [code, setCode] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', marginVertical: verticalScale(20)}}>
        <Image
          source={images.logo}
          style={{width: scale(150), height: verticalScale(160)}}
          resizeMode="contain"
        />
        <CustomText
          label="Please Confirm OTP"
          fontSize={moderateScale(22)}
          fontFamily={fonts.semiBold}
        />
        <CustomText
          label="We have sent verification code on your Phone Number: +01234567891011"
          textStyle={{width: scale(200), textAlign: 'center'}}
          alignSelf="center"
          color={colors.boxColor}
        />
        <OTPInputView
          style={{width: '80%', height: 100}}
          secureTextEntry={true}
          codeInputFieldStyle={styles.codeInputStyle}
          pinCount={4}
          placeholderTextColor={colors.primary}
          autoFocusOnLoad
          code={code}
          onCodeChanged={code => setCode(code)}
          selectionColor={colors.blue}
          onCodeFilled={() => navigation.navigate('MainStack')}
        />
        <CheckBox
          value={checkBox}
          onChangeValue={() => setCheckBox(!checkBox)}
          label="I agree to the terms and conditions."
          buttonContainer={{
            borderWidth: 1,
            borderColor: colors.boxColor,
            borderRadius: 2,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Otp;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  codeInputStyle: {
    borderRadius: 15,
    height: verticalScale(56),
    width: scale(56),
    borderWidth: 2,
    color: colors.primary,
    borderColor: '#D9D9D9',
  },
});
