/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/modules/home/HomeScreen';
import DotaHeroDetailScreen from './src/modules/dota-hero-detail/DotaHeroDetailScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DotaHeroDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
