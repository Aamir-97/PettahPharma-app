import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { theme } from '../core/theme'

export default function BackgroundLayout({ children }) {
  return (
      <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
      </View>
  )
}

const styles = StyleSheet.create({
  background: {
    padding : 20,
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',  
    minHeight: Dimensions.get('window').height,

  },
  // container: {
  //   flex: 1,
  //   padding : '20',
  //   width: '100%',
  //   maxWidth: 340,
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  // },
})
