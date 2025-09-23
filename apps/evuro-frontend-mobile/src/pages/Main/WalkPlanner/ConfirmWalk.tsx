import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  AnimatedInput,
  CustomButton,
  CustomText,
  Icons,
  MainWrapper,
  showToast,
} from '../../../components/index';
import { FlatList, Animated, ScrollView, View, Alert } from 'react-native';
import { metrics, normalizeSize } from '../../../util/metrics';
import CustomImage from '../../../components/base/CustomImage';
import { Colors } from '@evuro-frontend/assets';
import { Fonts } from '../../../assets/fonts';
import moment from 'moment';
import LocationSelection from './molecules/LocationSelection';
import RequirementsSelection from './molecules/RequirementsSelection';
import { useConfirmWalkPlannerStyle } from './style';
import {
  useAcceptOrRejectWalkerPlanMutation,
  useAppSelector,
  useCreatePetWalkerPlanMutation,
  useGetPetWalkerPlanQuery,
  useUpdateWalkerPlanStatusMutation,
} from '@evuro-frontend/store';
import { useNavigation } from '@react-navigation/native';

const ConfirmWalk = ({ route }) => {
  const [selectedPets, setSelectedPets] = useState(route?.params?.selectedPets);
  const [walkPlan, setWalkPlan] = useState(route?.params?.walkPlan);
  const [totalFee, setTotalFee] = useState(route?.params?.totalFee);
  const [walker, setWalker] = useState(route?.params?.walkerData);

  const { data } = useAppSelector((state) => state?.user?.loginData);
  const userType = data?.userType;

  // console.log('walkPlan-====', walkPlan?.schedule?.startDate);

  const reviewConfirmWalkData = route?.params?.reviewConfirmWalkData;
  const isStatusChange = route?.params?.isStatusChange;

  const [updatePlanStatus, { isLoading: updatePlanLoading }] =
    useUpdateWalkerPlanStatusMutation();

  // console.log('reviewConfirmWalkData==', reviewConfirmWalkData?.walkStatus);

  useEffect(() => {
    if (reviewConfirmWalkData) {
      setWalkPlan({});
      setTotalFee(0);
      setWalker({});

      setWalkPlan({
        requirement: reviewConfirmWalkData?.requirement,
        schedule: reviewConfirmWalkData?.schedule,
      });
      setSelectedPets(reviewConfirmWalkData?.pets);
      setWalker(reviewConfirmWalkData?.dogWalker);
    }
  }, [reviewConfirmWalkData]);

  useEffect(() => {
    if (reviewConfirmWalkData) {
      walkPlan?.schedule?.days?.forEach((item, index) => {
        setTotalFee((p) => p + item.fee);
      });
    }
  }, [walkPlan]);

  const navigation = useNavigation();

  const styles = useConfirmWalkPlannerStyle();

  const flatListRef = useRef<FlatList>();

  const [createWalk, { isLoading }] = useCreatePetWalkerPlanMutation();
  const [acceptOrReject, { isLoading: acceptOrRejectLoading }] =
    useAcceptOrRejectWalkerPlanMutation();

  // console.log('walkPlan?.schedule===', walkPlan?.schedule?.days);

  // console.log('sbbbs===========', walkPlan);

  const isCurrentDateEqualToEndDate = moment().isSame(
    walkPlan?.schedule?.endDate,
    'day'
  );

  // console.log('isCurrentDateEqualToEndDate====', isCurrentDateEqualToEndDate);

  const handleDogPick = async () => {
    const payload = {
      status: isCurrentDateEqualToEndDate ? 'Completed' : 'In Progress',
      days: [
        walkPlan?.schedule?.days?.reduce((item) => ({
          date: item?.date,
          dayName: item?.dayName,
          startTime: item?.startTime,
          endTime: item?.endTime,
          status: 'PickDog',
          fee: item?.fee,
        })),
      ],
    };

    // console.log('payload2=====', payload);

    try {
      const res = await updatePlanStatus({
        payload: payload,
        planId: reviewConfirmWalkData?._id,
      });
      console.log('res=====', res);
      // const { location } = res?.data?.data?.schedule;

      if (res?.data) {
        showToast('success', `Dog has been picked success`);
        // navigation.navigate('LiveMapRender', {
        //   location,
        // });
      }
    } catch (error) {
      console.log('error=========', error);
    }
  };

  const createWalkPlan = useCallback(async () => {
    const payload = {
      schedule: {
        ...walkPlan?.schedule,
        totalFee: totalFee,
      },
      pets: selectedPets?.map((item, i) => item._id),
      dogWalker: walker?._id,
      requirement: walkPlan?.requirement,
    };

    try {
      const res = await createWalk({ payload });
      console.log('responce=====', res);
      if (res?.data) {
        showToast('success', 'Walk create successfully');
        setWalkPlan({});
        setSelectedPets([]);
        setTotalFee(0);
        setWalker({});
        navigation.navigate('WalkHistory', { isCreatingFlow: true });
      } else {
        showToast('error', `${res?.error?.data?.message}`);
      }
    } catch (error) {
      console.log('error=====', error);
    }
  }, []);

  const renderPetsData = useCallback(({ item, index }) => {
    return (
      <View
        style={{
          width: metrics.screenWidth,
          height: metrics.height(400),
        }}
      >
        <CustomImage
          url={item?.image ? item?.image[0] : null}
          style={{ width: metrics.screenWidth, height: metrics.height(300) }}
        />
        <View
          style={{
            width: metrics.screenWidth,
            height: metrics.height(100),
            backgroundColor: Colors.lightBlue,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-evenly',
              marginHorizontal: metrics.width(30),
            }}
          >
            <CustomText label="AGE" fontFamily={Fonts.Bold} fontSize={16} />
            <CustomText
              label={`${item?.age ? item?.age : 0} Month`}
              fontSize={15}
              color={Colors.white}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-evenly',
              marginHorizontal: metrics.width(30),
            }}
          >
            <CustomText label="SIZE" fontFamily={Fonts.Bold} fontSize={16} />
            <CustomText
              label={`Small (${item?.size ? item?.size : 0})`}
              fontSize={15}
              color={Colors.white}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-evenly',
              marginHorizontal: metrics.width(30),
            }}
          >
            <CustomText label="GENDER" fontFamily={Fonts.Bold} fontSize={16} />
            <CustomText
              label={item?.gender}
              fontSize={15}
              color={Colors.white}
            />
          </View>
        </View>
      </View>
    );
  }, []);

  const handleAccept = async () => {
    if (userType === 'Talent') {
      const payload = {
        status: 'accept',
      };
      try {
        const res = await updatePlanStatus({
          payload: payload,
          planId: reviewConfirmWalkData?._id,
        });
        console.log('res===', res?.data?.data);
        if (res?.data) {
          showToast('success', 'Walk has been accepted');
          // navigation.navigate('WalkHistory');
        }
      } catch (error) {
        console.log('error====', error);
      }
    } else {
      // setSelectedPets([]);
      // setTotalFee(0);
      // setWalkPlan({});
      // setWalker({});

      // !reviewConfirmWalkData
      //   ?
      navigation.navigate('TabStack');
      // : navigation.navigate('WalkHistory', {
      //     isCreatingFlow: true,
      //   });
    }
  };

  const rejectWalk = () => {
    const payload = {
      status: 'reject',
    };
    if (userType === 'Talent') {
      Alert.alert('Reject Walk', 'Are you sure you want to reject this walk?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const res = await updatePlanStatus({
                payload: payload,
                planId: reviewConfirmWalkData?._id,
              });
              console.log('res=====', res?.data?.data?.status);
              if (res?.data) {
                showToast('success', 'Walk has been Rejected');
                navigation.navigate('WalkHistory', {
                  status: res?.data?.data?.status,
                });
              }
            } catch (error) {
              console.log('error====', error);
            }
          },
        },
      ]);
    } else if (!reviewConfirmWalkData) {
      createWalkPlan();
    } else {
      navigation.navigate('LocateWalker', {
        walkerData: reviewConfirmWalkData?.dogWalker,
      });
    }
  };

  return (
    <MainWrapper paddingHorizontal={-1} headerShown={false}>
      <ScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.screenContainer}
      >
        <Animated.View style={styles.petImageContainer}>
          <Animated.FlatList
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={selectedPets}
            ref={flatListRef}
            initialScrollIndex={0}
            pagingEnabled
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPetsData}
          />
        </Animated.View>
        <Icons
          style={{ position: 'absolute', top: 10, left: 10 }}
          family={'Ionicons'}
          name="arrow-back-outline"
          color={Colors.white}
          size={32}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.bottomScreenContainer}>
          <View style={styles.walkerDetailsContainer}>
            <CustomText
              label="Dog Walker"
              fontSize={20}
              fontFamily={Fonts.Medium}
            />
            <View style={styles.walkerInfoContaier}>
              <View style={styles.walkerImageConatiner}>
                <CustomImage
                  url={
                    userType === 'Talent'
                      ? data?.profileImage
                      : walker?.profileImage
                  }
                  style={styles.walkerImage}
                  isUser
                />
              </View>

              <CustomText
                label={userType === 'Talent' ? data?.name : walker?.name}
                fontSize={14}
                fontFamily={Fonts.Regular}
                marginLeft={metrics.width(10)}
              />
            </View>
          </View>
          <View style={styles.walkDurationContainer}>
            <CustomText
              label="Duration"
              fontSize={20}
              fontFamily={Fonts.Medium}
            />

            <CustomText
              label={
                walkPlan?.schedule
                  ? `${moment(walkPlan?.schedule?.startDate).format(
                      'DD-MMM-YYYY'
                    )} To ${moment(walkPlan?.schedule?.endDate).format(
                      'DD-MMM-YYYY'
                    )}`
                  : ''
              }
              fontSize={15}
              fontFamily={Fonts.Regular}
            />
          </View>
          <View style={styles.walkTimeContainer}>
            <CustomText
              label="Time Slot"
              fontSize={20}
              fontFamily={Fonts.Medium}
            />
            {walkPlan?.schedule?.days?.map((day, index) => {
              return (
                <View key={index} style={styles.timeRowContainer}>
                  <View style={styles.dayNameContainer}>
                    <CustomText
                      label={day?.dayName}
                      fontSize={15}
                      fontFamily={Fonts.Regular}
                    />
                  </View>
                  <View style={styles.timeRow}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <CustomText
                        label={`${day?.startTime} - ${day?.endTime}`}
                        fontSize={15}
                        fontFamily={Fonts.Light}
                      />
                      {isStatusChange === 2 && isCurrentDateEqualToEndDate && (
                        <Icons
                          family="AntDesign"
                          name="checkcircle"
                          size={15}
                          color={Colors.buttonGreen}
                          style={{ left: metrics.width(5) }}
                        />
                      )}
                    </View>
                    <CustomText
                      label={`$ ${
                        day.fee === 0
                          ? '00'
                          : Number.isInteger(day?.fee)
                          ? day?.fee
                          : `${day?.fee?.toFixed(2)}`
                      }`}
                      fontSize={15}
                      fontFamily={Fonts.Regular}
                    />
                  </View>
                </View>
              );
            })}
            <View style={styles.totalFeeContainer}>
              <CustomText
                label="Total:"
                fontSize={15}
                fontFamily={Fonts.Medium}
              />
              <CustomText
                label={`$ ${
                  totalFee === 0
                    ? '00'
                    : Number.isInteger(totalFee)
                    ? totalFee
                    : totalFee?.toFixed(2)
                }`}
                fontSize={16}
                fontFamily={Fonts.Medium}
              />
            </View>
          </View>
          <View style={styles.locationContainer}>
            <AnimatedInput
              placeholder=""
              value={walkPlan?.schedule?.location?.address}
              editable={false}
            />
            {/* <LocationSelection
              editable={false}
              location={walkPlan?.schedule?.location}
            /> */}
            <RequirementsSelection
              editable={false}
              requirements={walkPlan?.requirement}
            />
          </View>
        </View>

        {isStatusChange === 1 && userType === 'Talent' && (
          <View style={styles.buttonsContainer}>
            <CustomButton
              loading={updatePlanLoading}
              title={'Pick Dog'}
              borderRadius={100}
              onPress={handleDogPick}
            />
          </View>
        )}

        {isStatusChange === 2 && (
          <View style={styles.buttonsContainer}>
            <CustomButton
              loading={updatePlanLoading}
              title={'Complete'}
              borderRadius={100}
              onPress={handleDogPick}
              disabled={
                isStatusChange === 2 || isCurrentDateEqualToEndDate
                  ? true
                  : false
              }
            />
          </View>
        )}

        {isStatusChange === 3 && (
          <View style={styles.buttonsContainer}>
            <CustomButton
              loading={updatePlanLoading}
              title={'Reject'}
              borderRadius={100}
              onPress={handleDogPick}
              disabled={isStatusChange === 3 ? true : false}
            />
          </View>
        )}

        {/* <View style={styles.buttonsContainer}>
          <CustomButton
            loading={updatePlanLoading}
            title={
              isStatusChange === 2 || isCurrentDateEqualToEndDate
                ? 'Complete'
                : isStatusChange === 3
                ? 'Rejected'
                : 'Pick Dog'
            }
            borderRadius={100}
            onPress={handleDogPick}
            disabled={isStatusChange === (2 || 3) ? true : false}
          />
        </View> */}

        {userType === 'Talent' && isStatusChange === 0 ? (
          <View style={styles.buttonsContainer}>
            <CustomButton
              iconFamily="Feather"
              iconName="check"
              iconColor={Colors.white}
              IconLeftMargin={metrics.width(18)}
              iconSize={normalizeSize(25)}
              loading={updatePlanLoading}
              title={'Accepet'}
              height={metrics.height(65)}
              color={Colors.white}
              backgroundColor={Colors.darkBlue}
              fontSize={20}
              width={'45%'}
              borderRadius={10}
              onPress={handleAccept}
            />
            <CustomButton
              iconFamily="AntDesign"
              iconName="close"
              iconColor={Colors.darkBlue}
              IconLeftMargin={metrics.width(25)}
              iconSize={normalizeSize(25)}
              loading={isLoading}
              title={'Reject'}
              height={metrics.height(65)}
              width={'45%'}
              fontSize={20}
              backgroundColor={'transparent'}
              color={Colors.darkBlue}
              borderWidth={1}
              borderColor={Colors.darkBlue}
              borderRadius={10}
              onPress={rejectWalk}
            />
          </View>
        ) : (
          isStatusChange !== (2 || 3) &&
          userType !== 'Talent' && (
            <View style={styles.buttonsContainer}>
              <CustomButton
                title={'Cancel'}
                height={metrics.height(65)}
                color={'#196F92'}
                backgroundColor={'#D9D9D9'}
                fontSize={20}
                width={'45%'}
                borderRadius={50}
                onPress={handleAccept}
              />
              <CustomButton
                loading={isLoading}
                title={!reviewConfirmWalkData ? 'Create Walk' : 'Locate'}
                height={metrics.height(65)}
                width={'45%'}
                fontSize={18}
                backgroundColor={Colors?.darkBlue}
                color={Colors.white}
                borderWidth={-1}
                borderColor={'transparent'}
                borderRadius={50}
                onPress={rejectWalk}
                // !reviewConfirmWalkData
                //   ? createWalkPlan()
                //   : navigation.navigate('LocateWalker')
              />
            </View>
          )
        )}
      </ScrollView>
    </MainWrapper>
  );
};

export default ConfirmWalk;
