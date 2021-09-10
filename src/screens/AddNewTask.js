import React, { useState, Component, useEffect } from 'react'
import { Text, ScrollView, Picker , View, StyleSheet, AsyncStorage, Alert, SafeAreaView} from 'react-native'
import { TextInput, IconButton } from 'react-native-paper'
import { Button } from 'react-native-paper'
import BackgroundLayout from '../components/BackgroundLayout'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { requiredField } from '../helpers/requiredField'
import FontistoIcon from 'react-native-vector-icons/Fontisto'



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
            // const rep_ID = profile.rep_ID;
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
        // created_at : new Date(now()),
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

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);

    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    // const showTimepicker = () => {
    //   showMode('time');
    // };

        //   Date convertor
        const dtt = new Date(scheduleFormDetails.date);
        const year = dtt.getFullYear() + '/';
        const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
        const day = ('0' + dtt.getDate()).slice(-2);


    // useEffect for display the date formate in textfield
    useEffect(() => {
        //   Date convertor
      const dtt = new Date(date);
      const year = dtt.getFullYear() + '/';
      const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dtt.getDate()).slice(-2);
      setSheduleFormDetails ({...scheduleFormDetails, date : year+month+day})        
      },[date]);

      const checkAvailable = () =>{
        //   console.log("checkAvailable function working...!");
          try {
            axios.post("http://10.0.2.2:3001/Task/CheckAvailability", {            
                rep_ID : user.rep_ID,
                date : scheduleFormDetails.date,
                session : scheduleFormDetails.session,
            }).then((response)=>{
                // console.log("Succesfully Inserted:!");
                console.log(response.data[0].repAvailable);
                if (response.data[0].repAvailable === 1) {
                    SubmitTask();
                } else {
                    Alert.alert(
                        "Attention.....!",
                        "You already on assigned...!",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => console.log("Ok pressed") }
                        ]
                      )
                }
            })
          } catch (err) {
                console.log(err, "Error while check availability for task");
          }

      }

      const checkRequired = () => {

        const title = requiredField(scheduleFormDetails.title)
        const location = requiredField(scheduleFormDetails.location)
        // const date = requiredField({...scheduleFormDetails.date})
        const session = requiredField(scheduleFormDetails.session)
        // console.log(title , location , session, "check the required var.");
        if (title || location || session) {
            Alert.alert(
                "Attention.....!",
                "Please fill the required field...!",
                [
                  {
                    text: "Cancel",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("Ok pressed") }
                ]
              )
              return 
        } else {
            checkAvailable();
        }

      }


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
                    <View style = {styles.sameRow}> 
                        <FontistoIcon
                            name="star" 
                            color={theme.colors.error}
                            size={10}
                            style= {{margin : 4}}
                        />
                        <Text style={{color : 'red'}}>Required field</Text>
                    </View>                  


                <TextInput 
                    label= 'Location'
                    mode= 'outlined'
                    outlineColor = {theme.colors.primary}
                    style={styles.InputField} 
                    placeholder="Ex: Clinic Name or Place" 
                    style={styles.InputField} 
                    onChangeText={(text) => {setSheduleFormDetails({...scheduleFormDetails, location:text})}} 

                 />
                    <View style = {styles.sameRow}> 
                        <FontistoIcon
                            name="star" 
                            color={theme.colors.error}
                            size={10}
                            style= {{margin : 4}}
                        />
                        <Text style={{color : 'red'}}>Required field</Text>
                    </View>  
            

                        <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>

                            <View style={{flex : 2}}>
                                <TextInput
                                    editable = {false}
                                    label= 'Date'
                                    mode= 'outlined'
                                    outlineColor = {theme.colors.primary}
                                    style={styles.InputField} 
                                    // placeholder="Ex:(YYYY-MM-DD)"
                                    value= {year+month+day}
                                    onChangeText={(text) => {setSheduleFormDetails({...scheduleFormDetails, date:text})}} 
                                />
                                    <View style = {styles.sameRow}> 
                                        <FontistoIcon
                                            name="star" 
                                            color={theme.colors.error}
                                            size={10}
                                            style= {{margin : 4}}
                                        />
                                        <Text style={{color : 'red'}}>Required field</Text>
                                    </View> 

                            </View>

                            <View style={{flex : 2}}>
                                <IconButton
                                    style = {{margin : -8}}
                                    icon="calendar"
                                    color= {theme.colors.primary}
                                    size={45}
                                    onPress={() => {showDatepicker()}}
                                />
                                <Text style = {{color : 'red', fontSize : 10}} > Click Calendar</Text>

                            </View>

                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                minimumDate = {new Date()}
                                />
                            )}
                        </View>

                    <View style={styles.dropDownField}>
                        <Picker 
                                selectedValue={scheduleFormDetails.session}
                                onValueChange={(itemValue, itemIndex) => setSheduleFormDetails({ ...scheduleFormDetails, session: itemValue })}
                                >
                            <Picker.Item label="Select Time Slot" value="" style = {{color : 'red'}}/>
                            <Picker.Item label="Morning" value="Morning" />
                            <Picker.Item label="Evening" value="Evening" />
                            <Picker.Item label="Full-Day" value="Full-Day" />
                        </Picker>

                    </View>
                    <View style = {styles.sameRow}> 
                            <FontistoIcon
                                name="star" 
                                color={theme.colors.error}
                                size={10}
                                style= {{margin : 4}}
                            />
                            <Text style={{color : 'red'}}>Required field</Text>
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
                    icon = "alarm-multiple"
                    mode="contained" 
                    // onPress={() => SubmitTask()}>
                    // onPress={() => checkAvailable()}>
                    onPress={() => checkRequired()}>
                        Schedule
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
        height : 45,
        marginBottom : 5,
        fontSize : 16,
        // borderColor : theme.colors.primary,
        // borderWidth : 1,
        // borderRadius : 5
        
    },
    dropDownField : {
        height : 45,
        marginBottom : 5,
        fontSize : 16,
        borderColor : theme.colors.primary,
        borderWidth : 1,
        borderRadius : 5,
        backgroundColor : '#F1F1F1'
        
    },
    sameRow : {
        flexDirection : 'row',
        // justifyContent: 'space-between',
    },
    CommentField : {
        height : 100,
        // alignSelf : 'stretch',
        marginBottom : 20,
        // padding : 20,
        fontSize : 16,

    }

})