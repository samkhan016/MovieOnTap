import {StyleSheet, View} from 'react-native';
import React from 'react';
import Theme from '../utils/theme';

export default function MediaLibrary() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Theme.Cultured},
});
