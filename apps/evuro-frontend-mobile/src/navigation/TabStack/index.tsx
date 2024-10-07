import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  Animated,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomText } from '../../components';
import { metrics } from '../../util/metrics';
import { Fonts } from '../../assets/fonts';
import { Colors, Images } from '@evuro-frontend/assets';
import Home from '../../pages/Main/Home';
import PetProducts from '../../pages/Main/PetProducts';
import MyEvuro from '../../pages/Main/MyEvuro';
import BookWalk from '../../pages/Main/BookWalk';
import { useCustomTabBarStyle } from './style';
import HomeWalker from '../../pages/Walkerflow/HomeWalker';
import { useAppSelector } from '@evuro-frontend/store';
import WalkHistory from '../../pages/Main/WalkHistory';
import { useFocusEffect } from '@react-navigation/native';
import OrderList from '../../pages/Main/OrderList';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const styles = useCustomTabBarStyle();
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const { isVisitor } = useAppSelector((state) => state.user);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height,
          duration: event.duration,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          if (isVisitor) {
            return true;
          }
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [navigation])
  );

  const tabBarTranslateY = keyboardHeight.interpolate({
    inputRange: [0, metrics.height(80)],
    outputRange: [0, metrics.height(90)],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          shadowColor: '#000',
          elevation: 24,
          transform: [{ translateY: tabBarTranslateY }],
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        let label;

        if (options.tabBarLabel !== undefined) {
          label = options.tabBarLabel;
        } else if (options.title !== undefined) {
          label = options.title;
        } else {
          label = route.name;
        }

        const isFocused = state.index === index;

        // const onPress = () => {
        //   const event = navigation.emit({
        //     type: 'tabPress',
        //     target: route.key,
        //     canPreventDefault: true,
        //   });

        //   if (!isFocused && !event.defaultPrevented) {
        //     navigation.navigate(route.name);
        //   }
        // };

        const onPress = (route) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Product' || !isVisitor) {
              navigation.navigate(route.name);
            } else {
              Alert.alert('Login', 'Please login to access other tabs.', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Login',
                  onPress: () => {
                    navigation.navigate('LoginModal');
                  },
                },
              ]);
            }
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => onPress(route)}
            style={styles.innerContainer}
            key={route.key}
          >
            <View
              style={[
                styles.innerView,
                {
                  backgroundColor: isFocused ? Colors.darkBlue : Colors.white,
                },
              ]}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? Colors.white : Colors.black,
                })}

              <CustomText
                label={label}
                fontSize={label?.length > 10 ? 9 : 11}
                fontFamily={Fonts.Medium}
                color={isFocused ? Colors.white : Colors.black}
                marginTop={metrics.height(5)}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const TabStack = () => {
  const { loginData } = useAppSelector((state) => state.user);
  const userType = loginData.data?.userType;
  const { isVisitor } = useAppSelector((state) => state.user);

  console.log('user type========', userType);

  return (
    <Tab.Navigator
      initialRouteName={isVisitor ? 'Product' : 'Home'}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={userType === 'Dog Parent' ? Home : HomeWalker}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={Images.home}
                resizeMode="contain"
                style={{
                  height: metrics.width(30),
                  width: metrics.width(30),
                  tintColor: color,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={PetProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={Images.marketImage}
                resizeMode="contain"
                style={{
                  height: metrics.width(30),
                  width: metrics.width(30),
                  tintColor: color,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={userType === 'Dog Parent' ? 'Book a Walk' : 'Order'}
        component={userType === 'Dog Parent' ? BookWalk : WalkHistory}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={
                  userType === 'Dog Parent'
                    ? Images.footprintImage
                    : Images.order
                }
                resizeMode="contain"
                style={{
                  height: metrics.width(30),
                  width: metrics.width(30),
                  tintColor: color,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Evuro"
        component={MyEvuro}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={Images.userImage}
                resizeMode="contain"
                style={{
                  height: metrics.width(30),
                  width: metrics.width(30),
                  tintColor: color,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
