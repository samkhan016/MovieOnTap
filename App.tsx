import React, {useRef} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import Theme from './src/utils/theme';
import Navigation from './src/navigations/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
export default function App() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Theme.White,
    },
  };
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
