import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import CustomText from '../base/CustomText';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import { addressContainerStyle } from '../style';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Fonts } from '../../assets/fonts';
import { SafeAreaView, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

interface GooglePlacesInputProps {
  setLat?: React.Dispatch<React.SetStateAction<number>>;
  setLng?: React.Dispatch<React.SetStateAction<number>>;
  borderColor?: string;
  onPress?: (data: any, details: any) => void;
  placeholder?: string;
  editable?: boolean;
  marginTop?: number;
  zIndex?: number;
  position?: `'absolute' | 'relative' | 'fixed' | 'sticky' | 'static'`;
  addressRef?: any;
  value?: string;
  onChange?: (e: string | ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  errorMessage?: string;
}

const GooglePlacesInput: FC<GooglePlacesInputProps> = ({
  setLat,
  setLng,
  onPress,
  borderColor,
  placeholder,
  editable,
  marginTop,
  position,
  zIndex,
  addressRef,
  value,
  onChange,
  onBlur,
  errorMessage,
}) => {
  const [address, setAddress] = useState(value);

  useEffect(() => onChange && onChange(address), [address]);

  // console.log('value=====', value);
  // console.log('asddresss=====', address);

  return (
    <View>
      <SafeAreaView>
        <GooglePlacesAutocomplete
          suppressDefaultStyles={false}
          ref={addressRef}
          textInputHide={false}
          enablePoweredByContainer={false}
          fetchDetails={true}
          placeholder={placeholder || 'Select location'}
          keyboardShouldPersistTaps="handled"
          textInputProps={{
            value: address,
            onChangeText: setAddress,
            onBlur: onBlur,
            placeholderTextColor: Colors.lightGray,
            fontFamily: Fonts.Regular,
            fontSize: 18,
            borderRadius: 50,
            paddingHorizontal: metrics.width(30),
            borderWidth: 1,
            borderColor: !!errorMessage ? Colors.red : Colors.lightGray,
            editable: editable,
          }}
          renderRow={(rowData, index) => {
            return (
              <CustomText
                label={rowData?.description}
                fontSize={15}
                width="90%"
                fontFamily={Fonts.Medium}
              />
            );
          }}
          onPress={onPress}
          onFail={(error) => {
            console.log('error', error);
          }}
          styles={{
            textInput: addressContainerStyle.textInput,
            row: addressContainerStyle.row,
            separator: {
              height: 1,
              backgroundColor: 'rgba(217, 217, 217, 1)',
              width: '100%',
            },
            listView: {
              backgroundColor: Colors.white,
              // borderRadius: 20,
              marginTop: metrics.height(marginTop || 0),
              width: '90%',
              alignSelf: 'center',
              position: position,
              zIndex: zIndex,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            },
          }}
          query={{
            key: 'AIzaSyAJbd6lKbYD1CyFseAs9cXoFtAYbYNcKkM',
            language: 'en',
            type: 'address',
            components: 'country:us',
          }}
        />
      </SafeAreaView>
      {/* <View
        style={{
          paddingHorizontal: metrics.width(8),
          backgroundColor: Colors.white,
          position: 'absolute',
          top: 8,
          left: 20,
        }}
      >
        <CustomText
          fontSize={isTablet ? 20 : 15}
          color={!!errorMessage ? Colors.red : Colors.black}
          label="Location"
        />
      </View> */}
      {!!errorMessage && (
        <View style={{ marginLeft: metrics.width(20) }}>
          <CustomText
            label={`${errorMessage.toString()}*`}
            color={Colors.red}
            fontFamily={Fonts.Regular}
            fontSize={13}
            fontStyle="italic"
          />
        </View>
      )}
    </View>
  );
};

export default GooglePlacesInput;
