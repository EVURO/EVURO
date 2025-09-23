import { Alert, View } from 'react-native';
import React, { useCallback } from 'react';
import {
  CustomHeader,
  EvuroOptions,
  MainWrapper,
} from '../../../../components/index';
import { Svgs } from '@evuro-frontend/assets';
import { useSettingStyle } from './style';
import { useAppSelector } from '@evuro-frontend/store';
import { useNavigation } from '@react-navigation/native';
import { useDeleteUser } from '@evuro-frontend/validators';

const Setting = () => {
  const { loginData } = useAppSelector((state) => state.user);

  const userType = loginData?.data?.userType;

  const { deleteUserAsync, isLoading: deleteLoading } = useDeleteUser();
  const navigation = useNavigation();
  const styles = useSettingStyle();

  const handleDeleteAccount = useCallback(async () => {
    try {
      const res = await deleteUserAsync();
      console.log('res======', res);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('error=====', error);
    }
  }, [deleteUserAsync]);

  const handleDelete = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            handleDeleteAccount();
          },
        },
      ]
    );
  };

  const array = [
    {
      id: 1,
      label: 'Edit Profile',
      onPress: () => {
        navigation.navigate('UpdateProfile');
      },
      iconName: Svgs.editProfile,
    },
    {
      id: 2,
      label: 'Edit Additional Info',
      onPress: () => {
        navigation.navigate('AdditionalInformation', { isUpdating: true });
      },
      iconName: Svgs.editProfile,
    },
    {
      id: 3,
      label: 'Delete Account',
      onPress: async () => {
        handleDelete();
      },
      iconName: Svgs.outlinedelete,
    },
    {
      id: 4,
      label: 'Change Password',
      onPress: () => {
        navigation.navigate('ChangePassword');
      },
      iconName: Svgs.padlock,
    },
    // {
    //   id: 5,
    //   label: 'Log out',
    //   onPress: handleLogout,
    //   iconName: Svgs.logout,
    // },
  ];

  return (
    <MainWrapper>
      <CustomHeader headerTitle="Setting" onBackHeader Spacer />
      {(userType === 'Talent'
        ? array
        : array.filter((item) => item.id !== 2)
      ).map((item) => {
        return (
          <View style={styles.container} key={item.id}>
            <EvuroOptions
              iconName={<item.iconName />}
              onPress={item.onPress}
              label={item.label}
            />
          </View>
        );
      })}
    </MainWrapper>
  );
};

export default Setting;
