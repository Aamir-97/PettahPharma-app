import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet,Image, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import axios from 'axios';


export default function ViewTask ({route, navigation}){

    const {task_id}= route.params;

    const [taskDetails, setTaskDetails] = React.useState({
        title : '',
        location : '',
        date : '',
        session : '',
        description : '',
        status : '',
        type : '',
        rep_note : '',
        created_at : '',
    })

    const [scheduleType, setScheduleType] = React.useState(false);
    const [taskType, setTaskType] = React.useState(false);
    const [completeButton, setCompleteButton] = React.useState(false);



    useEffect(() => {
      async function fetchData(){
        try{  
          if (taskDetails.type === "Schedule"){
            setScheduleType(true);
            setTaskType(false)
          } else if (taskDetails.type === "task" && taskDetails.status === "Accept") {
            setCompleteButton(true);
            setTaskType(false);
          } else {
            setTaskType(true);
            setScheduleType(false);
          }     
        } catch (err) {    

        } 
      } fetchData();
    },[taskDetails]);

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/Task/ViewTask",{
            task_id : task_id,  
        }).then((response)=>{
            setTaskDetails({...taskDetails,
            title : response.data[0].title,
            location : response.data[0].location,
            date : response.data[0].date,
            session : response.data[0].session,
            description : response.data[0].description,      
            status : response.data[0].status,      
            type : response.data[0].type,      
            rep_note : response.data[0].rep_note,      
            created_at : response.data[0].created_at,      
        });
          // console.log({...taskList});
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while get product details for View");  
        } 
      } fetchData();
    },[]);

  // For Task Date
  const dtt = new Date(taskDetails.date);
  const year = dtt.getFullYear() + '/';
  const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
  const day = ('0' + dtt.getDate()).slice(-2);

  // For task created date 
  const dtt2 = new Date(taskDetails.created_at);
  const year2 = dtt2.getFullYear() + '/';
  const month2 = ('0' + (dtt2.getMonth() + 1)).slice(-2) + '/';
  const day2 = ('0' + dtt2.getDate()).slice(-2);

  const completeTask = () => {
      // console.log("Completed pressed");     
          axios.post("http://10.0.2.2:3001/Task/CompleteTask",{
          task_id : task_id,
          rep_note : taskDetails.rep_note        
      }).then((response)=>{
        // console.log("Task completd..!");
        Alert.alert(
            "Task Completed",
            "Your completed task submitted...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.navigate('Home')}}
            ]
          ); 
      });
  }

  const rejectTask = () => {
    try{  
          axios.post("http://10.0.2.2:3001/Task/RejectTask",{
          task_id : task_id,
          rep_note : taskDetails.rep_note        
      }).then((response)=>{
        // console.log("Task rejected Successfully");
        Alert.alert(
            "Task Rejected",
            "Your rejected the task...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.navigate('Home')}}
            ]
          ); 
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while complete the task");  
      }

  }

  const deleteSchedule = () => {
    try{  
          axios.post("http://10.0.2.2:3001/Task/DeleteSchedule",{
          task_id : task_id,
          // rep_note : taskDetails.rep_note        
      }).then((response)=>{
        // console.log("Task rejected Successfully");
        Alert.alert(
            "Schedule Deleted",
            "Your Schedule is removed from your list...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.navigate('Home')}}
            ]
          ); 
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while complete the task");  
      }

  }

  const rejectConfirmation = () => { 
    Alert.alert(
        "Here You....!",
        "Are you sure want to reject the task?",
        [
            {
            text: "NO",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
            },
            { text: "YES", onPress: () => rejectTask()}
        ]
        );

  }

  const deleteConfirmation = () => { 
    Alert.alert(
        "Here You....!",
        "Are you sure want to delete schedule?",
        [
            {
            text: "NO",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
            },
            { text: "YES", onPress: () => deleteSchedule()}
        ]
        );

  }


  const acceptTask = () => { 
    try{  
      axios.post("http://10.0.2.2:3001/Task/AcceptTask",{
      task_id : task_id,
    }).then((response)=>{
      setCompleteButton(true);
    });
    } catch (err) {    
      console.log(err);
      console.log("Error while complete the task");  
    }
  }

   
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}>
                        <FontAwesome5Icon name= "tasks" size= {30} color={theme.colors.primary} />
                        <Text style={styles.header}>Task or Shedule Details</Text> 
                        </View>
                    </View>

                    <View style ={styles.productContainer}> 
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Type : </Text>
                            <Text style={styles.text}>{taskDetails.type}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Title : </Text>
                            <Text style={styles.text}>{taskDetails.title}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Location : </Text>
                            <Text style={styles.text}>{taskDetails.location}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Date : </Text>
                            <Text style={styles.text}> {year + month + day} </Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Session : </Text>
                            <Text style={styles.text}> {taskDetails.session} </Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Assigned Date : </Text>
                            <Text style={styles.text}> {year2 + month2 + day2} </Text>
                        </View>

                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.text}>{taskDetails.description}</Text>

                            <TextInput
                                mode= 'outlined'
                                outlineColor =  {theme.colors.primary}
                                label="Your Note"
                                placeholder = "Type about the task"
                                value={taskDetails.rep_note}
                                onChangeText={(text) => setTaskDetails({...taskDetails, rep_note:text})}
                            />


                            {scheduleType && (
                              <View style={{alignSelf : 'center', marginTop : 10}}>
                                <View style = {styles.sameRow}>
                                <Button
                                    style= {styles.cancelButton}
                                    labelStyle = {{fontSize : 16, fontWeight : 'bold'}}
                                    mode='contained'
                                    icon={({color, size}) => (
                                        <Icon
                                        name="delete" 
                                        color={theme.colors.surface}
                                        size={20}
                                        />
                                    )}
                                    onPress={() => deleteConfirmation()} 
                                    > Delete 
                                </Button>
                                <Button
                                    mode='contained'
                                    icon={({color, size}) => (
                                        <FontAwesome5Icon
                                        name="feather" 
                                        color={theme.colors.surface}
                                        size={20}
                                        />
                                    )}
                                    onPress={() => completeTask()} 
                                    > Completed 
                                </Button>

                                </View>
                              </View>
                                
                              )}

                            {taskType && (
                                <View style={{alignSelf : 'center', marginTop : 10}}>
                                  <View style = {styles.sameRow}>
                                  <Button
                                      style= {styles.cancelButton}
                                      mode='contained'
                                      icon={({color, size}) => (
                                          <FontAwesome5Icon
                                          name="eject" 
                                          color={theme.colors.surface}
                                          size={20}
                                          />
                                      )}
                                      onPress={() => rejectConfirmation()} 
                                      > Reject 
                                  </Button>
                                  <Button
                                      mode='contained'
                                      icon={({color, size}) => (
                                          <FontAwesome5Icon
                                          name="check-double" 
                                          color={theme.colors.surface}
                                          size={20}
                                          />
                                      )}
                                      onPress={() => acceptTask()} 
                                      > Accept 
                                  </Button>
                                  </View>
                                </View>                                
                              )}
                              { completeButton && (
                                    <Button
                                        style= {styles.completeButton}
                                        mode='contained'
                                        icon={({color, size}) => (
                                            <FontAwesome5Icon
                                            name="feather" 
                                            color={theme.colors.surface}
                                            size={20}
                                            />
                                        )}
                                        onPress={() => completeTask()} 
                                        > Completed 
                                    </Button>
                              )}


                    </View>
                </BackgroundLayout>

            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create ({
    productContainer : {
        flex : 1,
        width : '100%',
        height : '100%',
        padding: 20,
        backgroundColor : theme.colors.surface,
        borderRadius : 5,
        shadowColor : 'gray',
        elevation : 10,
        marginTop : 20,
    },
  
    header : {
      color : theme.colors.primary,
      fontWeight : 'bold',
      fontSize : 22,
      marginLeft : 5,
    //   top : 5,
      textAlign : 'center'    
    },

    text : {
        fontSize : 16,
        marginBottom : 10


    },
    textLable : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.primary,


    },
    cancelButton : {
        backgroundColor : 'red',
        marginRight : 5,
    },

    medicinePhoto: {
        width:150, 
        height: 150, 
        marginTop:10, 
        borderRadius: 100, 
        alignSelf : 'center',
        marginBottom : 20
    },

    sameRow : {
      flexDirection : 'row',
      width : '100%'
    },
    completeButton : {
      margin : 10,
    },
  })