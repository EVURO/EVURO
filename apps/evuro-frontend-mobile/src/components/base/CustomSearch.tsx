import React, { FC } from 'react';
import { TextInput, View } from 'react-native';
import { Colors, Svgs } from '@evuro-frontend/assets';
import { metrics, normalizeSize } from '../../util/metrics';
import { useSearchInputStyle } from '../style';

interface SearchInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onChangeText, value }) => {
  const styles = useSearchInputStyle();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search here"
            placeholderTextColor={Colors.lightGray}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
        <Svgs.search height={normalizeSize(30)} width={normalizeSize(30)} />
      </View>
    </View>
  );
};

export default SearchInput;
