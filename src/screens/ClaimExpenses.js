import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Styles from '../core/Styles'
import Button from '../components/Button'

export default function ClaimExpenses({ navigation }) {
  return (
    <Background>
      <Text style={Styles.header}>Claim Expenses</Text>
      <Button mode="contained" onPress={() => { alert('Submitted') }}>Submit</Button>
      <Button mode="contained" onPress={() => { alert('Cancelled') }}>Cancel</Button>
    </Background>
  )
}
