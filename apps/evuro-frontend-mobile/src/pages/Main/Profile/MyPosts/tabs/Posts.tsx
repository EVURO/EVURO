import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { usePostsStyle } from '../style';
import CustomImage from '../../../../../components/base/CustomImage';
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useGetPostsQuery } from '@evuro-frontend/store';
import { Colors } from '@evuro-frontend/assets';
import { CustomText } from 'apps/evuro-frontend-mobile/src/components';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';

const Posts = ({ id }) => {
  const navigation = useNavigation();

  const styles = usePostsStyle();

  const { data, isLoading, error, refetch } = useGetPostsQuery({ id });

  const postsData = data?.data || [];

  const ImageCard = ({ item, style }) => {
    const randomNum = useMemo(
      () => Math.floor(Math.random() * 5) * 23 + 110,
      []
    );

    return (
      <TouchableOpacity
        key={item?.id}
        style={[
          {
            marginTop: 2,
            height: randomNum,
            backgroundColor: Colors.lightGray,
            alignSelf: 'stretch',
            borderRadius: 8,
          },
          style,
        ]}
        onPress={() => {
          if (item?.url?.length > 0) {
            // console.log('item======', item);
            navigation.navigate('Posts', {
              data: postsData,
              initial: item,
              isCreatedPost: true,
            });
          }
        }}
        activeOpacity={0.7}
      >
        {item?.url?.length > 0 ? (
          <CustomImage
            url={item?.url[0]}
            style={{
              height: randomNum,
              backgroundColor: Colors.lightGray,
              alignSelf: 'stretch',
              borderRadius: 8,
            }}
          />
        ) : (
          <View />
        )}
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, i }) => {
    return <ImageCard item={item} style={{ margin: 2 }} />;
  };

  return (
    <View style={styles.container}>
      <MasonryList
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{
          paddingHorizontal: 2,
          alignSelf: 'stretch',
        }}
        onEndReached={() => console.log('onEndReached')}
        numColumns={3}
        data={postsData}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: metrics.height(40) }}>
            {isLoading ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <CustomText
                label="No posts found"
                color={Colors.red}
                fontSize={18}
              />
            )}
          </View>
        }
      />
    </View>
  );
};

export default Posts;
