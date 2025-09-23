import { SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import Icons from './Icons';
import { Fonts } from '../../assets/fonts';
import {
  setShowDrawer,
  useAppDispatch,
  useAppSelector,
} from '@evuro-frontend/store';
import CustomImage from './CustomImage';
import { useDrawerDataStyle } from '../style';
import { useNavigation } from '@react-navigation/native';

const DrawerData = ({ onClose }) => {
  const { data } = useAppSelector((state) => state.user.loginData);
  // console.log('data==', data.userType);

  const styles = useDrawerDataStyle();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.darkBlue} barStyle="light-content" />

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onClose}
        style={styles.iconContainer}
      >
        <Icons family="Entypo" name="cross" size={30} color={Colors.white} />
      </TouchableOpacity>

      <View style={styles.container}>
        {data?.profileImage ? (
          <View style={styles.imgContainer}>
            <CustomImage url={data?.profileImage} style={styles.img} />
          </View>
        ) : (
          <View />
        )}

        <View style={styles.txtContainer}>
          <CustomText
            label={data?.name}
            fontSize={20}
            color={Colors.white}
            fontFamily={Fonts.Medium}
          />
          <CustomText
            label={data?.email}
            fontSize={14}
            color={Colors.white}
            marginTop={metrics.height(3)}
          />
        </View>
      </View>

      <View style={styles.drawerTabsContainer}>
        <View style={styles.drawerRow1}>
          <View style={styles.firstTwoTabs}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Profile');
                dispatch(setShowDrawer(false));
              }}
              style={styles.tab1}
            >
              <CustomText
                label="Profile"
                color={Colors.black}
                fontFamily={Fonts.Medium}
                fontSize={18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Launchpad');
                dispatch(setShowDrawer(false));
              }}
              style={styles.tab2}
            >
              <CustomText
                label="Launchpad"
                color={Colors.black}
                fontFamily={Fonts.Medium}
                fontSize={18}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('VideoShorts', { allShorts: true });
              dispatch(setShowDrawer(false));
            }}
            style={styles.tab3}
          >
            <CustomText
              label="Reels"
              color={Colors.black}
              fontFamily={Fonts.Medium}
              fontSize={18}
            />
          </TouchableOpacity>
          <View style={styles.secondTwoTabs}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Setting');
                dispatch(setShowDrawer(false));
              }}
              style={styles.tab4}
            >
              <CustomText
                label="Settings"
                color={Colors.black}
                fontFamily={Fonts.Medium}
                fontSize={18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                alert('comming soon');
              }}
              style={styles.tab5}
            >
              <CustomText
                label="Club"
                color={Colors.black}
                fontFamily={Fonts.Medium}
                fontSize={18}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.thirdTwoTabs}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('TabStack', {
                screen: 'Product',
              });
              dispatch(setShowDrawer(false));
            }}
            style={styles.tab6}
          >
            <CustomText
              label="Scooperleashes"
              color={Colors.black}
              fontFamily={Fonts.Medium}
              fontSize={18}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Posts', { isJobPost: true });
              dispatch(setShowDrawer(false));
            }}
            style={styles.tab7}
          >
            <CustomText
              label={'Job Post'}
              color={Colors.black}
              fontFamily={Fonts.Medium}
              fontSize={18}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lastThreeTabs}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              alert('comming soon');
            }}
            style={styles.tab8}
          >
            <CustomText
              label={'Vendors'}
              color={Colors.black}
              fontFamily={Fonts.Medium}
              fontSize={18}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (data?.userType === 'Talent') {
                alert('comming soon');
              } else {
                navigation.navigate('Favorite');
                dispatch(setShowDrawer(false));
              }
            }}
            style={styles.tab9}
          >
            <CustomText
              label={
                data?.userType === 'Talent' ? 'Booking History' : 'Favourites'
              }
              color={Colors.black}
              fontFamily={Fonts.Medium}
              fontSize={16}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (data?.userType === 'Talent') {
                alert('comming soon');
              } else {
                navigation.navigate('TabStack', {
                  screen: 'Book a Walk',
                });
                dispatch(setShowDrawer(false));
              }
            }}
            style={styles.tab10}
          >
            <CustomText
              label={
                data?.userType === 'Talent' ? 'Payment option' : 'Dog Walkers'
              }
              color={Colors.black}
              fontFamily={Fonts.Medium}
              fontSize={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerData;
