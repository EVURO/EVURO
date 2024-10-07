import { Colors } from '@evuro-frontend/assets';
import { CustomText } from '../../../../components';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function TimeSelection({ handleTimeSelection, serviceFee, handleDuration }) {
  const [isStartTimeModalVisible, setIsStartTimeModalVisible] = useState(false);
  const [isEndTimeModalVisible, setIsEndTimeModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (startTime && endTime) {
      const newDuration = moment(endTime, 'hh:mm a').diff(
        moment(startTime, 'hh:mm a'),
        'minutes'
      );
      handleDuration(newDuration);
      setDuration(newDuration);
    }
  }, [startTime, endTime]);

  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <View style={{ flexDirection: 'row' }}>
        <CustomText
          onPress={() => {
            setIsStartTimeModalVisible(true);
          }}
          label={startTime ? moment(startTime).format('hh:mm a') : 'Start time'}
          fontSize={15}
          color={startTime ? Colors.black : Colors.darkGray}
        />
        <CustomText
          label={' - '}
          fontSize={15}
          color={startTime ? Colors.black : Colors.darkGray}
        />
        <CustomText
          onPress={() => {
            setIsEndTimeModalVisible(true);
          }}
          label={endTime ? moment(endTime).format('hh:mm a') : 'End time'}
          fontSize={15}
          color={endTime ? Colors.black : Colors.darkGray}
        />
      </View>
      <CustomText
        label={`$ ${
          (serviceFee / 60) * duration === 0
            ? '00'
            : Number.isInteger((serviceFee / 60) * duration)
            ? (serviceFee / 60) * duration
            : ((serviceFee / 60) * duration).toFixed(2)
        }`}
        fontSize={15}
      />

      <DateTimePickerModal
        isVisible={isStartTimeModalVisible}
        mode="time"
        onConfirm={(time) => {
          if (endTime && moment(time).isSameOrAfter(moment(endTime))) {
            setIsStartTimeModalVisible(false);
            Alert.alert(
              'Alert',
              '(Invalid time range)\nselect start time again',
              [
                {
                  text: 'OK',
                  onPress: () => setIsStartTimeModalVisible(true),
                },
              ]
            );
          } else {
            setStartTime(time);
            handleTimeSelection(time);
            setIsStartTimeModalVisible(false);
          }
        }}
        onCancel={() => {
          setIsStartTimeModalVisible(false);
        }}
      />
      <DateTimePickerModal
        isVisible={isEndTimeModalVisible}
        mode="time"
        onConfirm={(time) => {
          if (startTime && moment(time).isSameOrBefore(moment(startTime))) {
            setIsEndTimeModalVisible(false);
            Alert.alert(
              'Alert Title',
              'Invalid time range\nselect end time again',
              [
                {
                  text: 'OK',
                  onPress: () => setIsEndTimeModalVisible(true),
                  style: 'cancel',
                },
              ]
            );
          } else {
            setEndTime(time);
            handleTimeSelection(startTime, time);
            setIsEndTimeModalVisible(false);
          }
        }}
        onCancel={() => {
          setIsEndTimeModalVisible(false);
        }}
      />
    </View>
  );
}

export default TimeSelection;
