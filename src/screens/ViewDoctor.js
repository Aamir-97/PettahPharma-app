import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet,Image, Alert } from 'react-native'
import {IconButton, Button } from 'react-native-paper'
import BackgroundLayout from '../components/BackgroundLayout'
import { Input } from 'react-native-elements'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../core/theme'
import DateTimePicker from '@react-native-community/datetimepicker'
import DocumentPicker from 'react-native-document-picker'

import axios from 'axios';


export default function ViewDoctor ({route, navigation}){

    const {doctor_id}= route.params;

    const [doctorDetails, setDoctorDetails] = React.useState({
        display_photo : 'https://i.pravatar.cc/300',
        slmc_no : '',
        name : '',
        clinic : '',
        contact_no : '',
        email : '',
        area : '',
        dob : '',
        citation : '',
        note : ''
    })

    useEffect(() => {
        // console.log(doctor_id);
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/DoctorDetails/ViewDoctor",{
            doctor_id : doctor_id, 
        }).then((response)=>{

            // console.log("/DoctorDetails/ViewDoctor");
            const doctorProfile = response.data[0];
            setDoctorDetails({...doctorDetails,
            display_photo : doctorProfile.display_photo,
            slmc_no : doctorProfile.slmc_no,
            name : doctorProfile.name,
            clinic : doctorProfile.clinic,
            contact_no : doctorProfile.contact_no,
            email : doctorProfile.email,      
            area : doctorProfile.area,      
            dob : doctorProfile.dob,      
            citation : doctorProfile.citation,      
            note : doctorProfile.note     
        });
        //   console.log({...doctorDetails});
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while get doctor details for View & edit");  
        } 
      } fetchData();
  },[]);

  const submitForm = () => {
    try{
      axios.put("http://10.0.2.2:3001/updateDoctor", {
          doctor_id : doctor_id,
          display_photo : doctorDetails.display_photo,
          slmc_no : doctorDetails.slmc_no,
          name : doctorDetails.name,
          clinic : doctorDetails.clinic,
          contact_no : doctorDetails.contact_no,
          email : doctorDetails.email,      
          area : doctorDetails.area,      
          dob : date,      
          citation : doctorDetails.citation,      
          qualification : doctorDetails.qualification,      
          note : doctorDetails.note,  
      }).then((response) => {
        //   console.log("Succesfully Updated:!");
          Alert.alert(
            "Database Doctor Table",
            "Doctor profile is successfully updated...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.navigate('DoctorDetails')}}
            ]
          );

      })

    } catch (err) {
      console.log(err, "Error while update the Doctor form..")
    }
  }

  const deleteDoctor = () => {
    try{
      axios.post("http://10.0.2.2:3001/deleteDoctor", {
        doctor_id : doctor_id,
      }).then((response) => {
        //   console.log("Succesfully Deleted:!");
          Alert.alert(
            "DataBase",
            "Doctor Remove from your list...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.navigate('DoctorDetails')}}
            ]
          );

      })

    } catch (err) {
      console.log(err, "Error while update the form..")
    }
  }


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    // setDoctorDetails({...doctorDetails, dob : currentDate })

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
      const dtt = new Date(doctorDetails.dob);
      const year = dtt.getFullYear() + '/';
      const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dtt.getDate()).slice(-2);


  useEffect(() => {
      //   Date convertor
    const dtt = new Date(date);
    const year = dtt.getFullYear() + '/';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dtt.getDate()).slice(-2);

    setDoctorDetails({...doctorDetails, dob : year+month+day})
    },[date]);


    const deleteConfirmation = () => { 
      Alert.alert(
          "Here You....!",
          "Are you sure want to remove?",
          [
              {
              text: "NO",
              onPress: () => console.log("No Pressed"),
              style: "cancel"
              },
              { text: "YES", onPress: () => deleteDoctor()}
          ]
          );
  
    }

            // Pick a single file
          const profileImage = async () => {
              try {
                  const res = await DocumentPicker.pickSingle({
                  type: [DocumentPicker.types.images],
                  })
                  console.log(
                  res.uri, 
                  res.type, // mime type
                  res.name,
                  res.size,
                  )
                  // console.log(res);
                  setDoctorDetails({...doctorDetails, display_photo: res.uri});
                  // console.log("ithu eduthittu");
              } catch (err) {
                  if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                  } else {
                  throw err
                  }
              }
              return <Text>Success</Text>
      
          }



    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>
                    {/* Check this center style */}
                        <View style={styles.sameRow}>
                            <Button
                                mode='text'
                                icon={({color, size}) => (
                                    <FontAwesome5Icon
                                    name="angle-double-left" 
                                    color="#0000FF"
                                    size={25}
                                    />
                                )}
                                // onPress={() => navigation.goBack()} 
                                onPress={() => navigation.navigate('DoctorDetails')} 
                                labelStyle = {{fontWeight : 'bold', marginLeft : -2, color:'#0000FF'}}
                                > Back
                            </Button>
                            <View style={{marginLeft : 10}}></View>
                            <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} ></FontistoIcon>
                            <Text style={styles.header}>Edit Details</Text> 
                        </View>

                    <View style ={styles.profileContainer}> 

                        <View style ={styles.sameRow}>
                            <Image source={{uri : doctorDetails.display_photo}} style ={styles.displayPhoto} /> 
                            <View style={{alignSelf: 'center',marginLeft:20}}>
                            <Button  style={{color:'blue',fontSize:16,fontWeight : 'bold'}} icon="camera" mode="contained" onPress={() => profileImage()}>
                                Change 
                            </Button>
                            </View>
                        </View>

                            <Input
                                placeholder='Medical Counsil no....'
                                label = 'SLMC No.'
                                leftIcon={
                                    <Icon
                                    name='verified-user'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.slmc_no}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, slmc_no:text }) }
                            />
                            <Input
                                placeholder='Ex:Dr.Name with initial...'
                                label = 'Doctor Name'
                                leftIcon={
                                    <FontAwesome5Icon
                                    name='user-md'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.name}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, name:text }) }
                            />
                            <Input
                                placeholder='Name of clinic center...'
                                label = 'Clinic Place'
                                leftIcon={
                                    <FontAwesome5Icon
                                    name='clinic-medical'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.clinic}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, clinic:text }) }
                            />
                            <Input
                                placeholder='Mobile Number...'
                                label = 'Contact Number'
                                leftIcon={
                                    <Icon
                                    name='phone-iphone'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.contact_no}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, contact_no:text }) }
                            />
                            <Input
                                placeholder='Enter mail id...'
                                label = 'Email'
                                leftIcon={
                                    <Icon
                                    name='email'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.email}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, email:text }) }
                            />
                            <Input
                                placeholder='Clinic location...'
                                label = 'Clinic Area'
                                leftIcon={
                                    <Icon
                                    name='add-location'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.area}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, area:text }) }
                            />

                            <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>
                                <View style={{flex : 2}}>
                                    <Input
                                        disabled
                                        label = 'Date of Birth'
                                        leftIcon={
                                            <Icon
                                            name='date-range'
                                            size={20}
                                            color='black'
                                            />
                                        }
                                        inputContainerStyle = {{ height : 30}}
                                        value={year+month+day}
                                    />
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
                                    />
                                )}
                            </View>

                            <Input
                                placeholder='Quallified area...'
                                label = 'Citation'
                                leftIcon={
                                    <Icon
                                    name='workspaces-filled'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.citation}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, citation:text }) }
                            />
                            <Input
                                placeholder='Type Something...'
                                label = 'Note'
                                leftIcon={
                                    <FontAwesome5Icon
                                    name='notes-medical'
                                    size={20}
                                    color='black'
                                    />
                                }
                                inputContainerStyle = {{ height : 30}}
                                value={doctorDetails.note}
                                onChangeText={(text)=> setDoctorDetails({...doctorDetails, note:text }) }
                            />

                        <View style={{alignSelf : 'center', marginTop : 10}}>
                            <View style = {styles.sameRow}>
                            <Button
                                style= {styles.cancelButton}
                                mode='contained'
                                icon={({color, size}) => (
                                    <Icon
                                    name="delete-forever" 
                                    color={theme.colors.surface}
                                    size={25}
                                    />
                                )}
                                onPress={() => deleteConfirmation()} 
                                > Delete 
                            </Button>
                            <Button
                                style= {styles.submitButton}
                                mode='contained'
                                icon={({color, size}) => (
                                    <Icon
                                    name="rotate-right" 
                                    color={theme.colors.surface}
                                    size={25}
                                    />
                                )}
                                onPress={() => submitForm()} 
                                > Update 
                            </Button>

                            </View>
                        </View>

                    </View>
                </BackgroundLayout>

            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create ({
    header : {
      fontSize : 25,
      fontWeight : 'bold',
      marginLeft : 5,
      color : theme.colors.primary
      
  },
    subHeader:{
      fontSize : 15,
      color : 'gray',
      fontWeight  : 'bold'
  
    },
    profileContainer : {
      flex : 1,
      width : '100%',
      height : '100%',
      padding: 15,
      backgroundColor : theme.colors.surface,
      borderRadius : 5,
      shadowColor : 'gray',
      elevation : 10
  
    },
    InputField : {
      height : 50,
      marginBottom : 15,
      borderBottomColor : '#009387',
      borderBottomWidth : 1,
      fontSize : 16,
      
  },
    sameRow : {
      flexDirection : 'row',
      marginBottom : 20,
      width : '100%',
    },
    cancelButton : {
      backgroundColor : 'red',
      marginRight : 5,
    },
    displayPhoto: {
      height : 80 ,
      width : 80,
      borderRadius : 50 ,
    },
  
  })