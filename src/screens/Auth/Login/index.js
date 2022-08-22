import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../../assets/images';
import CustomInput from '../../../common/components/CustomInput';
import CustomText from '../../../common/components/CustomText';
import CustomButton from '../../../common/components/CustomButton';
import icons from '../../../assets/icons';
import colors from '../../../util/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import LinearGradientBtn from '../../../common/components/LinearGradientBtn';
import auth from '@react-native-firebase/auth';
import {isValidEmail} from '../../../util/validation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Preference from 'react-native-preference';
import Icons from '../../../common/components/Icons';
import fonts from '../../../assets/fonts';
const Login = ({navigation}) => {
  const init = {
    email: '',
    password: '',
  };
  const {height, width} = Dimensions.get('window');
  const [userData, setUserData] = useState(init);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = data => {
    console.log('----Data', data);
    var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,9})$/;
    if (!data.email.length) {
      setError('Kindly enter your email');
    } else if (re.test(data.email) == false) {
      setError('Kindly add valid email');
    } else if (data.password.length < 8) {
      setError('Invalid Password, kindly add valid password');
    } else {
      signUpWithEmail(data);
    }
  };
  const signUpWithEmail = async data => {
    setLoading(true);
    setError('');
    try {
      const userCredentials = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      setLoading(false);
      Preference.setWhiteList([]);
      Preference.set('userID', userCredentials.user.uid);
      navigation.navigate('MainStack');
      setUserData(init);
    } catch (error) {
      setLoading(false);
      console.log('-----ERror', error);
      setError('User not found');
    }
  };

  return (
    <SafeAreaView style={styles.mainCtn}>
      <ScrollView contentContainerStyle={{height: height, width: width}}>
        <View style={{flex: 0.5}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(20),
            }}>
            <Image source={images.logo} style={styles.image} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <CustomInput
              placeholder="Email"
              borderWidth={-1}
              backgroundColor="#e8e8e8"
              borderRadius={moderateScale(50)}
              marginBottom={10}
              placeholderTextColor={colors.boxColor}
              leftIcon={true}
              value={userData.email}
              onChangeText={value => setUserData({...userData, email: value})}
              family="Ionicons"
              name="ios-person-outline"
              size={14}
            />
            <CustomInput
              placeholder="Password"
              borderWidth={-1}
              borderRadius={moderateScale(50)}
              placeholderTextColor={colors.boxColor}
              backgroundColor="#e8e8e8"
              marginBottom={scale(1)}
              leftIcon={true}
              value={userData.password}
              onChangeText={value =>
                setUserData({...userData, password: value})
              }
              secureTextEntry={true}
              family="Ionicons"
              name="ios-lock-closed-outline"
            />
          </View>
          {error ? (
            <CustomText
              label={error}
              color={colors.red}
              textStyle={{marginLeft: scale(20)}}
            />
          ) : (
            <View />
          )}

          <CustomText
            label="Forgot Password?"
            alignSelf="flex-end"
            onPress={() => navigation.navigate('forgot')}
            marginRight={scale(20)}
            color={colors.blue}
            marginTop={verticalScale(10)}
          />
          <LinearGradientBtn
            title="Login"
            alignSelf="center"
            loading={loading}
            onPress={() => handleSubmit(userData)}
            marginTop={verticalScale(10)}
            borderRadius={moderateScale(50)}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: verticalScale(20),
          }}>
          <CustomText
            label="Or continue with"
            alignSelf="center"
            color="#c8c8c8"
          />
          {/* <View
            style={{flexDirection: 'row', marginVertical: verticalScale(20)}}>
            <Image source={icons.google} style={styles.ioncimage} />
            <Image source={icons.fb} style={styles.ioncimage} />
          </View> */}
          <TouchableOpacity
            style={{
              elevation: 5,
              shadowColor: '#000',
              height: verticalScale(40),
              width: '70%',
              borderRadius: 5,
              backgroundColor: '#4872ba',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: scale(10),
              marginTop: verticalScale(15),
            }}
            activeOpacity={0.6}>
            <Icons
              family="AntDesign"
              name="facebook-square"
              color={colors.white}
              size={25}
            />
            <CustomText
              label="Sign in With Facebook"
              color={colors.white}
              textStyle={{marginLeft: scale(20), fontSize: 13}}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              elevation: 5,
              shadowColor: '#000',
              height: verticalScale(40),
              width: '70%',
              borderRadius: 5,
              backgroundColor: colors.white,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: scale(10),
              marginTop: verticalScale(15),
            }}>
            {/* <Icons family="FontAwesome" name="google" size={30}/> */}
            <Image source={icons.google} style={styles.ioncimage} />
            <CustomText
              label="Sign in With Google"
              textStyle={{marginLeft: scale(20), fontSize: 13}}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              marginBottom: verticalScale(10),
              justifyContent: 'center',
            }}>
            <CustomText label="Don’t have an account?" color="#c8c8c8" />
            <CustomText
              label="Sign up"
              fontSize={12}
              marginLeft={scale(5)}
              color={colors.blue}
              onPress={() => navigation.navigate('option')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainCtn: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    height: 163,
    width: 115,
  },
  ioncimage: {
    height: 25,
    width: 25,
  },
});
