import React, { ReactNode } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeader } from '../index';
import { Colors } from '@evuro-frontend/assets';
import { useMainWrapperStyle } from '../style';

interface MainWrapperProps {
  children?: ReactNode;
  headerShown?: boolean;
  paddingHorizontal?: number;
  backgroundColor?: string;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  headerShown,
  paddingHorizontal,
  backgroundColor,
}) => {
  const styles = useMainWrapperStyle({ paddingHorizontal, backgroundColor });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={backgroundColor || Colors.white}
        barStyle="dark-content"
      />

      {!!headerShown && <CustomHeader isTitle isProfile />}

      {children}
    </SafeAreaView>
  );
};

export default MainWrapper;
