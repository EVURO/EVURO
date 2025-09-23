import { ActivityIndicator, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomHeader,
  CustomText,
  Icons,
  MainWrapper,
  StatusTab,
  WalkCard,
} from '../../../components';
import { Colors, Images } from '@evuro-frontend/assets';
import { useGetPetWalkerPlanQuery } from '@evuro-frontend/store';
import { Fonts } from '../../../assets/fonts';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useWalkHistoryStyle } from './style';
import CustomModal from 'apps/evuro-frontend-mobile/src/components/base/CustomModal';
import CalendarPicker from 'react-native-calendar-picker';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import moment from 'moment';

const WalkHistory = ({ route }) => {
  const isCreatingFlow = route?.params?.isCreatingFlow;
  const [activeTab, setActiveTab] = useState(0);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [walkPlan, setWalkPlan] = useState({});
  const [handleDate, setHandleDate] = useState({});

  // console.log(
  //   'walkPlan====',
  //   Object.keys(walkPlan).length,
  //   'handleDate=====',
  //   Object.keys(handleDate).length
  // );

  const payload = {
    startDate: moment(handleDate?.schedule?.startDate).format('YYYY-MM-DD'),
    endDate: moment(handleDate?.schedule?.endDate).format('YYYY-MM-DD'),
    status:
      activeTab === 0
        ? 'Pending'
        : activeTab === 1
        ? 'In Progress'
        : activeTab === 2
        ? 'Completed'
        : 'reject',
  };
  // console.log(
  //   'payload===',
  //   moment(walkPlan?.schedule?.startDate).format('YYYY-MM-DD')
  // );

  const { data, isLoading, refetch } = useGetPetWalkerPlanQuery(
    Object?.keys(handleDate)?.length > 0
      ? {
          startDate: payload?.startDate,
          endDate: payload?.endDate,
          status: payload?.status,
        }
      : { status: payload?.status }
  );

  useEffect(() => {
    refetch();
  }, []);

  // console.log('data=====', moment().format('YYYY-MM-DD'));

  const styles = useWalkHistoryStyle();
  const navigation = useNavigation();
  const IsFocused = useIsFocused();

  // console.log('myWalkerPlan=========', myWalkerPlan?.data);

  const onDateChange = (date, type) => {
    if (date && type === 'START_DATE') {
      setWalkPlan({
        ...walkPlan,
        schedule: {
          startDate: date,
        },
      });
    } else if (date && type === 'END_DATE') {
      setWalkPlan({
        ...walkPlan,
        schedule: {
          ...walkPlan?.schedule,
          endDate: date,
        },
      });
    }
  };

  // console.log('data===========', data?.data);

  return (
    <MainWrapper>
      <CustomHeader
        onBackPress={() => {
          if (isCreatingFlow) {
            navigation.navigate('TabStack');
          } else {
            navigation.goBack();
          }
          // isCreatingFlow
          //   ? navigation.navigate('TabStack')
          //   : navigation.goBack();
        }}
        onBackHeader
        headerTitle="Walk History"
        isRightIcon
        iconName={Images.filter}
        tintColor={isVisibleModal ? Colors.darkBlue : Colors.black}
        onIconPress={() => setisVisibleModal(true)}
      />

      <StatusTab
        isWalk={true}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* <CustomText
        label="ChatScreen"
        fontSize={25}
        onPress={() => navigation.navigate('LocateWalker')}
      /> */}

      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={data?.data}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({ item, index }) => {
          // console.log('item=======', item);

          return (
            <View style={styles.WalkCardStyle}>
              <WalkCard
                width="62%"
                data={item}
                walkHistoryData={true}
                activeTab={activeTab}
              />
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyComponent}>
            {isLoading ? (
              <ActivityIndicator color={Colors.darkBlue} size={30} />
            ) : (
              <CustomText
                label="Data not found"
                fontSize={15}
                fontFamily={Fonts.Medium}
                color={Colors.red}
              />
            )}
          </View>
        )}
      />

      <CustomModal
        visible={isVisibleModal}
        onRequestClose={() => setisVisibleModal(false)}
      >
        <View style={{ height: metrics.screenHeight / 1.7, width: '90%' }}>
          <CalendarPicker
            selectedStartDate={walkPlan?.schedule?.startDate}
            weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
            headerWrapperStyle={{
              marginTop: metrics.height(10),
            }}
            selectedEndDate={walkPlan?.schedule?.endDate}
            width={metrics.screenWidth}
            startFromMonday={true}
            allowRangeSelection={
              Object.keys(walkPlan).length > 0 ? true : false
            }
            // minDate={new Date(moment().format('YYYY-MM-DD'))}
            todayBackgroundColor={Colors.lightGray}
            selectedDayColor={'#D1E2E9'}
            selectedDayTextColor={Colors.black}
            textStyle={{ fontFamily: Fonts.Regular }}
            onDateChange={onDateChange}
            range
            dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
            selectedRangeStartStyle={
              Object.keys(walkPlan).length > 0 && {
                backgroundColor: '#196F92',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }
            }
            selectedRangeEndStyle={
              Object.keys(walkPlan).length > 0 && {
                backgroundColor: '#196F92',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }
            }
            selectedRangeStartTextStyle={
              Object.keys(walkPlan).length > 0 && { color: Colors.white }
            }
            selectedRangeEndTextStyle={
              Object.keys(walkPlan).length > 0 && { color: Colors.white }
            }
            previousComponent={
              <Icons
                family={'MaterialIcons'}
                size={metrics.width(30)}
                name={'navigate-before'}
              />
            }
            nextComponent={
              <Icons
                family={'MaterialIcons'}
                size={metrics.width(30)}
                name={'navigate-next'}
              />
            }
          />
          <CustomButton
            onPress={() => {
              setHandleDate(walkPlan);
              setisVisibleModal(false);
            }}
            title="Filter"
            marginTop={metrics.height(20)}
          />
          <CustomText
            onPress={() => {
              setWalkPlan({});
              setHandleDate({});
            }}
            label="Reset"
            fontSize={18}
            alignSelf="center"
            marginTop={metrics.height(15)}
            textDecorationLine="underline"
            fontStyle="italic"
          />
        </View>
      </CustomModal>
    </MainWrapper>
  );
};

export default WalkHistory;
