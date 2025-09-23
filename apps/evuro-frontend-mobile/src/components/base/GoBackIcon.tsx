import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';
import { useGoBackIconStyle } from '../style';
import { metrics } from '../../util/metrics';

interface GoBackIconProps {
  borderWidth?: number;
  borderColor?: string;
  marginLeft?: number;
  onForword?: boolean;
  onBackPress?: () => void;
}

const GoBackIcon: React.FC<GoBackIconProps> = ({
  borderWidth,
  borderColor,
  marginLeft,
  onForword,
  onBackPress,
}) => {
  const navigation = useNavigation();
  const styles = useGoBackIconStyle({
    borderColor,
    borderWidth,
    marginLeft,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={onForword}
      onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
      style={styles.mainContainer}
    >
      <Icons
        family="MaterialIcons"
        name={onForword ? 'chevron-right' : 'keyboard-arrow-left'}
        size={metrics.width(28)}
      />
    </TouchableOpacity>
  );
};

export default GoBackIcon;
