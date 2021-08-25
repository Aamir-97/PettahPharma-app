import React, { useState, Component, useEffect } from 'react'
import { Text, ScrollView, Picker , View, StyleSheet, AsyncStorage, Alert, SafeAreaView} from 'react-native'
import { TextInput } from 'react-native-paper'
import { Button } from 'react-native-paper'
import BackgroundLayout from '../components/BackgroundLayout'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'


import axios from 'axios'

export default function AddNewTask({navigation}){

    const [user, setUser] = React.useState({ 
        rep_ID: '', 
        manager_ID: '',
      });

  
    useEffect(() => {
      async function fetchData(){
        try {
          const userProfile = await AsyncStorage.getItem('user');
          const profile  = JSON.parse(userProfile); 
          if (profile !== null ){
            setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });        
            const rep_ID = profile.rep_ID;
            // Call any function
          }      
        } catch (e){
          console.log(e);
        }
      }
      fetchData();
    },[]);  

    const [scheduleFormDetails, setSheduleFormDetails] = React.useState({
        title : '',
        location : '',
        date : '',
        session : '',
        description : '',
    })
  

    const SubmitTask = () => { 
        axios.post("http://10.0.2.2:3001/task/submitScheduleForm", {            
            title: scheduleFormDetails.title, 
            location: scheduleFormDetails.location,
            date : scheduleFormDetails.date, 
            session: scheduleFormDetails.session, 
            description: scheduleFormDetails.description,
            manager_ID : user.manager_ID,
            rep_ID: user.rep_ID, 
        }).then((response)=>{
            // console.log("Succesfully Inserted:!");
            Alert.alert(
                "Database",
                "New Shedule inserted...!",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => navigation.navigate('Home') }
                ]
              );
        })

    };


    return (
        <SafeAreaView>
        <ScrollView>
            <BackgroundLayout>
            <View style={styles.visitSummaryForm}>

                <View style={{alignSelf: 'center'}}>
                    <View style={styles.sameRow}>
                        <Icon name="add-task" color={theme.colors.primary} size={30} />              
                        <Text style={styles.header}>  Add Shedule</Text> 
                    </View>
                    
                </View>


                <TextInput 
                    label= 'Title'
                    mode= 'outlined'
                    outlineColor = {theme.colors.primary}
                    style={styles.InputField} 
                    placeholder="Ex: Appoinment" 
                    onChangeText={(text) => {setSheduleFormDetails({...scheduleFormDetails, title:text})}} 
                />

                <TextInput 
                    label= 'Location'
                    mode= 'outlined'
                    outlineColor = {theme.colors.primary}
                    style={styles.InputField} 
                    placeholder="Ex: Clinic Name or Place" 
                    style={styles.InputField} 
                    onChangeText={(text) => {setSheduleFormDetails({...scheduleFormDetails, location:text})}} 

                 />
            
                    <TextInput 
                        label= 'Date'
                        mode= 'outlined'
                        outlineColor = {theme.colors.primary}
                        style={styles.InputField} 
                        placeholder="Ex:(YYYY-MM-DD)" 
                        onChangeText={(text) => {setSheduleFormDetails({...scheduleFormDetails, date:text})}} 
                     />

                    <View style={styles.InputField}>
                        <Picker 
                                selectedValue={scheduleFormDetails.session}
                                onValueChange={(itemValue, itemIndex) => setSheduleFormDetails({ ...scheduleFormDetails, session: itemValue })}
                                >
                            <Picker.Item label="Time Session" value="" />
                            <Picker.Item label="Morning" value="Morning" />
                            <Picker.Item label="Evening" value="Evening" />
                            <Picker.Item label="Full-Day" value="Full-Day" />
                        </Picker>
                    </View>

                <TextInput 
                    label= 'Description'
                    mode= 'outlined'
                    multiline 
                    numberOfLines =  {5}
                    outlineColor = {theme.colors.primary}
                    style={styles.CommentField} 
                    placeholder="Type something about the schedule" 
                    onChangeText={(text) => {setSheduleFormDetails({...scheduleFormDetails, description:text})}} 
                />


                <Button 
                    mode="contained" 
                    onPress={() => SubmitTask()}>
                        Submit
                </Button>

            </View>
            </BackgroundLayout>  
        </ScrollView>
        </SafeAreaView>
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
        height : 50,
        marginBottom : 10,
        fontSize : 16,
        
    },
    sameRow : {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    CommentField : {
        height : 100,
        alignSelf : 'stretch',
        marginBottom : 30,
        padding : 20,
        fontSize : 16,

    }

})