import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './screens/Main';
import Gallery from './screens/Gallery';

import colors from './data/colors.json'
import BigPhoto from './screens/BigPhoto';

const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.bgColor} }}>
      <Stack.Screen name="main" component={Main} options={{ headerShown: false, statusBarColor: colors.bgColor }}/>
      <Stack.Screen name="gallery" component={Gallery} options={{ statusBarColor: colors.bgColor, title: "Photos Gallery" }}/> 
      <Stack.Screen name="photo" component={BigPhoto} options={{ statusBarColor: colors.bgColor, title: "Wybrane zdjęcie" }}/> 
    </Stack.Navigator>
  </NavigationContainer>
 );
}

export default App;
