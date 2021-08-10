import React from 'react'
import { Text } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout'
import Styles from '../core/Styles'
import Button from '../components/Button'
// import Calendar from 'react-calendar'


export default function ApplyLeaves({ navigation }) {
  return (
    <BackgroundLayout>
      <Text style={Styles.header}>Leave Application Form</Text>
        <Button mode="outlined" onPress={() => navigation.navigate('ApplyLeaves')}>Apply</Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ApprovedLeaves')}>Approved</Button> 
        <Button mode="outlined" onPress={() => navigation.navigate('ManageLeaves')}>Requested</Button> 
        <Button mode="contained" onPress={() => { alert('Applied') }}>Apply</Button>
        <Button mode="contained" onPress={() => { alert('cancelled') }}>Cancel</Button>

      
    </BackgroundLayout>
  )
}
