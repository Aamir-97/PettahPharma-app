// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, StatusBar ,View } from 'react-native';
import Routes from './Routes';
import Constants from 'expo-constants';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <Routes />    
    </View>

  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1'
  }

});
