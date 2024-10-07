import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CustomText,
  DogTrailer,
  Icons,
  MainWrapper,
  SearchInput,
  Spacer,
  WalkCard,
} from '.././../../components';
import { metrics, normalizeSize } from '../../../util/metrics';
import {
  useAppDispatch,
  useAppSelector,
  useGetFavoriteTalentsQuery,
  useGetProductsQuery,
  useGetTalentsQuery,
  useSearchDogWalkersMutation,
  useToggleFavoriteTalentMutation,
} from '@evuro-frontend/store';
import {
  addToFavorites,
  removeFromFavorites,
} from 'libs/store/src/lib/slices/user/favorite.Slice';
import { useBookWalkStyle } from './style';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';
import { Colors, Svgs } from '@evuro-frontend/assets';
import ListMap from './molecules';
import GooglePlacesInput from 'apps/evuro-frontend-mobile/src/components/base/GooglePlacesInput';
import GetMapMarkers from './Mapmolecules';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { handleLargerText } from 'apps/evuro-frontend-mobile/src/util/Halper';

const BookWalk = () => {
  const { data: productData, isLoading: productsLoading } =
    useGetProductsQuery(null);
  const {
    data: getTalentsData,
    isLoading: talentsLoading,
    refetch,
  } = useGetTalentsQuery(null);
  const [setFavoriteTalent, { isLoading: favoriteLoading }] =
    useToggleFavoriteTalentMutation();

  // console.log('getTalentsData==========', getTalentsData?.data);

  const navigation = useNavigation();
  const styles = useBookWalkStyle();
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.favorite);
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('list');
  const [address, setAddress] = useState<string>('');
  const [handleSearchData, setHandleSearchData] = useState([]);

  const { data: getFavoriteTalents } = useGetFavoriteTalentsQuery();
  const [setSearchTalent, { isLoading }] = useSearchDogWalkersMutation();

  // useEffect(() => {
  //   setFavs(favs.sort((a, b) => a.id - b.id));
  // }, [favs]);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = getTalentsData?.data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(getTalentsData?.data);
  }, [getTalentsData]);

  const handleLatLng = async (details: any) => {
    setAddress(details.formatted_address);

    if (details && details?.geometry && details?.geometry?.location) {
      const lat = details?.geometry?.location?.lat;
      const lng = details?.geometry?.location?.lng;

      const palyload = {
        latitude: Number(lat),
        longitude: Number(lng),
      };
      // console.log('palyload====', palyload);

      await setSearchTalent(palyload)
        .then((res) => {
          // console.log('res====', res);
          setHandleSearchData(res?.data);
        })
        .catch((error) => {
          console.log('error========', error);
        });
    } else {
      console.log('Invalid details object or missing location information');
    }
  };

  const isTablet = DeviceInfo.isTablet();

  return (
    <MainWrapper headerShown={false} paddingHorizontal={-1}>
      <View style={{ paddingHorizontal: metrics.width(20) }}>
        <GooglePlacesInput
          marginTop={80}
          position="absolute"
          zIndex={1}
          value={address}
          onChange={(address) => {
            setAddress(address);
            setAddress('');
            setHandleSearchData([]);
          }}
          // address={address}
          // setAddress={setAddress}
          onPress={(data, details) => {
            handleLatLng(details);
          }}
          borderColor={Colors.lightGray}
        />
        {/* <SearchInput value={search} onChangeText={handleSearch} /> */}

        <View>
          {productsLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              horizontal
              contentContainerStyle={{
                paddingTop: metrics.height(isTablet ? 50 : 70),
              }}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              data={productData?.data?.products}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{ marginLeft: metrics.width(index === 0 ? 0 : 20) }}
                  >
                    <DogTrailer
                      label={handleLargerText(item.productName, 7)}
                      image={item.productImage}
                      onPress={() => {
                        navigation.navigate('SpecificProductDetail', {
                          specificItem: item,
                          index: index,
                        });
                      }}
                    />
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>

      {/* {console.log('handleSearchData?.data=====', handleSearchData?.data)} */}

      {activeTab === 'list' ? (
        <>
          {talentsLoading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
              initialNumToRender={6}
              data={
                handleSearchData?.data ? handleSearchData?.data : filteredData
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                // console.log('item===', item?.talent?.availability);

                return (
                  <View style={styles.walkContainer}>
                    <WalkCard
                      data={handleSearchData?.data ? item : item?.talent}
                      handleSearchData={handleSearchData}
                      ItemID={item?.talent?._id}
                      liked={item.liked}
                    />
                  </View>
                );
              }}
              ListEmptyComponent={() => (
                <View style={styles.notFound}>
                  <CustomText
                    label="Data not found"
                    fontSize={15}
                    fontFamily={Fonts.Medium}
                    color={Colors.red}
                  />
                </View>
              )}
            />
          )}
        </>
      ) : filteredData?.length === 0 ||
        filteredData === undefined ||
        handleSearchData?.data?.length === 0 ? (
        <View style={styles.notFound}>
          <CustomText
            label="Data not found"
            fontSize={15}
            fontFamily={Fonts.Medium}
            color={Colors.red}
          />
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <View style={styles.innerMapContainer}>
            <GetMapMarkers
              handleSearchData={handleSearchData}
              filteredData={filteredData}
            />
          </View>
        </View>
      )}
      <ListMap setActiveTab={setActiveTab} activeTab={activeTab} />
    </MainWrapper>
  );
};

export default BookWalk;
