import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useWalkCardStyle } from '../style';
import CustomImage from '../base/CustomImage';
import CustomText from '../base/CustomText';
import { Fonts } from '../../assets/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Colors } from '@evuro-frontend/assets';
import moment from 'moment';
import {
  useAppSelector,
  useGetTalentsQuery,
  useToggleFavoriteTalentMutation,
} from '@evuro-frontend/store';
import { showToast } from '../base/CustomToast';
import { metrics } from '../../util/metrics';
import DeviceInfo from 'react-native-device-info';

const WalkCard = ({
  data,
  walkHistoryData,
  liked,
  handleSearchData,
  ItemID,
  favoriteID,
  width,
  isMyPets,
  activeTab,
}) => {
  // console.log('data====', data);

  const status = data?.availability;
  const isTablet = DeviceInfo.isTablet();
  const { loginData } = useAppSelector((state) => state.user);
  // console.log('loginData===', loginData?.data?.userType);
  const userType = loginData?.data?.userType;

  const textArray = [
    {
      id: 1,
      title: isMyPets?.petName,
    },
    {
      id: 2,
      title: `Size : ${isMyPets?.size}`,
    },
    // {
    //   id: 3,
    //   title: 'Weight : 5kg',
    // },
    {
      id: 4,
      title: isMyPets?.gender,
    },
    {
      id: 5,
      title: `Age : ${isMyPets?.age} Year`,
    },
  ];

  const {
    data: getTalentsData,
    isLoading: talentsLoading,
    refetch,
  } = useGetTalentsQuery(null);
  const [setFavoriteTalent, { isLoading: favoriteLoading }] =
    useToggleFavoriteTalentMutation();

  const navigation = useNavigation();
  const styles = useWalkCardStyle({ width });
  const isFocused = useIsFocused();

  const [walkHistory, setWalkHistory] = useState({});
  const [totalFee, setTotalFee] = useState(0);
  // console.log('totalFee===', walkHistory?.schedule?.totalFee);

  useEffect(() => {
    refetch();
  }, [isFocused, getTalentsData]);

  useEffect(() => {
    try {
      setWalkHistory({ ...data, schedule: data?.schedule });
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  }, []);

  useEffect(() => {
    walkHistory?.schedule?.days?.forEach((item, index) => {
      setTotalFee(item?.fee);
    });
  }, [walkHistory]);

  const handleHeart = async () => {
    if (liked === true) {
      showToast('success', 'Remove from wishlist success');
      await setFavoriteTalent(
        handleSearchData?.data ? item?._id : favoriteID ? favoriteID : ItemID
      );
      refetch();
    } else {
      showToast('success', 'Add to wishlist success');
      await setFavoriteTalent(handleSearchData?.data ? item?._id : ItemID);
      refetch();
    }
  };
  // console.log('=========================================');
  // console.log('data===', data);
  // console.log('=========================================');

  // console.log('activeTab===', activeTab);

  const handleOnPress = () => {
    if (activeTab === 1 || activeTab === 2 || activeTab === 3) {
      navigation.navigate('ConfirmWalk', {
        reviewConfirmWalkData: data,
        isStatusChange: activeTab,
      });
      // navigation.navigate('LocateWalker', {
      //   ownerData: data?.dogOwner,
      // });
    } else if (walkHistoryData || activeTab === 0) {
      navigation.navigate('ConfirmWalk', {
        reviewConfirmWalkData: data,
        isStatusChange: activeTab,
      });
    } else if (isMyPets) {
      alert('Comming Soon...');
    } else {
      navigation.navigate('SpecificDogWalkerDetail', {
        data,
        liked,
      });
    }
  };

  // console.log('data?.pets===', data?.pets);
  const res = data?.pets?.reduce((item) => ({
    petName: item?.petName,
  }));

  // console.log('res===', data?.pets);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOnPress}
      style={styles.mainContainer}
    >
      <View style={styles.imgContainer}>
        {walkHistoryData ? (
          <>
            {data?.pets?.map((item, index) => {
              return (
                <CustomImage
                  key={index}
                  useModel={false}
                  isUser
                  url={item?.image[0]}
                  style={styles.image}
                />
              );
            })}
          </>
        ) : (
          <CustomImage
            useModel={false}
            isUser
            url={isMyPets?.image ? isMyPets?.image : data?.profileImage}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.cardContent}>
        {isMyPets ? (
          <>
            {textArray.map((item, index) => {
              return (
                <View key={item.id}>
                  <CustomText
                    label={item.title}
                    fontSize={index === 0 ? 15 : 12}
                    fontFamily={index === 0 ? Fonts.Medium : Fonts.Regular}
                    color={index === 0 ? Colors.black : Colors.darkGray}
                  />
                </View>
              );
            })}
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: status === true ? 'green' : 'red',
                height: metrics.width(15),
                width: metrics.width(15),
                borderRadius: 50,
                position: 'absolute',
                zIndex: 1,
                right: metrics.width(17),
                top: metrics.height(10),
              }}
            />
            <CustomText
              label={walkHistoryData ? res?.petName : data?.name}
              fontFamily={Fonts.Medium}
              fontSize={14}
              containerStyle={styles.containerStyle}
            />
            <CustomText
              label={
                walkHistoryData
                  ? `Duration: ${moment(
                      walkHistory?.schedule?.startDate
                    ).format('DD-MM-YYYY')} To ${moment(
                      walkHistory?.schedule?.endDate
                    ).format('DD-MM-YYYY')}`
                  : `Experience : 4 Year`
              }
              fontFamily={Fonts.Regular}
              color={Colors.darkGray}
            />
            <View style={styles.locationContainer}>
              <CustomText
                label={
                  walkHistoryData
                    ? `Price: $${
                        totalFee === 0
                          ? '00'
                          : Number.isInteger(totalFee)
                          ? walkHistory?.schedule?.totalFee
                          : totalFee.toFixed(2)
                      }/hr`
                    : ``
                }
                fontFamily={Fonts.Regular}
                color={Colors.darkGray}
              />
              {!walkHistoryData && (
                <EvilIcon name={'location'} size={16} color={Colors.red} />
              )}
            </View>
            {!walkHistoryData && (
              <>
                <CustomText
                  label={'Male'}
                  color={Colors.darkGray}
                  fontFamily={Fonts.Regular}
                />

                <TouchableOpacity
                  onPress={handleHeart}
                  style={styles.likeButton}
                >
                  <AntDesign
                    name={liked === true ? 'heart' : 'hearto'}
                    size={metrics.width(16)}
                    color={liked === true ? 'red' : 'black'}
                  />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default WalkCard;
