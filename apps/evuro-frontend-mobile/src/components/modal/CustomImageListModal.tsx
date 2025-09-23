/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { View, Modal, ScrollView, Image } from 'react-native';

import { Svgs } from '@evuro-frontend/assets';
import CustomButton from '../base/CustomButton';
import { metrics } from '../../util/metrics';
import CustomText from '../base/CustomText';
import { Fonts } from '../../assets/fonts';
import CustomImage from '../base/CustomImage';
import { useCustomImageListModalStyle } from '../style';
import CustomModal from '../base/CustomModal';
import { useAppSelector } from '@evuro-frontend/store';

type DataProps = {
  path: string;
};

interface iProps {
  isVisible: boolean;
  onClose: () => void;
  data: DataProps[];
  label: string;
  onDeleteImage: (path: string) => void;
}

const CustomImageListModal: React.FC<iProps> = ({
  isVisible,
  label,
  onClose,
  onDeleteImage,
  data,
}) => {
  const { loginData } = useAppSelector((state) => state.user);
  const userType = loginData?.data?.userType;

  const styles = useCustomImageListModalStyle();
  return (
    <CustomModal
      borderTopLeftRadius={-1}
      borderTopRightRadius={-1}
      height={'100%'}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View>
        <CustomText
          label={label}
          fontFamily={Fonts.Medium}
          marginTop={metrics.height(10)}
          fontSize={24}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}
      >
        {data.map((image, index) => {
          return (
            <View key={index}>
              <Image
                source={{
                  uri: userType === 'Talent' ? image.uri : image?.path,
                }}
                resizeMode="cover"
                style={styles.emptyView}
              />
              <Svgs.deleteIconRed
                width={metrics.width(30)}
                height={metrics.width(30)}
                onPress={() =>
                  onDeleteImage(userType === 'Talent' ? image.uri : image?.path)
                }
                style={styles.icon}
              />
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.buttonView}>
        <CustomButton title={'OK'} onPress={onClose} />
      </View>
    </CustomModal>
  );
};

export default CustomImageListModal;
