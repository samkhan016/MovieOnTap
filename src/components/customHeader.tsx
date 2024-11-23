import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Theme from '../utils/theme';

interface CustomHeaderProps {
  isVisible: (value: boolean) => void;
  value: string;
  OnTextChange?: (text: string) => void;
}

export default function CustomHeader({
  isVisible,
  value,
  OnTextChange,
}: CustomHeaderProps) {
  return (
    <View style={styles.searchBarContainer}>
      <Image
        source={require('../assets/search.png')}
        style={styles.searchIcon}
      />
      <TextInput
        autoFocus={true}
        placeholderTextColor={Theme.Gray}
        placeholder="TV shows, movies and more"
        value={value}
        onChangeText={OnTextChange}
        style={styles.textInput}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          isVisible(false);
        }}>
        <Image
          source={require('../assets/close.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: Theme.AntiFlashWhite,
    width: widthPercentageToDP(92),
    height: 52,
    borderRadius: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 45,
    height: 45,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Theme.Black,
  },
  closeIcon: {
    width: 36,
    height: 36,
    marginLeft: 10,
  },
});
