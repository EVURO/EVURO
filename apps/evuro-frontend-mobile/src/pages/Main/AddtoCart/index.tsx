import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  MainWrapper,
  ProductDetail,
  RatingCard,
  showToast,
} from '../../../components/index';
import { metrics } from '../../../util/metrics';
import { useAddtoCartStyle } from './style';
import {
  useAppDispatch,
  useAppSelector,
  useGetProductsQuery,
  usePlaceOrderMutation,
} from '@evuro-frontend/store';
import {
  addtoCart,
  deleteCartItem,
  removeCartItem,
  toggleItemCheck,
} from 'libs/store/src/lib/slices/user/cart.slice';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from '../../../assets/fonts';
import { useNavigation } from '@react-navigation/native';
import MostPopular from '../SpecificProductDetail/molecule';
import DeliveryCard from 'apps/evuro-frontend-mobile/src/components/ui/DeliveryCard';
import {
  clearOrders,
  placeOrder,
} from 'libs/store/src/lib/slices/user/placeOrder.Slice';

const AddtoCart = ({ route }) => {
  const productImage = route?.params?.productImage;
  const itemID = route?.params?.itemID;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const orders = useAppSelector((state) => state.order);

  const { isVisitor } = useAppSelector((state) => state.user);
  const { data: allProductData } = useGetProductsQuery();
  const { data: productData, isLoading } = useGetProductsQuery(itemID);
  // const [placeOrder, { isLoading: orderLoading }] = usePlaceOrderMutation();
  // console.log('productData===', allProductData?.data?.products);

  const styles = useAddtoCartStyle();

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let totalDeliveryFee = 0;
    let totalPrice = 0;
    let duration = 0;

    cart.forEach((item, index) => {
      totalDeliveryFee += item?.standardDelivery;
      totalPrice += item?.quantity * item?.price;

      if (item?.duration > duration) {
        duration = item?.duration;
      }
    });

    setDeliveryFee(totalDeliveryFee);
    setTotalPrice(totalPrice);
    setDuration(duration);
  }, [cart]);

  const textArray = [
    {
      id: 1,
      title: 'Total Items Price',
      value: `$${totalPrice}`,
    },
    {
      id: 2,
      title: 'Delivery Fee',
      value: `$${deliveryFee}`,
    },
    {
      id: 3,
      title: 'Total Payment',
      value: `$${totalPrice + deliveryFee}`,
    },
  ];

  const ListEmptyComponent = () => {
    return (
      <>
        {isLoading ? (
          <View style={styles.noData}>
            <ActivityIndicator color={Colors.darkBlue} size={30} />
          </View>
        ) : (
          <View style={styles.noData}>
            <CustomText
              label="Data not found"
              fontSize={15}
              fontFamily={Fonts.Medium}
              color={Colors.red}
            />
          </View>
        )}
      </>
    );
  };

  const ListFooterComponent = useCallback(() => {
    return (
      <>
        <View
          style={[
            styles.borderBottom,
            {
              borderBottomWidth: 1,
              marginTop: metrics.height(20),
            },
          ]}
        />

        <CustomText
          label="Most popular"
          fontSize={20}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(5)}
        />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.contentContainerStyle}
          data={productData?.data?.mostPopular}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.innerContainer}>
                <RatingCard
                  label={item?.product?.productName}
                  country={`$.${item?.product?.price}`}
                  productImage={item?.product?.productImage}
                  onPress={() =>
                    navigation.navigate('SpecificProductDetail', {
                      specificItem: item?.product,
                      index: index,
                    })
                  }
                />
              </View>
            );
          }}
        />

        <DeliveryCard deliveryFee={deliveryFee} daysDuration={duration} />

        <CustomText
          label="Order Summary"
          fontSize={20}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(25)}
        />
        {textArray.map((item) => {
          return (
            <View key={item.id} style={styles.textContainer}>
              <CustomText
                label={item.title}
                fontSize={15}
                fontFamily={Fonts.Medium}
                marginTop={metrics.height(15)}
              />
              <CustomText
                label={item.value}
                fontSize={15}
                fontFamily={Fonts.Medium}
                marginTop={metrics.height(15)}
              />
            </View>
          );
        })}

        <View style={styles.footerContainer} />
      </>
    );
  }, [textArray]);

  const handleDelete = () => {
    const checkedItems = cart.filter((item) => item.isChecked);
    if (checkedItems.length == 0) {
      showToast('info', 'Please select item');
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            checkedItems.forEach((item) => {
              dispatch(deleteCartItem(item._id));
              showToast('success', 'Delete Success');
            });
          },
        },
      ]);
    }
  };

  const selectedItems = cart.filter((item) => item.isChecked);

  const alreadyDispatchedItem = selectedItems.find((item) => {
    const itemID = item?._id;
    return orders?.orders?.some((order) => order._id === itemID);
  });

  const handlePlaceOrder = () => {
    if (isVisitor) {
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
    } else {
      if (alreadyDispatchedItem) {
        showToast('info', 'Item already dispatch');
        // dispatch(clearOrders());
        navigation.navigate('OrderDetails');
      } else {
        dispatch(placeOrder(selectedItems));
        selectedItems.forEach((item) => {
          dispatch(deleteCartItem(item._id));
        });
        navigation.navigate('OrderDetails');
      }
    }
  };

  return (
    <MainWrapper>
      <CustomHeader
        onBackHeader
        headerTitle="Cart"
        onDelete={() => handleDelete()}
      />

      <FlatList
        ListEmptyComponent={
          <View style={styles.noData}>
            <CustomText
              label="Cart is empty."
              color={Colors.red}
              fontSize={15}
              fontFamily={Fonts.Medium}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={cart.length == 0 ? null : ListFooterComponent}
        renderItem={({ item, index }) => {
          const allProductQuantities = allProductData?.data?.products;
          const initialQuantities = allProductQuantities?.map(
            (item) => item?.quantity || 0
          );

          const initialQuantity = initialQuantities[index];

          let unitPrice = 0;
          const quantity = item?.quantity;
          const price = item?.price;
          unitPrice += quantity * price;

          return (
            <View>
              <View
                style={[
                  styles.borderBottom,
                  {
                    borderBottomWidth: index == 0 ? -1 : 1,
                    marginTop: metrics.height(index == 0 ? 0 : 20),
                  },
                ]}
              />
              <ProductDetail
                label={item?.productName}
                detail={item?.productDescription}
                checkBox
                isChecked={item?.isChecked}
                onCheck={() => dispatch(toggleItemCheck(item?._id))}
                cartScreen
                count={item?.quantity}
                price={`$${unitPrice}`}
                onIncreasePress={() => {
                  if (quantity < initialQuantity) {
                    dispatch(addtoCart(item));
                  }
                }}
                onDecreasePress={() => {
                  if (item?.quantity > 1) {
                    dispatch(removeCartItem(item));
                  }
                }}
                image={item?.productImage}
                plusColor={
                  quantity < initialQuantity || quantity < 2
                    ? Colors.lightGray1
                    : Colors.black
                }
                disabledPlus={
                  quantity < initialQuantity || quantity < 2 ? true : false
                }
              />
            </View>
          );
        }}
      />

      <CustomButton
        disabled={selectedItems?.length > 0 ? false : true}
        onPress={handlePlaceOrder}
        title={`Check out: ${selectedItems?.length}`}
        marginTop={metrics.height(5)}
        marginBottom={metrics.height(10)}
        borderRadius={100}
      />
    </MainWrapper>
  );
};

export default AddtoCart;
