import { useGetImageUrlQuery } from '@evuro-frontend/store';
import React, { useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleProp, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageModal from 'react-native-image-modal';
import { placeholderImage } from '../../util/Halper';
import { Colors } from '@evuro-frontend/assets';

interface iProps {
  url: string;
  style?: StyleProp<ImageStyle>;
  useModel?: boolean;
  isUser?: boolean;
}

const CustomImage: React.FC<iProps> = ({ url, style, useModel, isUser }) => {
  const { data } = useGetImageUrlQuery(url);

  // console.log('==========dataaaa============', data);

  const [isImageLoading, setIsImageLoading] = useState(false);

  if (useModel) {
    return (
      <>
        <ImageModal
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          resizeMode="cover"
          modalImageResizeMode="contain"
          source={{
            uri: data?.data ? data?.data : url,
          }}
          style={style}
        />
        {isImageLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            color={Colors.alphaLightGray}
            size="large"
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <FastImage
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          source={{
            uri:
              url && data?.data ? data?.data : isUser ? placeholderImage : url,
          }}
          style={style}
        />
        {isImageLoading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            color={Colors.alphaLightGray}
            size="large"
          />
        )}
      </>
    );
  }
};

export default CustomImage;
