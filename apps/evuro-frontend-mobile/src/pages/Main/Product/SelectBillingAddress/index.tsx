import {
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AnimatedInput,
  CustomButton,
  CustomHeader,
  CustomText,
  Icons,
  MainWrapper,
  showToast,
} from '../../../../components';

import { useNavigation } from '@react-navigation/native';
import { metrics } from '../../../../util/metrics';

import { Fonts } from '../../../../assets/fonts';
import { Colors } from '@evuro-frontend/assets';
// import { useQueryClient } from '@reduxjs/toolkit/query/react';

import AddressCard from '../molecule';
import {
  setOrderAddress,
  useAppDispatch,
  useAppSelector,
  useDeleteUserAddressMutation,
  useGetUserAddressesQuery,
} from '@evuro-frontend/store';

const SelectBillingAddress = ({ route }) => {
  const { data: getUserAddress, isLoading: addressLoading } =
    useGetUserAddressesQuery(null);

  const { saveAddress } = useAppSelector((state) => state.user);

  const [deleteAddress, { isLoading }] = useDeleteUserAddressMutation();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (getUserAddress?.data?.addresses?.length === 1) {
      dispatch(setOrderAddress(getUserAddress?.data?.addresses[0]));
    }
  }, [getUserAddress]);

  const handleDeleteAddress = (id) => {
    Alert.alert(
      'Delete',
      `Are you sure sure you want to delete this address?`,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const res = await deleteAddress(id);

              if (saveAddress?._id == id) {
                dispatch(setOrderAddress({}));
              }

              console.log('res=====', res);

              res?.data?.message
                ? showToast('success', `${res?.data?.message}`)
                : showToast('error', 'something went wrong');
            } catch (error) {
              console.log('error==', error);
            }
          },
        },
      ]
    );
  };

  return (
    <MainWrapper>
      <CustomHeader onBackHeader headerTitle="Select Billing Address" Spacer />

      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: metrics.height(40),
                }}
              >
                {addressLoading ? (
                  <ActivityIndicator color={Colors.darkBlue} size="large" />
                ) : (
                  <CustomText
                    label="No address found"
                    fontSize={15}
                    color={Colors.red}
                    alignSelf="center"
                    marginTop={metrics.height(20)}
                  />
                )}
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '10%' }}
          data={getUserAddress?.data?.addresses}
          keyExtractor={(item, index) => item?._id}
          renderItem={({ item, index }) => {
            return (
              <AddressCard
                fullName={item?.name}
                address1={`${item?.billingAddress} ${item?.city} ${item?.state} ${item?.zipCode}`}
                address2={item?.deliveryAddress}
                mobileNo={`Contact No: ${item?.mobileNumber}`}
                title
                active={item?._id === saveAddress?._id}
                onCartPress={() => {
                  dispatch(setOrderAddress(item));
                  navigation.navigate('OrderDetails');
                }}
                onDeleteAddress={() => handleDeleteAddress(item?._id)}
                onEditAddress={() =>
                  navigation.navigate('BillingAddress', {
                    addressID: item?._id,
                  })
                }
                rightIcon={undefined}
                onIconPress={undefined}
              />
            );
          }}
        />
      </View>
      <CustomButton
        title="Add New Address"
        onPress={() => navigation.navigate('BillingAddress')}
        marginTop={metrics.height(5)}
        marginBottom={metrics.height(10)}
        borderRadius={100}
      />
    </MainWrapper>
  );
};

export default SelectBillingAddress;
