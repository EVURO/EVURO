import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomHeader,
  MainWrapper,
  StatusTab,
} from 'apps/evuro-frontend-mobile/src/components';
import OrderListCard from './molecule/OrderListCard';
import { useGetMyOrdersMutation } from '@evuro-frontend/store';
import { useIsFocused } from '@react-navigation/native';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import CustomText from 'apps/evuro-frontend-mobile/src/components/ui/CustomText';
import { Colors } from '@evuro-frontend/assets';

const OrderList = () => {
  const [getMyOrder, { isLoading }] = useGetMyOrdersMutation();
  const [activeTab, setActiveTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (activeTab === 0) {
      getOrders('Pending');
    } else if (activeTab === 1) {
      getOrders('In Progress');
    } else {
      getOrders('Complete');
    }
  }, [activeTab, isFocused]);

  const getOrders = async (status) => {
    try {
      const res = await getMyOrder(status);
      // console.log('res=====', res);
      setOrders(res?.data?.data);
    } catch (error) {
      console.log('error====', error);
    }
  };

  const renderItem = useCallback(
    (item, index) => {
      return (
        <View style={{ marginTop: metrics.height(20) }}>
          <OrderListCard
            TrackNo={`Track No: ${item?.item?.TrackNo || 'None'}`}
            Status={item?.item?.status}
            orderDetails={item?.item?.orderDetails}
            PaymentStatus={item?.item?.paymentStatus}
            totalPrice={item?.item?.totalPrice}
          />
        </View>
      );
    },
    [orders]
  );

  return (
    <MainWrapper>
      <CustomHeader onBackHeader headerTitle="Order List" Spacer />
      <StatusTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isWalk={undefined}
        refetchData={undefined}
      />

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                marginTop: metrics.height(100),
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.darkBlue} size="large" />
              ) : (
                <CustomText
                  label="No Orders Found."
                  color={Colors.red}
                  fontSize={18}
                />
              )}
            </View>
          }
          keyExtractor={(item) => item?._id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: metrics.width(5),
            paddingBottom: '40%',
          }}
        />
      </View>
    </MainWrapper>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
