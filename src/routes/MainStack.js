import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Main/Home';
import colors from '../util/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Icons from '../common/components/Icons';
import CustomText from '../common/components/CustomText';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Map from '../screens/Main/Map';
import CustomDrawer from '../common/components/CustomDrawer';
import Message from '../screens/Main/Message';
import Conversation from '../screens/Main/Conversion';
import Profile from '../screens/Main/Profile';
import Launches from '../screens/Main/Launches';
import Post from '../screens/Main/Post';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Home3 = () => {
  return (
    <SafeAreaView>
      <CustomText label="Home3" />
    </SafeAreaView>
  );
};
const Home4 = () => {
  return (
    <SafeAreaView>
      <CustomText label="Home4" />
    </SafeAreaView>
  );
};
const MyCart = () => {
  return (
    <SafeAreaView>
      <CustomText label="MyCart" />
    </SafeAreaView>
  );
};
const ChangePassword = () => {
  return (
    <SafeAreaView>
      <CustomText label="ChangePassword" />
    </SafeAreaView>
  );
};
const Settings = () => {
  return (
    <SafeAreaView>
      <CustomText label="Settings" />
    </SafeAreaView>
  );
};
const OrderHistory = () => {
  return (
    <SafeAreaView>
      <CustomText label="OrderHistory" />
    </SafeAreaView>
  );
};
const UpcomingOrders = () => {
  return (
    <SafeAreaView>
      <CustomText label="UpcomingOrders" />
    </SafeAreaView>
  );
};
const DeliveryAddress = () => {
  return (
    <SafeAreaView>
      <CustomText label="DeliveryAddress" />
    </SafeAreaView>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55,
          backgroundColor: colors.blue,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="home1"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons
                family="MaterialCommunityIcons"
                name="shopping-search"
                color={color}
                size={size}
              />
              <CustomText label="Shop" color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="home2"
        component={Launches}
        options={{
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons family="Entypo" name="shop" color={color} size={size} />
              <CustomText label="Launches" color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="home3"
        component={Map}
        options={{
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons
                family="Entypo"
                name="location-pin"
                color={color}
                size={size}
              />
              <CustomText label="My Trails" color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="home4"
        component={Post}
        options={{
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons
                family="MaterialCommunityIcons"
                name="shoe-sneaker"
                color={color}
                size={size}
              />
              <CustomText label="Book Walk" color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="home5"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons
                family="Ionicons"
                name="md-people-circle"
                color={color}
                size={size}
              />
              <CustomText label="My EVURO" color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const MessageStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Message">
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};
const MainStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{drawerType: 'slide'}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{headerShown: false}}
        component={BottomTab}
      />
      <Drawer.Screen name="screen2" component={MyCart} />
      <Drawer.Screen name="screen3" component={ChangePassword} />
      <Drawer.Screen name="screen4" component={Settings} />
      <Drawer.Screen name="screen5" component={OrderHistory} />
      <Drawer.Screen name="screen6" component={UpcomingOrders} />
      <Drawer.Screen
        name="screen8"
        component={MessageStack}
        options={{headerTitle: 'Message'}}
      />

      <Drawer.Screen name="screen7" component={DeliveryAddress} />
    </Drawer.Navigator>
  );
};

export default MainStack;
