import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  setShowDrawer,
  useAppDispatch,
  useAppSelector,
  useGetVideoUrlQuery,
} from '@evuro-frontend/store';
import LoadingModal from '../modal/LoadingModal';
import { useIsFocused } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import DrawerData from './DrawerData';
import Toast from 'react-native-toast-message';
import { toastConfig } from './CustomToast';

const BrainBox = ({ children }) => {
  const { data, refetch } = useGetVideoUrlQuery();
  // console.log('data====', data);

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const { isLoading, showDrawer } = useAppSelector((state) => state.user);

  return (
    <View style={styles.mainContainer}>
      {isLoading && <LoadingModal />}

      {showDrawer && (
        <CustomDrawer
          animationIn={'slideInLeft'}
          animationOut={'slideOutLeft'}
          backdropOpacity={0.4}
          isVisible={showDrawer}
        >
          <DrawerData onClose={() => dispatch(setShowDrawer(false))} />
        </CustomDrawer>
      )}

      {children}
      <Toast config={toastConfig} />
    </View>
  );
};

export default BrainBox;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
