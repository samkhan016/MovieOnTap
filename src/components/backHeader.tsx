import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Theme from '../utils/theme';

interface BackHeaderProps {
  tintColor?: string;
  onPress?: (event: Event) => void;
}

export default function BackHeader({tintColor, onPress}: BackHeaderProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress as any}>
      <Image
        source={require('../assets/back.png')}
        style={styles(tintColor).backImg}
      />
    </TouchableOpacity>
  );
}

const styles = (props?: string) =>
  StyleSheet.create({
    backImg: {
      width: 30,
      height: 30,
      left: widthPercentageToDP(2),
      tintColor: props ? props : Theme.Gunmetal,
    },
  });
