import React from 'react'
import { Text } from 'react-native'
// import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Background from '../components/Background'
import Styles from '../core/Styles'
import Button from '../components/Button'
import Calendar from 'react-calendar'
// import DatePicker from '../components/DatePicker'
// import DropdownMenu from '../components/DropdownMenu'
// import IconButtons from '../components/IconButtons'
//import 'react-calendar/dist/Calendar.css';

export default function ApplyLeaves({ navigation }) {
  return (
    <Background>
      <Text style={Styles.header}>Leave Application Form</Text>
      {/* <IconButtons/> */}
      {/* <div> */}
        <Button mode="outlined" onPress={() => navigation.navigate('ApplyLeaves')}>Apply</Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ApprovedLeaves')}>Approved</Button> 
        <Button mode="outlined" onPress={() => navigation.navigate('ManageLeaves')}>Requested</Button> 
      {/* </div> */}
      <Calendar />
      <div>
        <form>
          <label>
            Med Rep ID:<input type="text" />
          </label>
          <label>
            {/* Leave Type:<DropdownMenu /> */}
          </label>
          <label>
            {/* Date:<DatePicker /> */}
          </label>
          <label>
            Duration:<input type="text" />
          </label>
          <label>
            {/* Description:<TextareaAutosize aria-label="minimum height" minRows={3} /> */}
          </label>
        </form>
      </div>
      <div>
        <Button mode="contained" onPress={() => { alert('Applied') }}>Apply</Button>
        <Button mode="contained" onPress={() => { alert('cancelled') }}>Cancel</Button>
      </div>
      
    </Background>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   button: {
//     backgroundColor: 'green',
//     width: '40%',
//     height: 40
//   }
// });

// .react-calendar__month-view__weekdays {
//     color: gray;
//   }
  
//   .react-calendar__navigation button {
//     font-size: 1em;
//   }