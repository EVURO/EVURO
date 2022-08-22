import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const Component = ({source, style}) => {
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  return (
    <View
      style={
        isImageLoading && {justifyContent: 'center', alignItems: 'center'}
      }>
      <FastImage
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
        source={source}
        style={style}
      />

      {isImageLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="#999999"
          size="large"
        />
      )}
    </View>
  );
};

export default Component;
