/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import {
  CustomButton,
  CustomHeader,
  CustomText,
  DogTrailer,
  Icons,
  MainWrapper,
} from '../../../components/index';
import CalendarPicker from 'react-native-calendar-picker';
import { Fonts } from '../../../assets/fonts';
import moment from 'moment';
import { metrics } from '../../../util/metrics';
import { Colors, Svgs } from '@evuro-frontend/assets';
import TimeSelection from './molecules/TimeSelection';
import { useAppSelector, useGetPetsQuery } from '@evuro-frontend/store';
import { useNavigation } from '@react-navigation/native';
import { useWalkPlannerStyle } from './style';
import LocationSelection from './molecules/LocationSelection';
import RequirementsSelection from './molecules/RequirementsSelection';

const WalkPlanner = ({ route }) => {
  const navigation = useNavigation();
  const walkerData = route?.params?.data;

  const { data } = useGetPetsQuery(null);

  const styles = useWalkPlannerStyle();

  const serviceFee = walkerData?.ratePerHour || 0;

  const pets = data?.data || [];

  const [selectedPets, setSelectedPets] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [walkPlan, setWalkPlan] = useState({});
  const [location, setLocation] = useState({});

  // console.log('=====walkPlan', walkPlan);

  const onDateChange = (date, type) => {
    // console.log('date====', date);

    if (date && type === 'START_DATE') {
      setWalkPlan({
        ...walkPlan,
        schedule: {
          startDate: Number(date),
        },
      });
    } else if (date && type === 'END_DATE') {
      setWalkPlan({
        ...walkPlan,
        schedule: {
          ...walkPlan.schedule,
          endDate: Number(date),
        },
      });
    }
  };
  // console.log('walkPlan?.schedule?.startDate==', walkPlan?.schedule?.startDate);

  useEffect(() => {
    if (walkPlan?.schedule?.startDate && walkPlan?.schedule?.endDate) {
      const startDate = moment(walkPlan?.schedule?.startDate);
      const endDate = moment(walkPlan?.schedule?.endDate);
      const daysArray = [];

      while (startDate <= endDate) {
        const date = startDate.format('DD-MM-YYYY');
        const dayName = startDate.format('ddd');
        daysArray.push({
          date,
          dayName,
        });
        startDate.add(1, 'days');
      }

      setWalkPlan({
        ...walkPlan,
        schedule: { ...walkPlan.schedule, days: daysArray },
      });
    } else
      setWalkPlan({
        ...walkPlan,
        schedule: { ...walkPlan.schedule, days: [] },
      });
  }, [walkPlan?.schedule?.startDate, walkPlan?.schedule?.endDate]);

  useEffect(() => {
    setWalkPlan({
      ...walkPlan,
      schedule: {
        ...walkPlan?.schedule,
        location: location,
      },
    });
  }, [location]);

  return (
    <MainWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.screenContainer}
      >
        <CustomHeader onBackHeader={true} headerTitle="Walk Planner" Spacer />

        <View style={styles.container}>
          <View style={styles.calenderTitle}>
            <CustomText
              label="Select dates"
              fontSize={17}
              fontFamily={Fonts.Medium}
            />
          </View>

          <CalendarPicker
            selectedStartDate={walkPlan?.schedule?.startDate}
            weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
            headerWrapperStyle={styles.calenderHeader}
            selectedEndDate={walkPlan?.schedule?.endDate}
            width={metrics.screenWidth}
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={new Date(moment().format('YYYY-MM-DD'))}
            todayBackgroundColor={Colors.lightGray}
            selectedDayColor={'#D1E2E9'}
            selectedDayTextColor={Colors.black}
            textStyle={{ fontFamily: Fonts.Regular }}
            onDateChange={onDateChange}
            range
            dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
            selectedRangeStartStyle={styles.selectedRangeStart}
            selectedRangeEndStyle={styles.selectedRangeEnd}
            selectedRangeStartTextStyle={styles.selectedRangeStartText}
            selectedRangeEndTextStyle={styles.selectedRangeEndText}
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
        </View>

        <View style={styles.petsSection}>
          <CustomText
            label="Your pets"
            fontSize={20}
            fontFamily={Fonts.Medium}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('AddPets', {
                addPets: true,
              })
            }
            style={styles.petAddButton}
          >
            <Svgs.plus width={metrics.width(22)} height={metrics.width(22)} />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          data={pets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={{ marginLeft: metrics.width(index === 0 ? 0 : 20) }}>
                <DogTrailer
                  label={item.petName}
                  image={item.image[0]}
                  selected={selectedPets.includes(item)}
                  onPress={() => {
                    if (
                      selectedPets.some((pet) => pet.petName === item.petName)
                    ) {
                      setSelectedPets(
                        selectedPets.filter(
                          (pet) => pet.petName !== item.petName
                        )
                      );
                    } else {
                      setSelectedPets([...selectedPets, item]);
                    }
                  }}
                />
              </View>
            );
          }}
        />

        <CustomText
          label="SERVICE FEE"
          fontSize={14}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(25)}
          color={Colors.darkGray}
        />
        <CustomText
          label={`$ ${serviceFee} / hr`}
          fontSize={15}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(5)}
          marginBottom={metrics.height(10)}
        />

        {walkPlan?.schedule?.days?.map((day, index) => {
          return (
            <View key={index}>
              <View style={styles.dayRow}>
                <View style={{ width: '20%' }}>
                  <CustomText
                    label={day.dayName}
                    fontSize={15}
                    fontFamily={Fonts.Medium}
                  />
                </View>
                <View style={styles.daysRowHalf}>
                  <TimeSelection
                    handleTimeSelection={(startTime, endTime) => {
                      const updatedDays = [...walkPlan?.schedule?.days];
                      updatedDays[index].startTime =
                        moment(startTime).format('hh:mm a');
                      updatedDays[index].endTime =
                        moment(endTime).format('hh:mm a');
                      setWalkPlan({
                        ...walkPlan,
                        schedule: {
                          ...walkPlan.schedule,
                          days: updatedDays,
                        },
                      });
                    }}
                    handleDuration={(currentDuration) => {
                      const updatedDays = [...walkPlan?.schedule?.days];
                      updatedDays[index].fee =
                        (serviceFee / 60) * currentDuration;
                      setTotalFee(totalFee + day.fee);
                    }}
                    serviceFee={serviceFee}
                  />
                </View>
              </View>
            </View>
          );
        })}
        {walkPlan?.schedule?.days?.length > 0 && (
          <View style={styles.totalChargesContainer}>
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
                  : totalFee.toFixed(2)
              }`}
              fontSize={16}
              fontFamily={Fonts.Medium}
            />
          </View>
        )}

        <LocationSelection location={location} setLocation={setLocation} />

        <RequirementsSelection
          requirements={walkPlan.requirement}
          onChange={(e) => {
            setWalkPlan({ ...walkPlan, requirement: e });
          }}
        />

        <View style={styles.buttonsContainer}>
          <CustomButton
            title={'Cancel'}
            height={metrics.height(65)}
            color={Colors.darkBlue}
            backgroundColor={Colors.alphaLightGray}
            fontSize={22}
            width={'42%'}
            borderRadius={50}
            onPress={() => {
              setSelectedPets([]);
              setTotalFee(0);
              setWalkPlan({});
              setLocation({});
              navigation.navigate('TabStack');
            }}
          />
          <CustomButton
            title={'Proceed'}
            height={metrics.height(65)}
            width={'42%'}
            disabled={
              !(
                walkPlan?.requirement &&
                walkPlan?.schedule?.days?.length > 0 &&
                walkPlan?.schedule?.days?.every((obj) =>
                  obj.hasOwnProperty('fee')
                ) &&
                walkPlan?.schedule?.location &&
                selectedPets.length > 0
              )
            }
            fontSize={22}
            borderRadius={50}
            onPress={() =>
              navigation.navigate('ConfirmWalk', {
                walkerData,
                selectedPets,
                walkPlan,
                totalFee,
              })
            }
          />
        </View>
      </ScrollView>
    </MainWrapper>
  );
};

export default WalkPlanner;
