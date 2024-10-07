import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  AnimatedInput,
  CustomButton,
  CustomHeader,
  CustomText,
  MainWrapper,
  showToast,
} from '../../../../components';
import { useNavigation } from '@react-navigation/native';
import { metrics } from '../../../../util/metrics';
import { useBillingAddress } from '@evuro-frontend/hooks';
import { Fonts } from '../../../../assets/fonts';
import { Colors } from '@evuro-frontend/assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  setOrderAddress,
  useAppDispatch,
  useAppSelector,
  useEditUserAddressMutation,
  useGetUserAddressesQuery,
} from '@evuro-frontend/store';

const BillingAddress = ({ route }) => {
  const addressID = route?.params?.addressID;
  const { data: getUserAddressByID } = useGetUserAddressesQuery(addressID);

  const [editAddress, { isLoading: editAddressLoading }] =
    useEditUserAddressMutation();

  const getAddressData = getUserAddressByID?.data?.addresses;

  const navigation = useNavigation();

  const { formik, isLoading } = useBillingAddress({
    resolve: handleAddBillingAddress,
  });
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    formik;

  const [inputsLoading, setInputsLoading] = useState(addressID ? true : false);

  const { saveAddress } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const res = getAddressData?.reduce((item) => ({
    name: item?.name,
    billingAddress: item?.billingAddress,
    deliveryAddress: item?.deliveryAddress,
    city: item?.city,
    mobileNumber: item?.mobileNumber,
    state: item?.state,
    zipCode: item?.zipCode,
  }));

  useEffect(() => {
    if (addressID) {
      formik.setFieldValue('fullName', res?.name);
      formik.setFieldValue('address1', res?.billingAddress);
      formik.setFieldValue('address2', res?.deliveryAddress);
      formik.setFieldValue('city', res?.city);
      formik.setFieldValue('mobileNo', res?.mobileNumber);
      formik.setFieldValue('state', res?.state);
      formik.setFieldValue('zipCode', res?.zipCode);
      setInputsLoading(false);
    }
  }, [getAddressData]);

  function handleAddBillingAddress(response) {
    // console.log('response======', response);

    if (response?.data) {
      navigation.navigate('SelectBillingAddress');
    }
  }

  const editAddressData = async () => {
    const payload = {
      name: values.fullName ? values.fullName : res?.name,
      billingAddress: values.address1 ? values.address1 : res?.billingAddress,
      deliveryAddress: values.address2 ? values.address2 : res?.deliveryAddress,
      city: values.city ? values.city : res?.city,
      mobileNumber: values.mobileNo ? values.mobileNo : res?.mobileNumber,
      state: values.state ? values.state : res?.state,
      zipCode: values.zipCode ? values.zipCode : res?.zipCode,
    };

    if (addressID) {
      try {
        const res = await editAddress({ id: addressID, payload });
        console.log('edit address reponce====', res);
        if (res?.data) {
          showToast('success', `${res?.data?.message}`);
          if (saveAddress?._id == addressID) {
            dispatch(setOrderAddress(res?.data?.data));
          }
          navigation.navigate('SelectBillingAddress');
        }
      } catch (error) {
        console.log('error=====', error);
      }
    }
  };

  const inputArray = [
    {
      id: 'fullName',
      placeholder: 'Full Name As Appeared On Card',
      placeholderText: 'Please enter name',
    },
    {
      id: 'address1',
      placeholder: 'Billing Address Line 1',
      placeholderText: 'Please enter address',
    },
    {
      id: 'address2',
      placeholder: 'Billing Address Line 2 (optional)',
      placeholderText: 'Please enter address',
    },
    {
      id: 'city',
      placeholder: 'City',
      placeholderText: 'Please enter city name',
    },
    {
      id: 'mobileNo',
      placeholder: 'Mobile Number',
      placeholderText: 'Please enter mobile number',
      keyboardType: 'numeric',
    },
    {
      id: 'state',
      placeholder: 'State',
      placeholderText: 'Please enter state name',
    },
    {
      id: 'zipCode',
      placeholder: 'Zip Code',
      placeholderText: 'Please enter zip code',
      keyboardType: 'numeric',
    },
  ];

  return (
    <MainWrapper>
      <CustomHeader
        onBackHeader
        headerTitle={`${addressID ? 'Update' : 'Add'} Billing Address`}
        Spacer
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: metrics.height(30),
            marginBottom: metrics.height(10),
          }}
        >
          <CustomText
            label={
              addressID
                ? 'Edit your billing address information'
                : 'Add your billing information  to add card on file.'
            }
            fontFamily={Fonts.Medium}
            fontSize={15}
          />
        </View>

        {!inputsLoading ? (
          inputArray.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{ marginVertical: metrics.height(13) }}
              >
                <AnimatedInput
                  focused={addressID}
                  placeholder={item.placeholder}
                  placeholderText={item.placeholderText}
                  multiline={false}
                  value={values[item.id]}
                  onChange={handleChange(item.id)}
                  onBlur={handleBlur(item.id)}
                  keyboardType={item.keyboardType}
                  errorMessage={
                    touched[item.id] && errors[item.id]
                      ? errors[item.id].toString()
                      : ''
                  }
                  borderColor={
                    touched[item.id] && errors[item.id]
                      ? Colors.red
                      : Colors.lightGray
                  }
                />
              </View>
            );
          })
        ) : (
          <CustomText label="loading....." />
        )}
      </KeyboardAwareScrollView>

      {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: metrics.height(13),
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', zIndex: 99 }}
            onPress={() => formik.setFieldValue('isSavable', !values.isSavable)}
          >
            {values.isSavable ? (
              <Icons
                family="Ionicons"
                name="checkbox"
                color={Colors.darkBlue}
                size={metrics.width(25)}
              />
            ) : (
              <View
                style={{
                  borderWidth: 1,
                  height: metrics.width(23),
                  width: metrics.width(23),
                  borderRadius: 3,
                  borderColor: Colors.lightGray,
                }}
              />
            )}
          </TouchableOpacity>
          <CustomText
            label="Save adress for future use"
            fontSize={14}
            marginLeft={metrics.width(40)}
          />
        </View> */}
      <CustomButton
        loading={addressID ? editAddressLoading : isLoading}
        title="Done"
        onPress={addressID ? editAddressData : handleSubmit}
        marginTop={metrics.height(5)}
        marginBottom={metrics.height(20)}
        borderRadius={100}
      />
    </MainWrapper>
  );
};

export default BillingAddress;
