// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,StatusBar ,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes'
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style ={styles.container}>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1'
  }

});
