import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../utils/theme';

export default function More() {
  return (
    <View style={styles.container}>
      <Text>more</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Theme.Cultured},
});
