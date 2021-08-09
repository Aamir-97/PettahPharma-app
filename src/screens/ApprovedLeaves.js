import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
// import IconButtons from '../components/IconButtons'
// import ExampleForm from '../components/ExampleForm'
import Styles from '../core/Styles'


export default function ApprovedLeaves({ navigation }) {
  
  return (
    <Background>
      <Text style={Styles.header}>Approved Leaves</Text>
      
      {/* <IconButtons/> */}
      {/* <label> */}
        <Button mode="outlined" onPress={() => navigation.navigate('ApplyLeaves')}>Apply</Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ApprovedLeaves')}>Approved</Button> 
        <Button mode="outlined" onPress={() => navigation.navigate('ManageLeaves')}>Requested</Button> 
      {/* </label> */}
      {/* <ExampleForm/>
      <ExampleForm/>
      <ExampleForm/> */}
    </Background>
  )
}

// const styles = StyleSheet.create({
//   button: {
//     width: '50%',
//     marginVertical: 5,
//     paddingVertical: 1,
//   },
//   text: {
//     fontSize: 10,
//     lineHeight: 18,
//   },
// })
