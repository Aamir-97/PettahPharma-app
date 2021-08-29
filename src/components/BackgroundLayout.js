import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Dimensions, ImageBackground } from 'react-native'
import { theme } from '../core/theme'

export default function BackgroundLayout({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    padding : 20,
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',  
    minHeight: Dimensions.get('window').height,
    // fontSize : 25
  },
})
