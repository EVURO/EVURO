import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomModal from '../base/CustomModal';
import CustomText from '../base/CustomText';
import { metrics } from '../../util/metrics';
import { Fonts } from '../../assets/fonts';
import { Colors, Images, Svgs } from '@evuro-frontend/assets';
import { useNavigation } from '@react-navigation/native';
import { useUserTypeStyle } from '../../pages/Auth/UserType/style';
import {
  setShowUserTypeModal,
  useAppDispatch,
  useAppSelector,
} from '@evuro-frontend/store';

const CustomUserTypeModal = ({ onDogParent, onTalent, onShop }) => {
  const { showUserTypeModal } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const styles = useUserTypeStyle();
  const navigation = useNavigation();
  const usersArray = [
    {
      id: '1',
      component: Images.DogParentImage,
      label: 'Dog Parent',
      onPress: onDogParent,
    },
    {
      id: '2',
      label: 'Scooperleash',
      component: Images.ScooperleashImage,
      onPress: onShop,
    },
    {
      id: '3',
      component: Images.DogTalentImage,
      label: 'Dog Talent',
      onPress: onTalent,
    },
  ];

  return (
    <CustomModal
      visible={showUserTypeModal}
      height="100%"
      width="100%"
      alignItems="stretch"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(setShowUserTypeModal(false));
          }}
          style={{
            alignSelf: 'flex-end',
            marginTop: metrics.height(40),
            marginRight: metrics.width(30),
          }}
        >
          <Svgs.CancelButton
            height={metrics.width(30)}
            width={metrics.width(30)}
          />
        </TouchableOpacity>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <CustomText
            label="Welcome To Modern Dog Walking"
            fontSize={20}
            marginTop={metrics.height(10)}
            fontFamily={Fonts.Bold}
            textAlign="center"
          />
        </View>

        <View style={styles.headerContainer}>
          <CustomText
            label="Dare to embrace failure, unlock a world of awe as a distinguished customer of extraordinary products"
            textAlign="center"
            fontSize={14}
            marginTop={metrics.height(10)}
            marginBottom={metrics.height(10)}
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
              <Image
                source={item.component}
                style={{
                  width: '100%',
                  height: index === 1 ? '100%' : '80%',
                  borderRadius: 10,
                  backgroundColor: Colors.alphaLightGray,
                }}
                resizeMode="cover"
              />
              {index !== 1 && (
                <View style={styles.textContainer}>
                  <CustomText
                    label={item.label}
                    fontSize={24}
                    fontFamily={Fonts.Medium}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <CustomText
          marginTop={metrics.height(30)}
          marginBottom={metrics.height(20)}
          textAlign="center"
          label="Powered by maximuseneca™ group"
          color={'#5B5B5B'}
          fontSize={16}
          fontFamily={Fonts.Regular}
        />
      </ScrollView>
    </CustomModal>
  );
};

export default CustomUserTypeModal;
