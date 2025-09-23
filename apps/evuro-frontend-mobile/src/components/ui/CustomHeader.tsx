import React, { FC } from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomText, GoBackIcon, Icons } from '../index';
import { Fonts } from '../../assets/fonts';
import { Colors, Images, Svgs } from '@evuro-frontend/assets';
import { useCustomHeaderStyle } from '../style';
import { metrics, normalizeSize } from '../../util/metrics';
import { useAppSelector } from '@evuro-frontend/store';
import CustomImage from '../base/CustomImage';
import { useNavigation } from '@react-navigation/native';
import colors from 'libs/assets/src/colors/colors';

interface CustomHeaderProps {
  onDelete?: () => void;
  onBackHeader: boolean;
  headerTitle?: string;
  showFavIcon?: boolean;
  liked?: boolean;
  handleFavourite?: () => void;
  paddingHorizontal?: number;
  backgroundColor?: string;
  onBackPress?: () => void;
  onDrawerPress?: () => void;
  onDrawer?: boolean;
  isTitle?: boolean;
  bellIcon?: boolean;
  WelcomeText?: boolean;
  isProfile?: boolean;
  isAddPets?: boolean;
  Spacer?: boolean;
  onIconPress?: () => void;
  isRightIcon?: boolean;
  tintColor?: string;
}

const CustomHeader: FC<CustomHeaderProps> = ({
  onDelete,
  onBackHeader,
  headerTitle,
  showFavIcon,
  liked,
  handleFavourite,
  paddingHorizontal,
  backgroundColor,
  onBackPress,
  onDrawerPress,
  onDrawer,
  isTitle,
  bellIcon,
  WelcomeText,
  isProfile,
  isAddPets,
  Spacer,
  onIconPress,
  isRightIcon,
  iconName,
  tintColor,
}) => {
  const { data } = useAppSelector((state) => state.user?.loginData);

  const styles = useCustomHeaderStyle();
  const navigation = useNavigation();

  return (
    <>
      {/* {!!WelcomeText && (
        <CustomText label="Welcome To scooperleash" fontSize={15} />
      )} */}

      <View
        style={{
          ...styles.mainContainer,
          paddingHorizontal: paddingHorizontal || 1,
          backgroundColor: backgroundColor || Colors.white,
          marginTop: metrics.height(WelcomeText ? 0 : 10),
        }}
      >
        {!!isTitle && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!!onDrawer && (
              <TouchableOpacity activeOpacity={0.6} onPress={onDrawerPress}>
                <Icons family="Ionicons" name="menu" size={metrics.width(30)} />
              </TouchableOpacity>
            )}

            <View>
              {!onBackHeader && (
                <View
                  style={{
                    marginLeft: onDrawer && metrics.width(20),
                  }}
                >
                  {!!WelcomeText && (
                    <CustomText label="Welcome To scooperleash" fontSize={15} />
                  )}

                  <CustomText
                    label="Evuro"
                    fontSize={25}
                    fontFamily={Fonts.Medium}
                    // marginLeft={onDrawer && metrics.width(20)}
                  />
                </View>
              )}
            </View>
          </View>
        )}
        {onBackHeader && (
          <View style={styles.headerContainer}>
            <GoBackIcon
              onBackPress={onBackPress}
              borderColor={Colors.lightGray}
              borderWidth={1}
            />

            <CustomText
              alignSelf="center"
              label={headerTitle}
              fontSize={20}
              fontFamily={Fonts.Medium}
              marginLeft={metrics.width(isAddPets ? 60 : 0)}
            />
            {onDelete && (
              <TouchableOpacity activeOpacity={0.6} onPress={onDelete}>
                <Svgs.DeleteIcon
                  height={metrics.width(25)}
                  width={metrics.width(25)}
                />
              </TouchableOpacity>
            )}

            {!!isRightIcon && (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={onIconPress}
                style={{
                  height: metrics.height(28),
                  width: metrics.width(28),
                  // backgroundColor: 'red',
                }}
              >
                <Image
                  source={iconName}
                  resizeMode="contain"
                  tintColor={tintColor}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
            )}

            {showFavIcon && (
              <TouchableOpacity activeOpacity={0.6} onPress={handleFavourite}>
                {liked ? (
                  <Svgs.HeartFilledRed
                    height={metrics.width(25)}
                    width={metrics.width(25)}
                  />
                ) : (
                  <Svgs.HeartOutlined
                    height={metrics.width(25)}
                    width={metrics.width(25)}
                  />
                )}
              </TouchableOpacity>
            )}

            {!!isAddPets && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddPets', {
                    addPets: true,
                  })
                }
                activeOpacity={0.6}
                style={styles.petsContainer}
              >
                <CustomText
                  label="Add Pets"
                  fontSize={13}
                  color={Colors.darkBlue}
                />
                <View style={styles.plusContainer}>
                  <Svgs.plus
                    width={metrics.width(15)}
                    height={metrics.width(15)}
                  />
                </View>
              </TouchableOpacity>
            )}
            {!!Spacer && <View style={{ width: '8%' }} />}
          </View>
        )}

        {isProfile && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!!bellIcon && (
              <TouchableOpacity style={{ marginRight: metrics.width(20) }}>
                <Svgs.NotificationBell
                  height={normalizeSize(Platform.OS === 'ios' ? 20 : 30)}
                  width={normalizeSize(Platform.OS === 'ios' ? 20 : 30)}
                />
                {/* <View
                  style={{
                    width: normalizeSize(Platform.OS === 'ios' ? 10 : 14),
                    height: normalizeSize(Platform.OS === 'ios' ? 10 : 14),
                    borderRadius: 50,
                    backgroundColor: Colors.activeStatus,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                /> */}
              </TouchableOpacity>
            )}

            {!onBackHeader && (
              <View style={styles.backButton}>
                {data?.profileImage ? (
                  <CustomImage
                    url={data?.profileImage}
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <Svgs.Profile
                    height={metrics.width(50)}
                    width={metrics.width(50)}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default CustomHeader;
