import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Styles from '../core/Styles'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Text style={Styles.header}>Wel Come To Pettah Pharma (Pvt) Ltd. </Text>
      <Paragraph>
          Application for Medical Reperesentatives in PettahPharma.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
    </Background>
  )
}
