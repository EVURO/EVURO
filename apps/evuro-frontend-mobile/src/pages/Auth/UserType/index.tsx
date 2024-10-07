import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useUserTypeStyle } from './style';

import { CustomButton, CustomText } from '../../../components';
import { metrics } from '../../../util/metrics';
import { Fonts } from '../../../assets/fonts';
import { Images, Svgs } from '@evuro-frontend/assets';
import { useNavigation } from '@react-navigation/native';

const UserType = () => {
  const styles = useUserTypeStyle();
  const navigation = useNavigation();
  const usersArray = [
    {
      id: '1',
      label: 'Shop',
      onPress: () => {
        navigation.navigate('TabStack');
      },
    },
    {
      id: '2',
      component: <Svgs.DogOwner width="100%" style={styles.imgStyle} />,
      label: 'Dog Parent',
      onPress: () => {
        navigation.navigate('SignUp', {
          userType: 'Dog Parent',
        });
      },
    },
    {
      id: '3',
      component: <Svgs.DogTalent width="100%" style={styles.imgStyle} />,
      label: 'Talent',
      onPress: () => {
        navigation.navigate('SignUp', {
          userType: 'Talent',
        });
      },
    },
  ];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.headerContainer}>
          <CustomText
            label="Who are you?"
            fontSize={30}
            marginTop={metrics.height(10)}
            fontFamily={Fonts.Bold}
          />
          <CustomText
            label="Please select an option for registration"
            textAlign={'center'}
            fontSize={20}
            marginTop={metrics.height(15)}
            marginBottom={metrics.height(15)}
            fontFamily={Fonts.Regular}
          />
        </View>
        <View style={styles.UserSection}>
          {usersArray.map((item, index) => (
            <TouchableOpacity
              style={styles.imgContainer}
              activeOpacity={0.7}
              key={item.id}
              onPress={item.onPress}
            >
              {index == 0 ? (
                <View
                  style={{
                    height: '80%',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={Images.petshop}
                    resizeMode="cover"
                    style={{ height: '100%', width: '100%' }}
                  />
                </View>
              ) : (
                <>{item.component}</>
              )}
              <View style={styles.textContainer}>
                <CustomText
                  label={item.label}
                  fontSize={24}
                  fontFamily={Fonts.Medium}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <CustomText
          marginTop={metrics.height(30)}
          marginBottom={metrics.height(25)}
          backgroundColor={'red'}
          textAlign="center"
          label="Powered by maximuseneca™ group"
          color={'#5B5B5B'}
          fontSize={16}
          fontFamily={Fonts.Regular}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserType;
