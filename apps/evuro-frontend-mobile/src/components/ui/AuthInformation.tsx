import React, { ReactNode } from 'react';
import { SafeAreaView, View, StatusBar, DimensionValue } from 'react-native';
import { Colors } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import CustomText from '../base/CustomText';
import { Fonts } from '../../assets/fonts';
import CustomButton from '../base/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuthInformationStyle } from '../style';
import CustomHeader from './CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@evuro-frontend/store';

interface AuthInformationProps {
  children?: ReactNode;
  title: string;
  subTitle: string;
  bottomTitle: string;
  bottomSubTitle: string;
  onButtonPress?: () => void;
  onPress?: () => void;
  width?: DimensionValue;
  loading?: boolean;
  disabled?: boolean;
  isAddPets?: boolean;
  petsArray?: any[];
}

const AuthInformation: React.FC<AuthInformationProps> = ({
  children,
  title,
  subTitle,
  bottomTitle,
  bottomSubTitle,
  onButtonPress,
  onPress,
  width,
  loading,
  disabled,
  isAddPets,
  petsArray,
}) => {
  const { loginData } = useAppSelector((state) => state.user);

  const userType = loginData?.data?.userType;

  const styles = useAuthInformationStyle();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: metrics.width(20),
          marginTop: metrics.height(10),
        }}
      >
        {isAddPets && (
          <CustomHeader onBackHeader headerTitle="Add Pets" Spacer />
        )}
        {!isAddPets && (
          <View style={styles.headerContainer}>
            <CustomText
              label={title}
              fontSize={25}
              fontFamily={Fonts.Medium}
              marginTop={metrics.height(10)}
            />
            {petsArray?.length > 0 || userType === 'Talent' ? null : (
              <CustomText
                onPress={() => {
                  navigation.navigate('TabStack');
                }}
                label="Skip"
                fontSize={18}
                fontFamily={Fonts.Medium}
                marginTop={metrics.height(10)}
                color={Colors.darkBlue}
              />
            )}
          </View>
        )}
        <CustomText
          label={subTitle}
          fontSize={14}
          fontFamily={Fonts.Regular}
          width={width || '80%'}
          marginTop={metrics.height(isAddPets ? 20 : 0)}
        />

        {children}

        <CustomButton
          onPress={() => {
            if (isAddPets) {
              navigation.goBack();
            } else {
              onButtonPress();
            }
          }}
          title="Done"
          borderRadius={50}
          fontSize={20}
          loading={loading}
          disabled={disabled}
        />

        <View style={styles.bottomText}>
          <CustomText
            label={bottomTitle}
            fontSize={15}
            fontFamily={Fonts.Medium}
          />

          <CustomText
            onPress={onPress}
            label={bottomSubTitle}
            fontSize={15}
            fontFamily={Fonts.Bold}
            color={Colors.darkBlue}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthInformation;
