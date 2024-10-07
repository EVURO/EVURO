import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics } from '../../../../util/metrics';
import { CustomText, Icons } from '../../../../components/index';
import { Fonts } from '../../../../assets/fonts';
import { useHeaderMoleculeStyle } from './style';
import CustomImage from 'apps/evuro-frontend-mobile/src/components/base/CustomImage';

interface HeaderMoleculeProps {
  onVideoCall: () => void;
  onAudioCall: () => void;
  title: string;
  image: string;
}

const HeaderMolecule: React.FC<HeaderMoleculeProps> = ({
  onVideoCall,
  onAudioCall,
  image,
  title,
}) => {
  const styles = useHeaderMoleculeStyle();
  // console.log('images============', image);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.imgContainer}>
            {image ? (
              <CustomImage
                url={image}
                style={{ height: '100%', width: '100%' }}
              />
            ) : (
              <Svgs.trailer height="100%" width="100%" />
            )}
          </View>
          <CustomText
            label={title}
            marginLeft={metrics.width(13)}
            fontSize={15}
            fontFamily={Fonts.Medium}
            color={Colors.white}
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={onVideoCall}>
            <Icons
              family="FontAwesome5"
              name="video"
              color={Colors.white}
              size={20}
              style={styles.videoIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} onPress={onAudioCall}>
            <Icons
              family="FontAwesome5"
              name="phone-alt"
              color={Colors.white}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderMolecule;
