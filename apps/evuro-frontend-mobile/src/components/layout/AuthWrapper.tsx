import React, { ReactNode, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { CustomText, CustomButton, AuthBottomText } from '..';
import { Fonts } from '../../assets/fonts';
import { useAuthWrapperStyle } from '../style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { metrics } from '../../util/metrics';
import {
  setIsVisitor,
  setShowUserTypeModal,
  useAppDispatch,
} from '@evuro-frontend/store';

interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  buttontitle: string;
  onPress: () => void;
  ShowBottomText?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  title,
  buttontitle,
  onPress,
  ShowBottomText,
  loading,
  disabled,
}) => {
  const navigation = useNavigation();
  const styles = useAuthWrapperStyle();
  const dispatch = useAppDispatch();
  const [signUpUserType, setSignUpUserType] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingHorizontal: metrics.width(20) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.svgContainer}>
          <Svgs.Logo height={250} />
        </View>

        <CustomText label={title} fontSize={25} fontFamily={Fonts.Medium} />

        {children}

        <CustomButton
          disabled={disabled}
          loading={loading}
          title={buttontitle}
          fontSize={20}
          borderRadius={100}
          onPress={onPress}
        />

        {!!ShowBottomText && <AuthBottomText signUpUserType={signUpUserType} />}

        <View>
          {!!ShowBottomText && (
            <View style={styles.bottomText}>
              <CustomText label="Don’t have an account? " fontSize={16} />
              <CustomText
                onPress={() => {
                  dispatch(setIsVisitor(false));
                  setSignUpUserType(true);
                  dispatch(setShowUserTypeModal(true));
                  // navigation.navigate('SignUp');
                }}
                label={'Signup'}
                fontSize={16}
                fontFamily={Fonts.Bold}
                color={Colors.darkBlue}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthWrapper;
