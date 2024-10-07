import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomImage from '../../../base/CustomImage';
import { metrics } from 'apps/evuro-frontend-mobile/src/util/metrics';

function Buttons({
  customComponent,
  name,
  text,
  color = 'white',
  size = 30,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}
    >
      {customComponent ? (
        customComponent
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name={name} color={color} size={size} />

          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: metrics.height(5),
                color: 'white',
              }}
            >
              {text}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: metrics.height(12),
    marginBottom: metrics.height(15),
  },
});
