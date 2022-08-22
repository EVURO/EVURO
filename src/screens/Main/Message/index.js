import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import Preference from 'react-native-preference';
import {getAllUsers} from '../../../firebase/firestore/users';
import colors from '../../../util/colors';
import CustomText from '../../../common/components/CustomText';
import MessageComp from '../../../common/components/MessageComp';
import auth from '@react-native-firebase/auth';
import fonts from '../../../assets/fonts';
import CustomHeader from '../../../common/components/CustomHeader';
const Message = ({navigation}) => {
  const [active, setActive] = useState(1);
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    getUsers();
    setUserID(Preference.get('userID'));
  }, []);
  const getUsers = async () => {
    const response = await getAllUsers();
    setData(response);
    setFilterData(response);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <CustomHeader
        title="Messages"
        size={verticalScale(20)}
        family={'AntDesign'}
        name="arrowleft"
        color={colors.white}
      /> */}
      <View style={{height: verticalScale(10)}} />
      <FlatList
        data={active == 1 ? data : callData}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({item}) => {
          return (
            <MessageComp
              item={item}
              active={active}
              navigation={navigation}
              userID={userID}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Message;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabMainContainer: {
    backgroundColor: colors.lightGrayColor,
    width: '95%',
    alignSelf: 'center',
    borderRadius: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: verticalScale(5),
    marginVertical: verticalScale(10),
  },
  innerContainer: {
    width: '100%',
    height: '30@vs',
    backgroundColor: colors.white,
    borderRadius: verticalScale(30),
    alignItems: 'center',
    padding: verticalScale(5),
    justifyContent: 'center',
  },
  tabText: {
    fontSize: verticalScale(15),
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
});
