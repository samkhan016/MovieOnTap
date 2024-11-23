import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './tabNavigator';
import MovieDetail from '../screens/movieDetail';
import Booking from '../screens/booking';
import SearchMovie from '../screens/searchMovie';
import BackHeader from '../components/backHeader';
import Theme from '../utils/theme';
import {useNavigation} from '@react-navigation/native';
import SeatSelection from '../screens/seatSelection';

export default function Navigation() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TABS"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={MovieDetail}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: '',
          headerLeft: () => (
            <BackHeader
              tintColor={Theme.White}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => (
            <BackHeader
              tintColor={Theme.Gunmetal}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SeatSelection"
        component={SeatSelection}
        options={{
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerLeft: () => (
            <BackHeader
              tintColor={Theme.Gunmetal}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen name="Search" component={SearchMovie} />
    </Stack.Navigator>
  );
}
