import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
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
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',  
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
