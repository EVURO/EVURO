import CustomTextArea from '../../../../components/base/CustomTextArea';
import { View } from 'react-native';
import { useWalkPlannerStyle } from '../style';

interface RequirementsSelectionProps {
  requirements: string;
  onChange?: (e: string) => void;
  editable?: boolean;
}

const RequirementsSelection: React.FC<RequirementsSelectionProps> = ({
  requirements,
  onChange,
  editable,
}) => {
  const styles = useWalkPlannerStyle();
  return (
    <View style={styles.requirementsContainer}>
      <CustomTextArea
        label="Requirements"
        placeholder="Enter your requirements"
        value={requirements}
        onChangeText={onChange}
        editable={editable}
      />
    </View>
  );
};

export default RequirementsSelection;
