import React, { useState, Component } from 'react'
import { Text, ScrollView, Picker , View, StyleSheet, TextInput, Button} from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout'
import { theme } from '../core/theme'
import Axios from 'axios'

 
export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  
 
  render(){
    return (
        <ScrollView>
        <BackgroundLayout>
        <View style={styles.visitSummaryForm}>
        <Text style={styles.header}>Add new Shedule</Text> 

        <TextInput style={styles.InputField} placeholder="Title" onChange={(e) => {
                setTitle(e.target.value)
            }} />

        <TextInput style={styles.InputField} placeholder="Location" onChange={(e) => {
                setLocation(e.target.value)
            }} />

{/* <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      /> */}

    
            <TextInput style={styles.InputField} placeholder="Location" onChange={(e) => {
                setDate(e.target.value)
            }} />

            <TextInput style={styles.InputField} placeholder="Session" onChange={(e) => {
                setSession(e.target.value)
            }} />

        <TextInput style={styles.CommentField} placeholder="Discription" onChange={(e) => {
                setDescription(e.target.value)
            }} />

        <View style={styles.sameRow}>
            <Button title="Cancel" 
            color = {theme.colors.primary}
            />
            <Button title="Submit"      
            color = {theme.colors.primary}  
            // onClick={console.log("Submit Pressed")}        
            // onPress = {()=> {SubmitTask}} 
            onPress = {()=> {SubmitTask}} 
            />


        </View>


        </View>
        </BackgroundLayout>  
    </ScrollView>



    )
  }
}


export function AddNewTask({navigation}){


    const [title , setTitle] = useState('');
    const [location , setLocation] = useState('');
    const [date , setDate] = useState('');
    const [session , setSession] = useState('');
    const [description , setDescription] = useState('');

    const SubmitTask = () => { 
        Axios.post("http://localhost:3001/newTask", {
            title: title, 
            location: location,
            date : date, 
            session: session, 
            description: description, 
        }).then(()=>{
            console.log("Succesfully Inserted:!");
            Alert.alert(
                "Database",
                "New Doctor Successfully inserted...!",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        })

    };


    return (
        <ScrollView>
            <BackgroundLayout>
            <View style={styles.visitSummaryForm}>
            <Text style={styles.header}>Add new Shedule</Text> 

            <TextInput style={styles.InputField} placeholder="Title" onChange={(e) => {
                    setTitle(e.target.value)
                }} />

            <TextInput style={styles.InputField} placeholder="Location" onChange={(e) => {
                    setLocation(e.target.value)
                }} />

            {/* <DatePicker
                style={styles.InputField}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    // position: 'absolute',
                    left: 50,
                    // right : 0,
                    // top: 4,
                    // marginLeft: 30,
                    // marginRight : 36,
                },
                dateInput: {
                    // marginLeft: 36
                    borderColor: "#B0B0B000",
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({date: date})}}
                // onDateChange={(e) => {setDate(e.target.value)}}

                // onChange={(e) => {
                //     setDate(e.target.value)
                // }}
            /> */}

        
                <TextInput style={styles.InputField} placeholder="Location" onChange={(e) => {
                    setDate(e.target.value)
                }} />


            {/* <Picker >
            <Picker.Item label="Session" value="" />
            <Picker.Item label="Morning" value="Ragular" />
            <Picker.Item label="Evening" value="Promotion Visit" />
            <Picker.Item label="Fullday" value="Appoinment" />
            </Picker> */}

                <TextInput style={styles.InputField} placeholder="Session" onChange={(e) => {
                    setSession(e.target.value)
                }} />

            <TextInput style={styles.CommentField} placeholder="Discription" onChange={(e) => {
                    setDescription(e.target.value)
                }} />

            <View style={styles.sameRow}>
                <Button title="Cancel" 
                color = {theme.colors.primary}
                />
                <Button title="Submit"      
                color = {theme.colors.primary}  
                // onClick={console.log("Submit Pressed")}        
                // onPress = {()=> {SubmitTask}} 
                onPress = {()=> {SubmitTask}} 
                />


            </View>


            </View>
            </BackgroundLayout>  
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    header : {
        fontSize : 20,
        fontWeight : 'bold',
        alignSelf : 'center',
        marginBottom : 30,
        color : theme.colors.primary
        
    },
    visitSummaryForm : {
        alignSelf : 'stretch',
        padding : 20,
    },
    InputField : {
        alignSelf : 'stretch',
        height : 35,
        marginBottom : 25,
        borderBottomColor : '#009387',
        borderBottomWidth : 1,
        fontSize : 16,
        
    },
    sameRow : {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    CommentField : {
        height : 100,
        borderColor : '#0A6466',
        borderWidth : 1,
        marginBottom : 30,
        padding : 20
    }

})