import { FlatList, ImageBackground, ScrollView, View } from 'react-native';
import React, { useMemo } from 'react';
import {
  CustomText,
  MainWrapper,
  ProductDetail,
  ProductQuantity,
  GoBackIcon,
  CustomButton,
  RatingCard,
} from '../../../components/index';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../../assets/fonts';
import { useSpecificProductDetailStyle } from './style';
import { metrics } from '../../../util/metrics';
import {
  useAppDispatch,
  useAppSelector,
  useGetImageUrlQuery,
  useGetProductsQuery,
} from '@evuro-frontend/store';
import {
  addtoCart,
  decreaseCartItemQuantity,
  hideCartIcon,
  increaseCartItemQuantity,
  removeCartItem,
  resetCartItemQuantity,
} from '../../../../../../libs/store/src/lib/slices/user/cart.slice';
import { Colors } from '@evuro-frontend/assets';

const SpecificProductDetail = ({ route }) => {
  const specificItem = route?.params?.specificItem;
  const index = route?.params?.index;
  const cart = useAppSelector((state) => state.cart);
  const { data } = useGetImageUrlQuery(specificItem?.productImage);
  const { data: productData } = useGetProductsQuery(specificItem?._id);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const styles = useSpecificProductDetailStyle();

  const cartItem = cart.find((item) => item._id === specificItem._id);
  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const extendPrice = useMemo(() => {
    // const quantity = Number(cart[index]?.quantity);
    // const price = Number(cart[index]?.price);

    // const validQuantity =
    //   isNaN(quantity) || quantity === undefined ? 1 : quantity;
    // const validPrice =
    //   isNaN(price) || price === undefined ? specificItem?.price : price;

    return initialQuantity * specificItem?.price;
  }, [initialQuantity, specificItem?.price]);

  const onIncreasePress = () => {
    if (initialQuantity < specificItem?.quantity) {
      dispatch(addtoCart(specificItem));
    }
  };

  const onDecreasePress = () => {
    if (cartItem?.quantity > 1) {
      dispatch(removeCartItem(specificItem));
    }
  };

  const DropInCart = () => {
    const checkExistItem = cart.find((item) => item._id == specificItem._id);

    if (checkExistItem) {
      // showToast('info', `This item already dispatched`);
      navigation.navigate('AddtoCart', {
        productImage: data?.data,
        itemID: specificItem?._id,
      });
    } else {
      dispatch(addtoCart(specificItem));
      dispatch(hideCartIcon(specificItem._id));
      navigation.navigate('AddtoCart', {
        productImage: data?.data,
        itemID: specificItem?._id,
      });
    }
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ marginTop: metrics.height(30), alignItems: 'center' }}>
        <CustomText
          label="Data not found"
          color={Colors.red}
          fontSize={15}
          fontFamily={Fonts.Medium}
        />
      </View>
    );
  };
  return (
    <MainWrapper headerShown={false} paddingHorizontal={-1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          resizeMode="cover"
          source={{ uri: data?.data }}
          style={styles.img}
        >
          <View
            style={{
              marginLeft: metrics.width(10),
              marginTop: metrics.height(10),
            }}
          >
            <GoBackIcon
              onBackPress={() => {
                navigation.goBack();
                dispatch(resetCartItemQuantity(specificItem));
              }}
            />
          </View>
        </ImageBackground>

        <View style={styles.mainContainer}>
          <CustomText
            label="Product Quantity"
            fontSize={20}
            fontFamily={Fonts.Medium}
          />
          {/* {console.log('cart[index]?.qty', cart[index]?.qty)} */}
          <ProductQuantity
            count={initialQuantity}
            price={`$${extendPrice}`}
            onIncreasePress={onIncreasePress}
            onDecreasePress={onDecreasePress}
          />

          <ProductDetail
            label={specificItem.productName}
            detail={specificItem.productDescription}
            checkBox={false}
          />

          <CustomText
            label="Most popular"
            fontSize={20}
            fontFamily={Fonts.Medium}
            marginTop={metrics.height(20)}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={styles.contentContainerStyle}
            data={productData?.data?.mostPopular}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              // console.log('item===', item);

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
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={DropInCart}
          title="Drop in Bag"
          borderRadius={100}
        />
      </View>
    </MainWrapper>
  );
};

export default SpecificProductDetail;
