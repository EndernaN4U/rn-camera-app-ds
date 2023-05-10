import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './components/LandingPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="main" component={LandingPage} />
    </Stack.Navigator>
  </NavigationContainer>
 );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
