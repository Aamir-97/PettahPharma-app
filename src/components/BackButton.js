import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../core/theme'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      /> */}
      <FontAwesome5Icon
        name="angle-double-left" 
        color={theme.colors.primary}
        size={25}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
