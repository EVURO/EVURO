import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import colors from '../../../util/colors';
import Icons from '../../../common/components/Icons';
import FastImage from '../../../common/components/FastImage';
import CustomText from '../../../common/components/CustomText';
import {ChatBody} from '../../../common/components/Chats/Chatbody';
import {sendMessage} from '../../../firebase/firestore/chat';
const Conversion = ({route, navigation}) => {
  console.log('----Route', route.params);
  const {data, authUserID} = route.params;
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    console.log('Data', data.id);
  });
  const handleSubmit = async message => {
    await sendMessage(data.id, authUserID, message);
    console.log(data.id, message);
    setMessageText('');
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          height: '15%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{marginHorizontal: verticalScale(10)}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.pop()}>
            <Icons
              size={verticalScale(24)}
              family={'AntDesign'}
              name="arrowleft"
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', width: '65%', alignItems: 'center'}}>
          <FastImage
            source={{
              uri: route.params.data.image
                ? route.params.data.image
                : 'https://picsum.photos/id/290/200/300',
            }}
            style={styles.iamage}
          />
          <View>
            <CustomText
              label={route.params.data?.email?.split?.('@')?.[0]}
              textStyle={styles.name}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: verticalScale(10)}} />
          <Icons
            size={verticalScale(18)}
            family={'Entypo'}
            name="dots-three-vertical"
            color={colors.primary}
          />
        </View>
      </View>
      <View style={styles.innerMainContainer}>
        <ChatBody userId={authUserID} relatedUserId={data.id} />
      </View>
      <View style={styles.textInputContainer}>
        <View style={{width: verticalScale(20)}} />
        <View style={styles.textInputContainer1}>
          <TextInput
            placeholder="Type your message here..."
            placeholderTextColor={colors.primary}
            style={{
              backgroundColor: '#e8e8e8',
              borderRadius: verticalScale(30),
              height: verticalScale(35),
              fontSize: verticalScale(12),
              color: colors.primary,
              paddingHorizontal: verticalScale(10),
            }}
            value={messageText}
            onChangeText={value => setMessageText(value)}
          />
        </View>
        <View style={{width: verticalScale(10)}} />

        {/* <View style={styles.plusIcon}>
            <Icon
              size={verticalScale(16)}
              family={"Entypo"}
              name="plus"
              color={colors.white}
            />
          </View> */}

        <View
          style={{width: verticalScale(10), marginLeft: verticalScale(10)}}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!messageText}
          onPress={() => handleSubmit(messageText)}>
          <Icons
            size={verticalScale(18)}
            family={'Ionicons'}
            name="ios-send"
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Conversion;

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerMainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: verticalScale(30),
    borderTopRightRadius: verticalScale(30),
    padding: verticalScale(15),
  },
  iamage: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: verticalScale(99),
    marginRight: verticalScale(10),
  },
  name: {
    fontSize: verticalScale(15),
    color: colors.primary,
  },
  status: {
    fontSize: verticalScale(10),
    color: colors.primary,
  },
  message: {
    backgroundColor: colors.purple,
    alignSelf: 'flex-end',
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(5),
    borderBottomLeftRadius: verticalScale(10),
    borderBottomRightRadius: verticalScale(10),
    borderTopLeftRadius: verticalScale(10),
  },
  message1: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(5),
    borderTopRightRadius: verticalScale(10),
    borderBottomLeftRadius: verticalScale(10),
    borderBottomRightRadius: verticalScale(10),
  },
  messageText: {
    fontSize: verticalScale(9),
    color: colors.white,
  },
  timerText: {
    fontSize: verticalScale(9),
    color: colors.lightGray1,
    alignSelf: 'flex-end',
    marginTop: '10@s',
  },
  timerText1: {
    fontSize: verticalScale(9),
    color: colors.lightGray1,
    alignSelf: 'flex-start',
    marginTop: '10@s',
  },
  textInputContainer: {
    backgroundColor: colors.lightGrayColor,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: verticalScale(10),
  },
  textInputContainer1: {
    width: '75%',
  },
  plusIcon: {
    backgroundColor: colors.primary,
    borderRadius: verticalScale(90),
  },
});
