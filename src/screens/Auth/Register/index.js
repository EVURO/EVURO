import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../../util/colors';
import CustomText from '../../../common/components/CustomText';
import Person from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../../../common/components/CustomInput';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import CustomButton from '../../../common/components/CustomButton';
import fonts from '../../../assets/fonts';
import LinearGradientBtn from '../../../common/components/LinearGradientBtn';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Preference from 'react-native-preference';
import {addUserData} from '../../../firebase/firestore/users';
import {uploadImagesData} from '../../../util/uploadImageData';
const init = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  breed: '',
  password: '',
  city: '',
  province: '',
  image: '',
};
const Register = ({route, navigation}) => {
  const {title} = route.params;

  const [checked, setChecked] = useState('male');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [breed, setBreed] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [image, setImage] = useState('');
  const [getImageUrl, setGetImageUrl] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setLoadingProfile(true);
    storage()
      .ref('profile')
      .getDownloadURL()
      .then(url => {
        setGetImageUrl(url);
        console.log(url);
      })
      .catch(e => console.log(e))
      .finally(() => setLoadingProfile(false));
  }, []);
  const SignupData2 = [
    {
      id: 0,
      placeholder: 'First Name',
      value: firstName,
      onchangeText: setFirstName,
      leftIcon: true,
      family: 'Ionicons',
      name: 'ios-person-outline',
    },
    {
      id: 1,
      placeholder: 'Last Name',
      value: lastName,
      onchangeText: setLastName,
      leftIcon: true,
      family: 'Ionicons',
      name: 'ios-person-outline',
    },
  ];
  const SignupData = [
    {
      id: 0,
      placeholder: 'Phone Number',
      value: phone,
      onchangeText: setPhone,
      leftIcon: true,
      family: 'Ionicons',
      name: 'call-outline',
      keyboardType: 'phone-pad',
    },
    {
      id: 1,
      placeholder: 'Breed',
      value: breed,
      onchangeText: setBreed,
      leftIcon: true,
      family: 'MaterialCommunityIcons',
      name: 'dog',
    },
    {
      id: 2,
      placeholder: 'Email Address',
      value: email,
      onchangeText: setEmail,
      leftIcon: true,
      family: 'Feather',
      name: 'mail',
    },
    {
      id: 3,
      placeholder: 'Password',
      value: password,
      onchangeText: setPassword,
      leftIcon: true,
      family: 'Ionicons',
      name: 'ios-lock-closed-outline',
      secureTextEntry: true,
    },
    {
      id: 4,
      placeholder: 'Confirm Password',
      value: confirmPassword,
      onchangeText: setConfirmPassword,
      leftIcon: true,
      family: 'Ionicons',
      name: 'ios-lock-closed-outline',
      secureTextEntry: true,
    },
    {
      id: 5,
      placeholder: 'City',
      value: city,
      leftIcon: true,
      family: 'MaterialCommunityIcons',
      name: 'home-city-outline',
      onchangeText: setCity,
    },
    {
      id: 6,
      placeholder: 'Province',
      value: province,
      onchangeText: setProvince,
      leftIcon: true,
      family: 'Feather',
      name: 'map-pin',
    },
  ];
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      setModal(false);
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      setModal(false);
    });
  };
  const validate = () => {
    var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,9})$/;
    const errors = [];
    if (firstName?.length == 0) {
      errors.push('First Name*');
      setError('Enter your First Name');
    } else if (lastName?.length == 0) {
      errors.push('Last Name*');
      setError('Enter your Last Name');
    } else if (breed?.length == 0) {
      errors.push('Breed*');
      setError('Breed*');
    } else if (phone?.length == 0) {
      errors.push('Phone Number*');
      setError('Please Enter your Phone Number');
    } else if (email?.length == 0) {
      errors.push('Email*');
      setError('Plese Enter your Email');
    } else if (re.test(email) == false) {
      setError('Enter valid Email');
    } else if (password?.length == 0) {
      errors.push('Password *');
      setError('Enter Password');
    } else if (password?.length < 8) {
      setError('Password must be greater then 8');
    } else if (password != confirmPassword) {
      errors.push('Password not Match');
    } else if (city?.length == 0) {
      errors.push('City*');
      setError('Enter City Name');
    } else if (province?.length == 0) {
      errors.push('Province*');
      setError('Province*');
    } else {
      onRegister();
    }
    return errors.length == 0;
  };
  const onRegister = user => {
    setLoader(true);

    // try {
    //   const userCredentials = await auth().createUserWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    //   setUserData(init);
    //   Preference.setWhiteList([]);
    //   Preference.set('userID', userCredentials.user.uid);
    //   await addUserData (
    //     userCredentials.user.uid,
    //     user.firstName,
    //     user.lastName,
    //     user.email,
    //     user.phone,
    //     user.breed,

    //   )
    // } catch (error) {}

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        storage()
          .ref(image)
          .putFile(image)
          .then(uri => console.log(uri));
        Preference.setWhiteList([]);
        Preference.set('userID', res.user.uid);
        navigation.navigate('MainStack');
        const ref = firestore().doc(`users/${res.user.uid}`);
        // console.log(res);
        ref.set({
          id: res.user.uid,
          user_type: title,
          first_name: firstName,
          last_name: lastName,
          phone_number: phone,
          breed: breed,
          email: email,
          checked: checked,
          city: city,
          province: province,
          image: image,
        });
        // ref.add({
        //   id: res.user.uid,
        //   user_type: title,
        //   first_name: firstName,
        //   last_name: lastName,
        //   phone_number: phone,
        //   breed: breed,
        //   email: email,
        //   checked: checked,
        //   city: city,
        //   province: province,
        //   image: image,
        // });
        console.log(res);
      })
      .catch(e => {
        setError('The email address is already in use by another account.');
        setTimeout(() => {
          setError('');
        }, 2000);
      })
      .finally(() => {
        setLoader(false);
      });
    // console.log(
    //   title,
    //   firstName,
    //   lastName,
    //   phone,
    //   breed,
    //   email,
    //   password,
    //   confirmPassword,
    //   checked,
    //   city,
    //   province,
    // );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <CustomText
            label="Create Account"
            fontFamily={fonts.semiBold}
            marginTop={verticalScale(10)}
            container={{marginHorizontal: scale(20)}}
            textStyle={{fontSize: 25, lineHeight: 38}}
          />
          <CustomText
            label={'Continue with your ' + title}
            marginTop={verticalScale(10)}
            container={{marginHorizontal: scale(20)}}
            textStyle={{fontSize: 15, lineHeight: 22}}
          />
          <View style={styles.avatarContainer}>
            <View style={styles.avatarview}>
              {image.length == 0 ? (
                loadingProfile ? (
                  <ActivityIndicator size="small" color={colors.purple} />
                ) : getImageUrl.length == 0 ? (
                  <Person
                    name="person-add-alt-1"
                    size={30}
                    color={colors.primary}
                    onPress={() => setModal(true)}
                  />
                ) : (
                  <Image
                    source={{uri: getImageUrl}}
                    style={{height: 80, width: 80, borderRadius: 50}}
                  />
                )
              ) : (
                <Image
                  source={{uri: image}}
                  style={{height: 80, width: 80, borderRadius: 50}}
                />
              )}
            </View>
          </View>
          <View
            style={{marginHorizontal: scale(20), marginTop: verticalScale(10)}}>
            {SignupData2.map(item => {
              return (
                <CustomInput
                  key={item.id}
                  placeholder={item.placeholder}
                  borderWidth={-1}
                  backgroundColor="#e8e8e8"
                  marginBottom={10}
                  borderRadius={moderateScale(50)}
                  leftIcon={true}
                  family={item.family}
                  name={item.name}
                  value={item.value}
                  onChangeText={item.onchangeText}
                  size={14}
                  placeholderTextColor={colors.boxColor}
                />
              );
            })}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText
                label="Gender:"
                color={colors.primary}
                fontSize={12}
              />
              <RadioButton
                value="male"
                status={checked === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('male')}
                color={colors.primary}
              />
              <CustomText label="Male" marginRight={scale(10)} />
              <RadioButton
                value="female"
                status={checked === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('female')}
                color={colors.primary}
              />

              <CustomText label="Female" />
            </View>
            {SignupData.map(item => {
              return (
                <CustomInput
                  key={item.id}
                  placeholder={item.placeholder}
                  borderWidth={-1}
                  backgroundColor="#e8e8e8"
                  marginBottom={10}
                  value={item.value}
                  onChangeText={item.onchangeText}
                  borderRadius={moderateScale(50)}
                  leftIcon={true}
                  keyboardType={item.keyboardType}
                  family={item.family}
                  secureTextEntry={item.secureTextEntry}
                  name={item.name}
                  size={14}
                  placeholderTextColor={colors.boxColor}
                />
              );
            })}
          </View>
          {error.length ? (
            <CustomText
              label={error}
              color={colors.red}
              textStyle={{marginLeft: scale(20)}}
            />
          ) : (
            <View />
          )}
          <LinearGradientBtn
            title="Register"
            alignSelf="center"
            borderRadius={moderateScale(30)}
            onPress={validate}
            loading={loader}
          />
          <View style={styles.footerContainer}>
            <CustomText label="Already Have an Account" color="#c8c8c8" />
            <CustomText
              label="Login"
              fontSize={12}
              marginLeft={scale(5)}
              color={colors.blue}
              onPress={() => navigation.navigate('login')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText
              label="Upload Photo"
              fontSize={moderateScale(17)}
              marginBottom={verticalScale(10)}
            />
            <LinearGradientBtn
              title="Take Photo"
              alignSelf="center"
              onPress={openCamera}
              marginBottom={verticalScale(10)}
            />
            <LinearGradientBtn
              title="Choose Form Library"
              alignSelf="center"
              onPress={pickPicture}
              marginBottom={verticalScale(10)}
            />
            <LinearGradientBtn
              title="Cancel"
              alignSelf="center"
              onPress={() => setModal(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Register;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(15),
  },
  avatarBox: {
    height: verticalScale(55),
    width: scale(55),
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100@msr',
  },
  avatarview: {
    borderColor: colors.boxColor,
    borderStyle: 'dotted',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    paddingVertical: verticalScale(20),
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
