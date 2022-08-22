import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import CustomText from '../../../common/components/CustomText';
import Card from './items/Card';
import CustomHeader from '../../../common/components/CustomHeader';
import colors from '../../../util/colors';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showVerticalIndicator={false}>
        <CustomHeader
          title="Home"
          family="Ionicons"
          name="reorder-three"
          color={colors.white}
          size={verticalScale(20)}
          onPress={() => navigation.openDrawer()}
        />
        <View style={styles.card}>
          <Card label="Food" />
          <Card label="Handle" />
          <Card label="Pura" />
          <Card label="Cllctv" />
          <Card label="Health & wellness" />
          <Card label="Crawl" />
          <Card label="Badu55" />
          <Card label="Walking" />
          <Card label="Grooming" />

          <Card label="Boarding" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: verticalScale(16),
    marginHorizontal: scale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
