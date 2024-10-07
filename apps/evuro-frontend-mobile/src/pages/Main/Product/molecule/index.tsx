import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { CustomText, Icons } from '../../../../components/index';
import { Fonts } from 'apps/evuro-frontend-mobile/src/assets/fonts';

const AddressCard = ({
  fullName,
  address1,
  address2,
  mobileNo,
  title,
  rightIcon,
  onIconPress,
  active,
  onCartPress,
  onEditAddress,
  onDeleteAddress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onCartPress}
      style={{
        marginTop: metrics.height(30),
        borderWidth: active ? 2 : 1,
        borderColor: active ? Colors.darkBlue : Colors.lightGray,
        // height: metrics.width(170),
        // justifyContent: 'center',
        // paddingHorizontal: metrics.width(20),
        paddingTop: metrics.width(10),
        paddingHorizontal: metrics.width(20),
        paddingBottom: metrics.width(10),
        borderRadius: 5,
      }}
    >
      {!!title && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: metrics.width(10),
          }}
        >
          <CustomText
            label={fullName}
            fontSize={20}
            fontFamily={Fonts.Medium}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={onEditAddress}
              style={{ marginRight: metrics.width(10) }}
            >
              <Svgs.editIcon />
            </Pressable>

            <Pressable onPress={onDeleteAddress}>
              <Svgs.DeleteIcon
                height={metrics.width(23)}
                width={metrics.width(23)}
              />
            </Pressable>
          </View>
        </View>
      )}

      <View>
        <CustomText label={address1} fontSize={15} fontFamily={Fonts.Medium} />
        <CustomText label={address2} fontSize={15} />
      </View>

      <View
        style={{
          marginTop: metrics.width(10),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CustomText
          label={mobileNo}
          fontSize={13}
          // color={Colors.darkGray}
          marginTop={metrics.height(2)}
        />
        {!!rightIcon && (
          <TouchableOpacity
            onPress={onIconPress}
            activeOpacity={0.6}
            style={{
              backgroundColor: Colors.darkBlue,
              height: metrics.width(25),
              width: metrics.width(25),
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              family="MaterialIcons"
              name={'chevron-right'}
              size={metrics.width(25)}
              color={Colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;

const styles = StyleSheet.create({});
