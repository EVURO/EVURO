import { FlatList, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  CustomHeader,
  CustomText,
  MainWrapper,
  WalkCard,
} from '../../../../components/index';
import {
  useAppDispatch,
  useAppSelector,
  useGetFavoriteTalentsQuery,
  useToggleFavoriteTalentMutation,
} from '@evuro-frontend/store';
import { Fonts } from '../../.././../assets/fonts';
import { Colors } from '@evuro-frontend/assets';
import { useFavoriteStyle } from './style';
import { useNavigation } from '@react-navigation/native';
import { metrics } from '../../../../util/metrics';

const Favorite = () => {
  const { data: getFavoriteTalents, refetch } = useGetFavoriteTalentsQuery();
  const [setFavoriteTalent, { isLoading: favoriteLoading }] =
    useToggleFavoriteTalentMutation();

  useEffect(() => {
    refetch();
  }, []);

  // const fav = getFavoriteTalents?.data.some((fav) => {
  //   console.log('fav._id:', fav);
  // });
  // console.log('fav=======', fav);

  // console.log('getFavoriteTalent=', getFavoriteTalents.data);

  const styles = useFavoriteStyle();
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.favorite);
  const navigation = useNavigation();

  const ListEmptyComponent = () => {
    return (
      <View style={styles.notFound}>
        <CustomText
          label="Data not found"
          fontSize={15}
          fontFamily={Fonts.Medium}
          color={Colors.red}
        />
      </View>
    );
  };

  return (
    <MainWrapper paddingHorizontal={metrics.height(12)}>
      <CustomHeader headerTitle="My Faves" onBackHeader Spacer />

      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.contentContainerStyle}
        data={getFavoriteTalents?.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.walkContainer}>
              <WalkCard
                data={item?.talent}
                liked={true}
                favoriteID={item.talent?._id}
              />
            </View>
          );
        }}
      />
    </MainWrapper>
  );
};

export default Favorite;
