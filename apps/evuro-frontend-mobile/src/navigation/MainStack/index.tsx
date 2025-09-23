import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../pages/Main/Home';
import PetProducts from '../../pages/Main/PetProducts';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="HomeScreen" component={Home} /> */}
      {/* <Stack.Screen name="PetProducts" component={PetProducts} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
