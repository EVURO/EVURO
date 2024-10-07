import { Alert, ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  CustomText,
  MainWrapper,
  EvuroOptions,
  CustomImage,
} from '../../../components/index';
import { Svgs } from '@evuro-frontend/assets';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Fonts } from '../../../assets/fonts';
import { metrics } from '../../../util/metrics';
import { useMyEvuroStyle } from './style';
import {
  setAdditionalInfoData,
  setLoginData,
  setToken,
  useAppDispatch,
  useAppSelector,
  useGetPostsQuery,
  useGetUsersQuery,
  useLogoutUserMutation,
} from '@evuro-frontend/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyEvuro = () => {
  const isFocused = useIsFocused();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.user?.loginData);

  const { data: useGetUsers, refetch } = useGetUsersQuery(data?._id);

  const status = useGetUsers?.data?.availability;

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const { data: posts } = useGetPostsQuery({});

  const postsData = posts?.data || [];

  const styles = useMyEvuroStyle();
  const navigation = useNavigation();

  const userType = data?.userType;

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          logout();
        },
      },
    ]);
  };
  const logout = async () => {
    await AsyncStorage.removeItem('isAuth');

    try {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

      const res = await logoutUser();
      console.log('res========', res);
      dispatch(setLoginData([]));
      dispatch(setToken(''));
      dispatch(setAdditionalInfoData({}));
    } catch (error) {
      console.log('error=========', error);
    }
  };

  const OwnerOptions = [
    {
      id: 1,
      label: 'My Post',
      onPress: () => navigation.navigate('Profile', { specificUser: data }),
      iconName: Svgs.postsBlack,
    },
    {
      id: 2,
      label: 'Settings',
      onPress: () => navigation.navigate('Setting'),
      iconName: Svgs.setting,
    },
    {
      id: 3,
      label: 'Favorite',
      onPress: () => navigation.navigate('Favorite'),
      iconName: Svgs.redheart,
    },
    {
      id: 4,
      label: 'My Pets',
      onPress: () => {
        navigation.navigate('MyPets');
      },
      iconName: Svgs.myPet,
    },
    // {
    //   id: 5,
    //   label: 'Launchpad',
    //   onPress: () => navigation.navigate('Launchpad'),
    //   iconName: Svgs.launch,
    // },
    {
      id: 6,
      label: 'Booking Walks History',
      onPress: () => navigation.navigate('WalkHistory'),
      iconName: Svgs.footprint,
    },
    {
      id: 7,
      label: 'Order History',
      onPress: () => alert('comming soon'),
      iconName: Svgs.bag,
    },
    {
      id: 8,
      label: 'Order List',
      onPress: () => navigation.navigate('OrderList'),
      iconName: Svgs.bag,
    },
    {
      id: 9,
      label: 'Live Map',
      onPress: () => {
        navigation.navigate('LiveMapRender');
      },
      iconName: Svgs.dogSmall,
    },
    {
      id: 10,
      label: 'Log out',
      onPress: handleLogout,
      iconName: Svgs.logout,
    },
  ];

  const WalkerOptions = [
    {
      id: 8,
      label: 'Status',
      iconName: Svgs.paw,
    },
    {
      id: 1,
      label: 'My Post',
      onPress: () => navigation.navigate('Profile', { specificUser: data }),
      iconName: Svgs.postsBlack,
    },
    {
      id: 2,
      label: 'Settings',
      onPress: () => navigation.navigate('Setting'),
      iconName: Svgs.setting,
    },
    {
      id: 3,
      label: 'Payment  Option',
      onPress: () => {},
      iconName: Svgs.payment,
    },
    {
      id: 4,
      label: 'Order History',
      onPress: () => {},
      iconName: Svgs.bag,
    },
    {
      id: 5,
      label: 'Shorts',
      onPress: () => navigation.navigate('MyShorts'),
      iconName: Svgs.shorts,
    },
    // {
    //   id: 6,
    //   label: 'Launchpad',
    //   onPress: () => navigation.navigate('Launchpad'),
    //   iconName: Svgs.launch,
    // },
    {
      id: 7,
      label: 'Booking Walk History',
      onPress: () => {
        navigation.navigate('WalkHistory');
      },
      iconName: Svgs.dogSmall,
    },
    {
      id: 9,
      label: 'Order List',
      onPress: () => navigation.navigate('OrderList'),
      iconName: Svgs.bag,
    },
    {
      id: 10,
      label: 'Log out',
      onPress: handleLogout,
      iconName: Svgs.logout,
    },
  ];

  const options = userType === 'Dog Parent' ? OwnerOptions : WalkerOptions;
  // const options = OwnerOptions;

  return (
    <MainWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: '30%' }}
      >
        <View style={styles.profileContainer}>
          <CustomText
            label="My Evuro"
            fontSize={20}
            fontFamily={Fonts.Medium}
            marginBottom={metrics.height(20)}
            marginTop={metrics.height(10)}
          />
          <View style={styles.imgContainer}>
            <CustomImage
              url={data?.profileImage}
              style={{ height: '100%', width: '100%' }}
            />
          </View>
          <CustomText
            label={data?.name ? data?.name : 'Dog Name'}
            fontSize={16}
            fontFamily={Fonts.Bold}
            marginTop={metrics.height(20)}
          />
        </View>

        {options.map((item, index) => {
          return (
            <View style={styles.innerContainer} key={item.id}>
              <EvuroOptions
                iconName={<item.iconName />}
                onPress={item.onPress}
                label={item.label}
                isToggleSwitch={
                  index === 0 && userType === 'Talent' ? true : false
                }
                index={index}
              />
            </View>
          );
        })}
      </ScrollView>
    </MainWrapper>
  );
};

export default MyEvuro;
