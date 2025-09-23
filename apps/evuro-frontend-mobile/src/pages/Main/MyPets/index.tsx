import { ActivityIndicator, FlatList, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  CustomHeader,
  CustomText,
  MainWrapper,
  WalkCard,
} from '../../../components/index';
import { useGetPetsQuery } from '@evuro-frontend/store';
import { metrics } from '../../../util/metrics';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';

const MyPets = () => {
  const { data, refetch, isLoading } = useGetPetsQuery(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <MainWrapper paddingHorizontal={metrics.height(12)}>
      <CustomHeader onBackHeader headerTitle="My Pets" isAddPets />
      <FlatList
        contentContainerStyle={{
          paddingBottom: '25%',
          marginTop: metrics.height(20),
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        data={data?.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          //   console.log('item=====', item);

          return (
            <View style={{ marginVertical: metrics.height(13) }}>
              <WalkCard width="62%" isMyPets={item} />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <>
              {isLoading ? (
                <View
                  style={{
                    marginTop: metrics.height(30),
                    alignItems: 'center',
                  }}
                >
                  <ActivityIndicator color={Colors.darkBlue} size={30} />
                </View>
              ) : (
                <View
                  style={{
                    marginTop: metrics.height(30),
                    alignItems: 'center',
                  }}
                >
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
        }}
      />
    </MainWrapper>
  );
};

export default MyPets;
