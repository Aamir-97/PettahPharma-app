import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Styles from '../core/Styles'

export default function ExpensesMng({ navigation }) {
  return (
    <Background>
      <Logo />
      <Text style={Styles.header}>Let’s start</Text>
      <Paragraph>
        Expenses Manager Page Checking, Nimni's edit
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
