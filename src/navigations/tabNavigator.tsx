import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Watch from '../screens/watch';
import MediaLibrary from '../screens/mediaLibrary';
import More from '../screens/more';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Theme from '../utils/theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CategoryStack from './categoryStack';

export default function TabNavigator(props?: any) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles().tabBarStyle,
        tabBarActiveTintColor: Theme.White,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={CategoryStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/dashboard.png')}
              style={styles(focused).tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Watch"
        component={Watch}
        options={{
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => props?.navigation?.navigate('Search')}>
              <Image
                source={require('../assets/search.png')}
                style={styles().searchIcon}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/watch.png')}
              style={styles(focused).tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Media Library"
        component={MediaLibrary}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/mediaLibrary.png')}
              style={styles(focused).tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/more.png')}
              style={styles(focused).tabIconMore}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = (props?: boolean) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: Theme.Gunmetal,
      borderRadius: 27,
      paddingTop: heightPercentageToDP(1),
      height: heightPercentageToDP(8),
    },
    tabIcon: {
      width: 16,
      height: 16,
      tintColor: props ? Theme.White : Theme.Gray,
    },
    tabIconMore: {
      width: 24,
      height: 24,
      tintColor: props ? Theme.White : Theme.Gray,
    },
    searchIcon: {width: 45, height: 45},
  });
