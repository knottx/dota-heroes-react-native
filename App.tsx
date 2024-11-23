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
import {AppColors} from './src/constants/AppColors';
import {DotaHero} from './src/models/DotaHero';

export type RootStackParamList = {
  Home: undefined;
  DotaHeroDetailScreen: {hero: DotaHero};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="DotaHeroDetailScreen"
          component={DotaHeroDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
