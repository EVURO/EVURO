import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import colors from '../../util/colors';
import Icons from './Icons';
import CustomText from './CustomText';
import auth from '@react-native-firebase/auth';
import {getSpecificeUser} from '../../firebase/firestore/users';
import Preference from 'react-native-preference';
import fonts from '../../assets/fonts';
const CustomDrawer = props => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const id = await Preference.get('userID');
      console.log('-------------------Id', id);
      const res = await getSpecificeUser(id);
      console.log('userRessssss', res);

      setUser(res);
      setLoading(false);
    };
    getData();
  }, []);
  const signOut = async () => {
    await auth().signOut();
    props.navigation.navigate('AuthStack', {screen: 'Login'});
  };
  const data = [
    {
      id: 1,
      text: 'My Cart',
      family: 'AntDesign',
      name: 'shoppingcart',
      onPress: () => props.navigation.navigate('screen2'),
    },
    {
      id: 2,
      text: 'Change Password',
      family: 'AntDesign',
      name: 'lock',
      onPress: () => props.navigation.navigate('screen3'),
    },
    {
      id: 3,
      text: 'Settings',
      family: 'AntDesign',
      name: 'setting',
      onPress: () => props.navigation.navigate('screen4'),
    },
    {
      id: 4,
      text: 'Order History',
      family: 'MaterialIcons',
      name: 'history',
      onPress: () => props.navigation.navigate('screen5'),
    },
    {
      id: 5,
      text: 'Upcoming Orders',
      family: 'MaterialCommunityIcons',
      name: 'clipboard-clock-outline',
      onPress: () => props.navigation.navigate('screen6'),
    },
    {
      id: 6,
      text: 'Delivery Address',
      family: 'Entypo',
      name: 'location',
      onPress: () => props.navigation.navigate('screen7'),
    },
    {
      id: 7,
      text: 'Message',
      family: 'AntDesign',
      name: 'message1',
      onPress: () => props.navigation.navigate('screen8'),
    },
    {
      id: 8,
      text: 'Logout',
      family: 'Entypo',
      name: 'log-out',
      onPress: () => {
        signOut();
        Preference.clear();
      },
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: colors.purple}}>
      <DrawerContentScrollView {...props}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <View style={styles.userContainer}>
            <Image
              source={{uri: user?.image}}
              style={{height: 70, width: 70, borderRadius: 50}}
            />
            <CustomText
              label={user?.first_name + ' ' + user?.last_name}
              color={colors.white}
              marginTop={verticalScale(10)}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={user?.email}
              color={colors.white}
              fontFamily={fonts.regular}
            />
          </View>
        )}

        <View style={styles.mainContainer}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.itemRows}
                key={index}
                activeOpacity={0.6}
                onPress={item.onPress}>
                <View style={styles.circle}>
                  <Icons
                    family={item.family}
                    name={item.name}
                    color={colors.white}
                    size={15}
                  />
                </View>
                <CustomText
                  label={item.text}
                  color={colors.white}
                  marginLeft={scale(15)}
                  fontSize={moderateScale(14)}
                  textStyle={styles.textStyle}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  mainContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(20),
  },
  itemRows: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(8),
  },
  circle: {
    height: 35,
    width: 35,
    backgroundColor: '#9F4C93',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    borderBottomWidth: 1,
    width: scale(130),
    borderColor: colors.white,
  },
  userContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.white,
    marginTop: verticalScale(5),
    paddingBottom: verticalScale(20),
  },
});
export default CustomDrawer;
