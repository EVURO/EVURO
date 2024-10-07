import { StatusBar, View } from 'react-native';
import React, { useState } from 'react';
import {
  setShowDrawer,
  useAppDispatch,
  useGetPostsQuery,
} from '@evuro-frontend/store';
import Posts from '../../Main/Posts';
import CustomDrawer from 'apps/evuro-frontend-mobile/src/components/base/CustomDrawer';
import DrawerData from 'apps/evuro-frontend-mobile/src/components/base/DrawerData';
import { Colors } from '@evuro-frontend/assets';

const HomeWalker = () => {
  const { data } = useGetPostsQuery({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const postsData = data?.data || [];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.lightGray} barStyle="dark-content" />
      <Posts
        postsData={postsData}
        onDrawerPress={() => dispatch(setShowDrawer(true))}
      />
    </View>
  );
};

export default HomeWalker;
