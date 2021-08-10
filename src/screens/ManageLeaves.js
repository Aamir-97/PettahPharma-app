import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import Styles from '../core/Styles'


export default function ManageLeaves({ navigation }) {
  return (
    <Background>
      <Text style={Styles.header}> Requested Leaves </Text>
        <Button mode="outlined" onPress={() => navigation.navigate('ApplyLeaves')}>Apply</Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ApprovedLeaves')}>Approved</Button> 
        <Button mode="outlined" onPress={() => navigation.navigate('ManageLeaves')}>Requested</Button> 
    </Background>
  )
}