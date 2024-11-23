import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/dashboard';
import CategoryMovies from '../screens/categoryMovies';

export default function CategoryStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={Dashboard} />
      <Stack.Screen
        name="CategoryMovies"
        component={CategoryMovies}
        options={{
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
