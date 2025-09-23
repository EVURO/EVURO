import { Image, Switch, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { Colors, Images } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import CustomText from '../base/CustomText';
import { Fonts } from '../../assets/fonts';
import GoBackIcon from '../base/GoBackIcon';
import { useEvuroOptionsStyle } from '../style';
import {
  useAppSelector,
  useGetTalentsQuery,
  useGetUsersQuery,
  useToggleUpdateAvailabilityMutation,
} from '@evuro-frontend/store';
import { showToast } from '../base/CustomToast';
import { useIsFocused } from '@react-navigation/native';
import { debounce } from 'lodash';

interface EvuroOptionsProps {
  onPress: () => void;
  label: string;
  iconName: string;
  isToggleSwitch: boolean;
}

const EvuroOptions: FC<EvuroOptionsProps> = ({
  onPress,
  label,
  iconName,
  isToggleSwitch,
  index,
}) => {
  const isFocused = useIsFocused();
  const [setTalentStatus, { isLoading }] =
    useToggleUpdateAvailabilityMutation();

  const { loginData } = useAppSelector((state) => state.user);

  const { data: useGetUsers, refetch } = useGetUsersQuery(loginData?.data?._id);

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const status = useGetUsers?.data?.availability;

  const styles = useEvuroOptionsStyle();
  const [activeToggle, setActiveToggle] = useState(false);

  // const toggleSwitch = async () => {
  //   await setTalentStatus((previousState) => !previousState)
  //     .then(({ data }) => {
  //       console.log('data====', data);
  //       if (data?.data?.availability === false) {
  //         showToast('success', 'Status has been offline');
  //         setActiveToggle(false);
  //         refetch();
  //       } else {
  //         showToast('success', 'Status has been online');
  //         setActiveToggle(true);
  //         refetch();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error===', error);
  //     });
  // };

  const toggleSwitch = async () => {
    try {
      setActiveToggle(!status);

      const { data } = await setTalentStatus((previousState) => !previousState);
      if (data?.data?.availability === false) {
        showToast('success', 'Status has been offline');
      } else {
        showToast('success', 'Status has been online');
      }

      refetch();
    } catch (error) {
      console.log('error===', error);
      showToast('error', 'An error occurred');
      setActiveToggle(status);
    }
  };

  const debouncedToggleSwitch = debounce(toggleSwitch, 1000);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.mainContainer}
    >
      <View style={styles.innerContainer}>
        {iconName}

        <View>
          <CustomText
            label={label}
            fontSize={18}
            fontFamily={Fonts.Medium}
            marginLeft={metrics.width(20)}
          />
        </View>
      </View>
      {!!isToggleSwitch ? (
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={status === true ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={debouncedToggleSwitch}
          value={status}
        />
      ) : (
        <GoBackIcon onForword borderWidth={1} borderColor={Colors.lightGray} />
      )}
    </TouchableOpacity>
  );
};

export default EvuroOptions;
