import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React from 'react';

const OnBoardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <View style={{}}>
        <Image
          source={item.image}
          style={[styles.imge, {width, resizeMode: 'contain'}]}
        />
        <View style={{flex: 0.3}}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    height: 440,
    marginRight: 20,

    width: 220,
    borderWidth: 1,
    paddingHorizontal: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  imge: {
    flex: 0.7,
    justifyContent: 'center',
    height: 220,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
});
