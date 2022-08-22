import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from '../screens/Auth/OnBoarding';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Option from '../screens/Auth/Option';
import Otp from '../screens/Auth/Otp';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="onboarding" component={OnBoarding} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
      <Stack.Screen name="option" component={Option} />
      <Stack.Screen name="otp" component={Otp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
