import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import {
  CustomText,
  SearchInput,
  MainWrapper,
  DogTrailer,
  ProductFeature,
  Spacer,
  showToast,
} from '../../../components/index';
import { metrics } from '../../../util/metrics';
import { Fonts } from '../../../assets/fonts';
import { usePetProductsStyle } from './style';
import { useNavigation } from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
  useGetImageUrlQuery,
  useGetProductsQuery,
  useGetTalentsQuery,
} from '@evuro-frontend/store';
import {
  addtoCart,
  hideCartIcon,
  CartItem,
} from 'libs/store/src/lib/slices/user/cart.slice';
import { Colors } from '@evuro-frontend/assets';
import { handleLargerText } from 'apps/evuro-frontend-mobile/src/util/Halper';

const itemsArray: CartItem[] = [
  {
    id: 1,
    foodName: 'Food Name',
    age: 'Age 1 year',
    price: '150',
    qty: 1,
    isChecked: false,
  },
  {
    id: 2,
    foodName: 'Food Name',
    age: 'Age 1 year',
    price: '200',
    qty: 1,
    isChecked: false,
  },
  {
    id: 3,
    foodName: 'Food Name',
    age: 'Age 1 year',
    price: '300',
    qty: 1,
    isChecked: false,
  },
];

const PetProducts: React.FC = () => {
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();
  const { data: getTalentsData } = useGetTalentsQuery();
  // console.log('getTalentsData========', getTalentsData?.data);

  // console.log('productData==============', productData);

  // useEffect(() => {
  //   refetch();
  // }, []);

  const cart = useAppSelector((state) => state.cart);
  // console.log('cart=====', cart);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const styles = usePetProductsStyle();
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState(productData?.data?.products);

  // console.log('productData?.data=====', filteredData);

  useEffect(() => {
    setFilteredData(productData?.data?.products || []);
  }, [productData]);

  const isIconHidden = (itemId: number): boolean =>
    cart.some((item) => item._id === itemId && item.hideIcon);

  const handleCart = (item, index: number): void => {
    console.log('item=======', item);

    const checkExistItem = cart.find((i) => i._id === item._id);
    // console.log('checkExistItem===', checkExistItem);

    if (checkExistItem) {
      showToast('info', `Item already in the cart`);
    } else {
      dispatch(addtoCart(item));
      showToast('success', 'Item has been dispatched');
      dispatch(hideCartIcon(item._id));
      navigation.navigate('AddtoCart', {
        itemID: item?._id,
      });
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (productData?.data) {
      const filtered = productData.data?.products.filter((item) =>
        item.productName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const ListEmptyComponent = () => {
    return (
      <>
        {isLoading ? (
          <View style={styles.notFound}>
            <ActivityIndicator color={Colors.darkBlue} size={30} />
          </View>
        ) : (
          <View style={styles.notFound}>
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

  return (
    <MainWrapper headerShown>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomText
          label="Find awesome products for pets"
          fontSize={25}
          width="70%"
          marginTop={metrics.height(10)}
        />

        <SearchInput value={search} onChangeText={handleSearch} />

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            data={getTalentsData?.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={useCallback(
              ({ item, index }) => {
                return (
                  <View
                    style={{ marginLeft: metrics.width(index === 0 ? 0 : 20) }}
                  >
                    <DogTrailer
                      label={handleLargerText(item?.talent?.name, 7)}
                      image={item?.talent?.profileImage}
                      onPress={() =>
                        navigation.navigate('SpecificDogWalkerDetail', {
                          data: item?.talent,
                        })
                      }
                    />
                  </View>
                );
              },
              [getTalentsData?.data]
            )}
          />
        </View>

        <CustomText
          label="Featured product"
          fontSize={20}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(20)}
        />
        <View>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={() => {
              return <View style={styles.productFooterContainer} />;
            }}
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={useCallback(
              ({ item, index }) => {
                return (
                  <View>
                    <ProductFeature
                      onCartPress={() => handleCart(item, index)}
                      onPress={() => {
                        // dispatch(addtoCart(item));
                        navigation.navigate('SpecificProductDetail', {
                          specificItem: item,
                          index: index,
                        });
                      }}
                      isDispatchItem={
                        cart.length === 0 ? false : isIconHidden(item?._id)
                      }
                      productName={item?.productName}
                      // age={item.age ? item.age : 'Age 1 year'}
                      price={`$${item?.price}`}
                      image={item?.productImage}
                    />
                  </View>
                );
              },
              [filteredData, cart]
            )}
          />
          {/* <Spacer /> */}
        </View>
      </ScrollView>
    </MainWrapper>
  );
};

export default PetProducts;
