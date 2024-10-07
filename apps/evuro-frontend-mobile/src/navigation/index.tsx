import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../pages/Auth/OnBoarding';
import WelcomeScreen from '../pages/Auth/Welcome';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import OTP from '../pages/Auth/OTP';
import ResetPassword from '../pages/Auth/ResetPassword';
import UserType from '../pages/Auth/UserType';
import AddPets from '../pages/Auth/Owner/AddPets';
import AdditionalInformation from '../pages/Auth/AdditionalInformation';
import TabStack from './TabStack';
import SpecificProductDetail from '../pages/Main/SpecificProductDetail';
import SpecificDogWalkerDetail from '../pages/Main/SpecificDogWalkerDetail';
import WalkPlanner from '../pages/Main/WalkPlanner';
import LocateWalker from '../pages/Main/LocateWalker';
import AddtoCart from '../pages/Main/AddtoCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from '../pages/Main/Profile/Setting';
import Favorite from '../pages/Main/Profile/Favorite';

import { View, ActivityIndicator } from 'react-native';
import MyShorts from '../pages/Main/MyShorts/Myshorts';
import VideoShorts from '../components/ui/videoShorts/VideoShorts';
import Profile from '../pages/Main/Profile/MyPosts';
import Posts from '../pages/Main/Posts';
import Launchpad from '../pages/Main/Profile/Lauchpad';
import CreatePost from '../pages/Main/Profile/MyPosts/CreatePost';
import ChangePassword from '../pages/Main/Profile/Setting/ChangePassword.tsx';
import ConfirmWalk from '../pages/Main/WalkPlanner/ConfirmWalk';
import { Colors } from '@evuro-frontend/assets';
import WalkHistory from '../pages/Main/WalkHistory';
import UpdateProfile from '../pages/Main/Profile/Setting/UpdateProfile';
import CreateShort from '../pages/Main/Profile/MyPosts/CreateShort';
import MyPets from '../pages/Main/MyPets';
import BillingAddress from '../pages/Main/Product/BillingAddress';
import SelectBillingAddress from '../pages/Main/Product/SelectBillingAddress';
import OrderDetails from '../pages/Main/Product/OrderDetails';
import OrderList from '../pages/Main/OrderList';
import LiveMapRender from '../pages/Main/LiveMap';
import { setShowDrawer, useAppDispatch } from '@evuro-frontend/store';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'AdditionalInformation'}
    >
      {/* --Common Screens-- */}
      <Stack.Screen name="initialScreen" component={InitialScreen} />

      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="UserTypeSelection" component={UserType} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VideoShorts" component={VideoShorts} />
      <Stack.Screen name="Launchpad" component={Launchpad} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="CreateShort" component={CreateShort} />
      <Stack.Screen name="Posts" component={Posts} />

      {/* --Parent Screens-- */}
      <Stack.Screen name="AddPets" component={AddPets} />
      <Stack.Screen name="MyPets" component={MyPets} />
      <Stack.Screen name="MyShorts" component={MyShorts} />
      <Stack.Screen name="WalkPlanner" component={WalkPlanner} />
      <Stack.Screen name="ConfirmWalk" component={ConfirmWalk} />
      <Stack.Screen name="WalkHistory" component={WalkHistory} />
      <Stack.Screen name="LocateWalker" component={LocateWalker} />

      {/* --Talent/Dog Walker screens-- */}
      <Stack.Screen
        name="AdditionalInformation"
        component={AdditionalInformation}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen
        name="SpecificProductDetail"
        component={SpecificProductDetail}
      />
      <Stack.Screen
        name="SpecificDogWalkerDetail"
        component={SpecificDogWalkerDetail}
      />

      <Stack.Screen name="AddtoCart" component={AddtoCart} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="BillingAddress" component={BillingAddress} />
      <Stack.Screen
        name="SelectBillingAddress"
        component={SelectBillingAddress}
      />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="LiveMapRender" component={LiveMapRender} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="LoginModal" component={Login} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const InitialScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const onNavigationHandle = async () => {
    try {
      const res = await AsyncStorage.getItem('isAuth');
      console.log('res', res);
      if (res) {
        dispatch(setShowDrawer(true));
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabStack' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnBoarding' }],
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    onNavigationHandle();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <ActivityIndicator size="large" color={Colors.lightGray} />}
    </View>
  );
};
export default Routes;
