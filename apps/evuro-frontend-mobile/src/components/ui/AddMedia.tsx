/* eslint-disable react/jsx-pascal-case */
import { TouchableOpacity, View, Image } from 'react-native';
import { useAddMediaStyle } from '../style';
import CustomText from './CustomText';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../util/metrics';
import { Fonts } from '../../assets/fonts';
import { useState } from 'react';
import CustomImage from '../base/CustomImage';
import CustomImageListModal from '../modal/CustomImageListModal';
import DeviceInfo from 'react-native-device-info';
import { useAppSelector } from '@evuro-frontend/store';

interface AddMediaProps {
  heading: string;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  OndeleteImage: (path: string) => void;
  images: [object];
  borderColor: string;
}

const AddMedia: React.FC<AddMediaProps> = ({
  heading,
  onCameraPress,
  onGalleryPress,
  OndeleteImage,
  images,
  borderColor,
}) => {
  const [isImagesModelVisible, setImageMOdelVisible] = useState(false);
  const { loginData } = useAppSelector((state) => state.user);

  const userType = loginData?.data?.userType;

  const styles = useAddMediaStyle();
  const isTablet = DeviceInfo.isTablet();

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomText label={heading} fontSize={18} fontFamily={Fonts.Medium} />
        <CustomText
          label={'(1 to 12 images)'}
          fontSize={13}
          color={Colors.lightGray}
          fontStyle="italic"
        />
      </View>

      <View
        style={[
          styles.Container,
          {
            borderColor: borderColor || '#959595',
          },
        ]}
      >
        <View style={styles.icons}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onCameraPress}
            style={styles.icon}
          >
            <Svgs.cameraWhite
              height={metrics.height(30)}
              width={metrics.width(30)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onGalleryPress}
            style={styles.icon}
          >
            <Svgs.gallery
              height={metrics.height(30)}
              width={metrics.width(30)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.images}>
          {images.slice(0, 9).map((im, ind) => {
            return ind < 8 ? (
              <View key={ind}>
                <CustomImage
                  url={userType === 'Talent' ? im?.uri : im?.path}
                  style={styles.emptyView}
                />
                <Svgs.deleteIconRed
                  width={metrics.width(isTablet ? 25 : 20)}
                  height={metrics.width(isTablet ? 25 : 20)}
                  onPress={() =>
                    OndeleteImage(userType === 'Talent' ? im?.uri : im?.path)
                  }
                  style={styles.deleteIcon}
                />
              </View>
            ) : (
              <View style={styles.moreImageButton} key={ind}>
                <Image
                  resizeMode="cover"
                  source={{ uri: userType === 'Talent' ? im?.uri : im?.path }}
                  style={{
                    ...styles.emptyView,
                    position: 'absolute',
                    opacity: 0.4,
                  }}
                />
                <CustomText
                  label="More images"
                  fontSize={12}
                  color={'black'}
                  textAlign="center"
                  fontFamily={Fonts.Bold}
                  onPress={() => setImageMOdelVisible(true)}
                />
              </View>
            );
          })}
          {images.length < 9 &&
            new Array(9 - images.length)
              .fill('')
              .map((item, index) => (
                <View key={index} style={styles.emptyView} />
              ))}

          <CustomImageListModal
            onDeleteImage={OndeleteImage}
            data={images}
            label={'Pet Images'}
            isVisible={isImagesModelVisible}
            onClose={() => setImageMOdelVisible(false)}
          />
        </View>
      </View>
    </View>
  );
};

export default AddMedia;
