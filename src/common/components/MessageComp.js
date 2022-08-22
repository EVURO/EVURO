import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import colors from '../../util/colors';
import FastImage from './FastImage';
const MessageComp = ({item, active, navigation, userID}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.mainContainer}
      onPress={() =>
        navigation.navigate('Conversation', {data: item, authUserID: userID})
      }>
      <View style={{width: '20%'}}>
        <FastImage
          source={{
            uri: item.image
              ? item.image
              : 'https://picsum.photos/id/239/200/300',
          }}
          style={styles.image}
        />
      </View>
      <View style={{width: '70%'}}>
        <CustomText label={item.first_name} textStyle={styles.name} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            label={active == 2 ? item.callEnd : item.message}
            textStyle={active == 2 ? styles.CallEd : styles.name}
          />
          {active == 2 ? (
            <CustomText label={item.createdAt} textStyle={styles.CallEd} />
          ) : (
            <View />
          )}
        </View>
      </View>
      {active == 2 ? (
        <View />
      ) : (
        <View style={item.count > 0 ? styles.countContainer : null}>
          <CustomText label={item.count} textStyle={styles.counter} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MessageComp;

const styles = ScaledSheet.create({
  mainContainer: {
    margin: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: verticalScale(90),
    overflow: 'hidden',
    // backgroundColor: 'red',
  },
  name: {
    fontSize: verticalScale(12),
    color: colors.primary,
  },
  CallEd: {
    fontSize: verticalScale(10),
    color: colors.blue,
  },
  counter: {
    fontSize: verticalScale(10),
    color: colors.blue,
    paddingVertical: verticalScale(6),
    paddingHorizontal: verticalScale(10),
  },
  countContainer: {
    backgroundColor: colors.blue,
    borderRadius: verticalScale(90),
  },
});
