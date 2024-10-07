import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import {
  setShowDrawer,
  useAppDispatch,
  useAppSelector,
  useGetProductsQuery,
  useGetTalentsQuery,
} from '@evuro-frontend/store';
import {
  CustomHeader,
  CustomText,
  MainWrapper,
  RatingCard,
} from '../../../components/index';
import { Fonts } from '../../../assets/fonts';
import { useNavigation } from '@react-navigation/native';
import { metrics } from '../../../util/metrics';
import { useHomeStyle } from './style';
import { Colors } from '@evuro-frontend/assets';
import { handleLargerText } from 'apps/evuro-frontend-mobile/src/util/Halper';

const Home = () => {
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();
  const { data: getTalentsData, isLoading: talentsLoading } =
    useGetTalentsQuery();

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const value = await AsyncStorage.getItem('Auth');
  //       if (value !== null) {
  //         console.log('storage data', value);
  //       } else console.log('no data');
  //     } catch (error) {
  //       console.log('error getting data');
  //     }
  //   }
  //   fetchData();
  // }, []);

  const [rating, setRating] = useState(2.5);
  const navigation = useNavigation();
  const styles = useHomeStyle();
  const { loginData, tempImage, signUpData } = useAppSelector(
    (state) => state.user
  );
  // console.log('tempImage===', tempImage);

  const ListEmptyComponent = () => {
    return (
      <>
        {isLoading || talentsLoading ? (
          <View style={styles.epmtyComponent}>
            <ActivityIndicator color={Colors.darkBlue} size={30} />
          </View>
        ) : productData?.data?.length == 0 ||
          getTalentsData?.data?.length === 0 ||
          getTalentsData?.data === undefined ? (
          <View style={styles.epmtyComponent}>
            <CustomText
              label="Data not found"
              color={Colors.red}
              fontSize={15}
              fontFamily={Fonts.Medium}
            />
          </View>
        ) : null}
      </>
    );
  };

  // console.log('getTalentsData?.data========', getTalentsData?.data);

  return (
    <MainWrapper paddingHorizontal={-1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={{ width: '93%', alignSelf: 'center' }}>
          <CustomHeader
            isTitle
            isProfile
            bellIcon
            onDrawer
            onDrawerPress={() => dispatch(setShowDrawer(true))}
          />

          {/* <View style={styles.mainContainer}>
          <CustomText
            label="Evuro"
            fontSize={25}
            fontFamily={Fonts.Medium}
            marginTop={metrics.height(10)}
            marginBottom={-10}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            data={new Array(8).fill('')}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{ marginLeft: metrics.width(index === 0 ? 0 : 20) }}
                >
                  <DogTrailer label="Dog Trailer" />
                </View>
              );
            }}
          />
        </View> */}

          <View style={styles.borderBttom} />

          <CustomText
            label="Products"
            fontSize={20}
            fontFamily={Fonts.Medium}
            marginTop={metrics.height(20)}
          />

          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            initialNumToRender={5}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            data={productData?.data?.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={useCallback(
              ({ item, index }) => {
                return (
                  <RatingCard
                    onPress={() => {}}
                    source={{ uri: 'https://picsum.photos/id/237/200/300' }}
                    label={item?.productName || ''}
                    country={`$${item.price}`}
                    paddingHorizontal={metrics.width(10)}
                    marginLeft={metrics.width(index === 0 ? -7 : 0)}
                    setRating={setRating}
                    rating={rating}
                    productImage={item.productImage}
                    onPress={() =>
                      navigation.navigate('SpecificProductDetail', {
                        specificItem: item,
                        index: index,
                      })
                    }
                  />
                );
              },
              [productData?.data]
            )}
          />

          <CustomText
            label="Recommended Talents"
            fontSize={20}
            fontFamily={Fonts.Medium}
            marginTop={metrics.height(20)}
          />

          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            initialNumToRender={5}
            contentContainerStyle={styles.contentContainerStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            data={getTalentsData?.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={useCallback(
              ({ item, index }) => {
                // console.log('item====', item);

                const address = item?.talent?.address;

                // const addressParts = address?.split(', ');
                // const city = addressParts[1];
                // const country = addressParts?.slice(-1)[0];
                // const result = `${city}, ${country}`;

                return (
                  <View>
                    <RatingCard
                      onPress={() =>
                        navigation.navigate('SpecificDogWalkerDetail', {
                          data: item?.talent,
                        })
                      }
                      source={{ uri: 'https://picsum.photos/id/237/200/300' }}
                      label={handleLargerText(item?.talent?.name, 11)}
                      country={handleLargerText(address, 16)}
                      year={`Experience : ${item?.talent?.experience} Year`}
                      paddingHorizontal={metrics.width(10)}
                      marginLeft={metrics.width(index === 0 ? -7 : 0)}
                      setRating={setRating}
                      rating={item?.rating}
                      talentImage={item?.talent?.profileImage}
                      isTalents={true}
                      status={item?.talent?.availability}
                    />
                  </View>
                );
              },
              [getTalentsData?.data]
            )}
          />
        </View>
      </ScrollView>
    </MainWrapper>
  );
};

export default Home;
