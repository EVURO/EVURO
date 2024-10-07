import {
  Alert,
  BackHandler,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  MainWrapper,
  showToast,
} from '../../../../components/index';
import { metrics } from '../../../../util/metrics';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { Fonts } from '../../../../assets/fonts/index';
import { useOrderDetailsStyle } from './style';
import AddressCard from '../molecule';
import CheckOutProducts from '../molecule/CheckOutProducts';
import {
  useAppDispatch,
  useAppSelector,
  useGetUserAddressesQuery,
  usePlaceOrderMutation,
} from '@evuro-frontend/store';
import { clearOrders } from '../../../../../../../libs/store/src/lib/slices/user/placeOrder.Slice';
import DeliveryCard from 'apps/evuro-frontend-mobile/src/components/ui/DeliveryCard';
import { handleLargerText } from 'apps/evuro-frontend-mobile/src/util/Halper';

const OrderDetails = () => {
  const { data } = useAppSelector((state) => state.user.loginData);
  const { saveAddress } = useAppSelector((state) => state.user);
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  // console.log('saveAddress=', saveAddress);

  const addressLength = Object?.keys(saveAddress)?.length;

  const orders = useAppSelector((state) => state.order);

  // const cart = useAppSelector((state) => state.cart);
  const navigation = useNavigation();
  const styles = useOrderDetailsStyle();
  const dispatch = useAppDispatch();

  const delivery = orders?.orders?.reduce(
    (acc, item) => {
      return {
        standardDelivery: item?.standardDelivery,
        receivedBy: item?.receivedBy,
        quantity: acc?.quantity + item?.quantity,
        price: parseFloat(item?.price),
      };
    },
    {
      standardDelivery: 0,
      receivedBy: null,
      quantity: 0,
      price: 0,
    }
  );

  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    let totalDeliveryFee = 0;

    orders?.orders?.forEach((item) => {
      totalDeliveryFee += item.standardDelivery;
    });

    setDeliveryFee(totalDeliveryFee);
  }, [orders?.orders]);

  // const deliveryFee = delivery?.standardDelivery;
  const totalItemsPrice = orders?.orders?.reduce((acc, item) => {
    return acc + item.quantity * parseFloat(item.price);
  }, 0);
  const totalPayment = totalItemsPrice + deliveryFee;

  const textArray = [
    {
      id: 1,
      title: 'Total Items Price',
      price: `$${totalItemsPrice}`,
    },
    {
      id: 2,
      title: 'Delivery Fee',
      price: `$${deliveryFee}`,
    },
    {
      id: 3,
      title: 'Total Payment',
      price: `$${totalPayment}`,
    },
  ];

  const ListHeaderComponent = () => {
    return (
      <>
        <View style={styles.deliverContainer}>
          <Svgs.Bus />
          <CustomText
            label={`Deliver to : ${data?.name || ''}`}
            fontSize={15}
            fontFamily={Fonts.Medium}
            marginLeft={metrics.width(10)}
          />
        </View>

        {addressLength === 0 ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('SelectBillingAddress')}
            style={styles.addAddress}
          >
            <CustomText
              label="Please Add Address"
              fontSize={15}
              fontFamily={Fonts.Medium}
              color={Colors.darkBlue}
              alignSelf="center"
            />
            <View style={styles.plusContainer}>
              <Svgs.plus height={metrics.width(15)} width={metrics.width(15)} />
            </View>
          </TouchableOpacity>
        ) : (
          <AddressCard
            address1={saveAddress?.billingAddress || ''}
            address2={saveAddress?.deliveryAddress || ''}
            mobileNo={`Contact No: ${saveAddress?.mobileNumber || ''}`}
            rightIcon
            onIconPress={() => navigation.navigate('SelectBillingAddress')}
          />
        )}
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        <View style={{ marginTop: metrics.height(20) }}>
          <DeliveryCard delivery={delivery} deliveryFee={deliveryFee} />
        </View>
        <CustomText
          label="Order Summary"
          fontSize={20}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(25)}
        />
        {textArray.map((item) => {
          return (
            <View key={item.id} style={styles.summaryContainer}>
              <CustomText
                label={item.title}
                fontSize={15}
                fontFamily={Fonts.Medium}
                marginTop={metrics.height(15)}
              />
              <CustomText
                label={item.price}
                fontSize={15}
                fontFamily={Fonts.Medium}
                marginTop={metrics.height(15)}
              />
            </View>
          );
        })}
      </>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ alignSelf: 'center', marginTop: metrics.height(20) }}>
        <CustomText label="Data Not found" color={Colors.red} fontSize={15} />
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          Alert.alert('Exit', 'Are you sure sure you want to exist', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                dispatch(clearOrders());
                navigation.navigate('TabStack', {
                  screen: 'PetProducts',
                });
              },
            },
          ]);
          return true;
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

  const onBackHandle = () => {
    Alert.alert('Exit', 'Are you sure sure you want to exist', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(clearOrders());
          navigation.navigate('TabStack', {
            screen: 'PetProducts',
          });
        },
      },
    ]);
  };

  const handlePlaceOrder = async () => {
    const payload = {
      orderDetails: orders?.orders?.map((item) => ({
        productId: item?._id,
        quantity: item?.quantity,
        price: item?.price,
      })),
      address: saveAddress?._id,
      totalPrice: String(totalPayment),
      paymentStatus: 'unpaid',
    };

    try {
      console.log('place order payload===========', payload);
      const res = await placeOrder(payload);
      console.log('place order api res=====', res);
      if (res?.error) {
        showToast(
          'error',
          res?.error?.data?.message
            ? res?.error?.data?.message
            : `Something went wrong`
        );
      } else {
        showToast('success', `${res?.data?.message}`);
        dispatch(clearOrders());
        navigation.navigate('TabStack', {
          screen: 'PetProducts',
        });
      }
    } catch (error) {
      console.log('error=====', error);
    }
  };

  return (
    <MainWrapper>
      <CustomHeader
        onBackHeader
        onBackPress={onBackHandle}
        headerTitle="Order Details"
        Spacer
      />

      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: metrics.height(20) }}
        data={orders?.orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          // console.log('item=====', item);

          return (
            <View key={index}>
              <CheckOutProducts
                imageName={item?.productImage}
                productName={item?.productName}
                discription={handleLargerText(item?.productDescription, 30)}
                productPrice={`Price : $${item?.price}`}
                quantity={`Qty:${item?.quantity}`}
                delivery={delivery}
              />
            </View>
          );
        }}
      />

      <CustomButton
        onPress={handlePlaceOrder}
        loading={isLoading}
        disabled={addressLength === 0 ? true : false}
        title={`Place Order : $${totalPayment}`}
        borderRadius={100}
        marginTop={metrics.height(10)}
        marginBottom={metrics.height(30)}
      />
    </MainWrapper>
  );
};

export default OrderDetails;
