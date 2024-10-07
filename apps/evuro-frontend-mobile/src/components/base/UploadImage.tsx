import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Modal } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from './CustomText';
import { Colors } from '@evuro-frontend/assets';
import { useUploadImage } from '../style';
import { Fonts } from '../../assets/fonts';
import { onCamera, onGallery } from '../../util/Halper';

const UploadPhoto = ({ handleChange, isVideo = false, ...props }) => {
  const styles = useUploadImage();
  const [imageModal, setImageModal] = useState(false);

  const takePhotoFromCamera = () => {
    try {
      let imageOption = {};
      if (isVideo) {
        imageOption = {
          mediaType: 'video',
          compressVideoPreset: 'MediumQuality',
        };
      } else {
        imageOption = {
          mediaType: 'photo',
          quality: 1,
          cropping: true,
          compressImageQuality: 0.8,
          compressImageMaxHight: 1280,
          compressImageMaxWidth: 1280,
          forceJpg: true,
        };
      }
      setImageModal(false);
      onCamera({ imageOption, handleChange: handleChange });
    } catch (error) {
      console.log('error====', error);
    }
  };

  const takePhotoFromLibrary = async () => {
    try {
      let imageOption = {};
      if (isVideo) {
        imageOption = {
          mediaType: 'video',
          compressVideoPreset: 'MediumQuality',
        };
      } else {
        imageOption = {
          mediaType: 'photo',
          cropping: true,
          quality: 0.8,
          compressImageQuality: 0.8,
          compressImageMaxHight: 1280,
          compressImageMaxWidth: 1280,
          forceJpg: true,
        };
      }
      setImageModal(false);
      onGallery({ imageOption, handleChange: handleChange });
    } catch (error) {
      console.log('takePhotoFromLibrary error', error);
    }
  };
  const ModalIcons = ({ source, title, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.modalIcon}>
          <Entypo name={source} size={80} color={Colors.black} />
        </View>
        <CustomText
          label={title}
          fontFamily={Fonts.Bold}
          color={Colors.black}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={!props.renderButton && styles.container}>
      {!props.renderButton ? (
        <>
          <View style={props.imageContainer}>
            <Image
              source={
                props.image
                  ? { uri: props.image }
                  : props.placeholder || {
                      uri: 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png',
                    }
              }
              style={styles.image}
            />
          </View>
          {!props.disabled && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.iconStyle, props.iconStyle]}
              onPress={() => setImageModal(true)}
            >
              <Entypo
                name="camera"
                color={props.iconColor || 'black'}
                size={17}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        props.renderButton(() => setImageModal(true))
      )}
      <Modal transparent={true} visible={imageModal} animationType="slide">
        <TouchableOpacity
          style={styles.headModalContainer}
          onPress={() => setImageModal(false)}
          activeOpacity={0.0}
        >
          <View style={styles.modalContainer}>
            <CustomText
              label="Choose Media From"
              fontSize={20}
              color="black"
              fontFamily={Fonts.Medium}
              alignSelf="center"
            />
            <View style={styles.modalIconContainer}>
              <ModalIcons
                source={'image'}
                title="Phone Storage"
                onPress={takePhotoFromLibrary}
              />
              <ModalIcons
                source={'camera'}
                title="Open Camera"
                onPress={takePhotoFromCamera}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default UploadPhoto;
