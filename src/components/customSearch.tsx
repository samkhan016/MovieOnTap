import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

interface CustomSearchProps {
  setIsSearch: (value: boolean) => void;
}

export default function CustomSearch({setIsSearch}: CustomSearchProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => setIsSearch(true)}>
      <Image
        source={require('../assets/search.png')}
        style={styles.searchIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    width: 45,
    height: 45,
  },
});
