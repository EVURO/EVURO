import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

import {getMessages} from '../../../firebase/firestore/chat';
import {verticalScale} from 'react-native-size-matters';
import CustomText from '../CustomText';
import moment from 'moment';
import colors from '../../../util/colors';
export const ChatBody = ({userId, relatedUserId}) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const messageSubscriber = getMessages(userId, relatedUserId, setMessages);

    return () => messageSubscriber();
  }, [userId, relatedUserId]);

  const renderMessages = ({index, item: message}) => {
    const isUser = message?.to === userId;
    return (
      <View key={index} style={{padding: 5}}>
        <View style={isUser ? styles.message1 : styles.message2}>
          <CustomText label={message.text} textStyle={styles.messageText} />
        </View>
        <CustomText
          label={message.createdAt}
          textStyle={isUser ? styles.timerText : styles.timerText1}
        />
      </View>
    );
  };
  return (
    <FlatList
      data={messages}
      renderItem={renderMessages}
      style={styles.chat}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  chat: {
    padding: 15,
    height: '75%',
  },

  message: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageSpoil: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    top: -30,
    right: -15,
  },
  message1: {
    backgroundColor: colors.purple,
    alignSelf: 'flex-end',
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(5),
    borderBottomLeftRadius: verticalScale(10),
    borderBottomRightRadius: verticalScale(10),
    borderTopLeftRadius: verticalScale(10),
  },
  timerText: {
    fontSize: verticalScale(9),
    color: colors.boxColor,
    alignSelf: 'flex-end',
    marginTop: verticalScale(10),
  },
  timerText1: {
    fontSize: verticalScale(9),
    color: colors.boxColor,
    alignSelf: 'flex-start',
    marginTop: verticalScale(10),
  },
  message2: {
    backgroundColor: colors.blue,
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
});
