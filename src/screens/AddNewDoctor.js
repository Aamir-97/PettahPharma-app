import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Image, Alert, AsyncStorage} from 'react-native';
import { IconButton, Button } from 'react-native-paper'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import DateTimePicker from '@react-native-community/datetimepicker';


import axios from 'axios'

export default function AddNewDoctor ({route, navigation}){


    const [user, setUser] = React.useState({ 
        rep_ID: '', 
        manager_ID: '',
      });


    useEffect(() => {
        async function fetchData(){
          try {
            const userProfile = await AsyncStorage.getItem('user');
            const profile  = JSON.parse(userProfile);
            if (userProfile !== null){
              setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });        
            }
          } catch (e){
            console.log(e);
          }
        }
        fetchData();     
      },[]);

    const [doctorDetails, setDoctorDetails] = React.useState({
        displayPhoto : '',
        slmcNo : '',
        doctorName : '',
        clinic : '',
        contactNumber : '',
        email : '',
        clinicArea : '',
        dob : '',
        citations : '',
        note : '',
    })


    const saveDetails = () => { 
        axios.post("http://10.0.2.2:3001/doctor/addNewDoctor", {
            displayPhoto: doctorDetails.displayPhoto, 
            slmcNo: doctorDetails.slmcNo,
            doctorName : doctorDetails.doctorName, 
            clinic: doctorDetails.clinic, 
            contactNumber: doctorDetails.contactNumber, 
            email: doctorDetails.email, 
            clinicArea: doctorDetails.clinicArea, 
            dob: doctorDetails.dob, 
            citations: doctorDetails.citations, 
            note: doctorDetails.note,
            rep_ID : user.rep_ID 
        }).then((response)=>{
            // console.log(slmcNo);
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
                  { text: "OK", onPress: () => {navigation.navigate('DoctorDetails')} }
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



    useEffect(() => {
        //   Date convertor
      const dtt = new Date(date);
      const year = dtt.getFullYear() + '/';
      const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dtt.getDate()).slice(-2);

      setDoctorDetails({...doctorDetails, dob : year+month+day});
        
      },[date]);


    return (
        <ScrollView>
            <BackgroundLayout>
                <View style={styles.center}>
                    <View style={styles.sameRow}>
                    <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary}></FontistoIcon>
                    <Text style={styles.header}>Enter the Doctor Details</Text> 
                    </View>
                </View>


            {/* Add New Doctor Form */}

            <View style={styles.visitSummaryForm}>

            <View style ={styles.sameRow}>
                <Image source={require ('../assets/Doctors/vectorDoctor.png')} style ={styles.displayPhoto} /> 
                <View style={{alignSelf: 'center',marginLeft:20}}>
                <Button  style={{color:'blue',fontSize:16,fontWeight : 'bold'}} icon="camera" mode="contained" onPress={() => console.log('Change Pressed')}>
                    Change 
                </Button>
                </View>
            </View>
 
            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> SLMC No.:</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="Medical Counsil Number"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, slmcNo:val})}
                    value={doctorDetails.slmcNo}
                />
            </View>
            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Doctor's Name :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex:John"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, doctorName:val})}
                    value={doctorDetails.doctorName}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Clinic :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="Name of medical center"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, clinic:val})}
                    value={doctorDetails.clinic}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Contact Number :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex: 0768921288"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, contactNumber:val})}
                    value={doctorDetails.contactNumber}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Email :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex:john@gmail.com"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, email:val})}
                    value={doctorDetails.email}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Cilinic Area :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="Location of clinic"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, clinicArea:val})}
                    value={doctorDetails.clinicArea}
                />
            </View>

                        <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>
                            <View style={{flex : 2}}>
                                <Text style = {styles.labelText}>Date of Birth :</Text> 
                            </View>
                            <View style={{flex : 2}}>
                                <TextInput
                                    editable = {false}
                                    label= 'Date'
                                    mode= 'outlined'
                                    outlineColor = {theme.colors.primary}
                                    style={styles.InputField} 
                                    value= {doctorDetails.dob}
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

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Citations :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex:General Doctor"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, citations:val})}
                    value={doctorDetails.citations}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Note :</Text>
                <TextInput 
                    style = {styles.CommentField}
                    placeholder="Other Information"
                    onChangeText={(val) => setDoctorDetails({...doctorDetails, note:val})}
                    value={doctorDetails.note}
                />
            </View>

            <View style={{alignSelf: 'flex-end'}}>
                <Button  style={{color:'blue',fontSize:16,fontWeight : 'bold'}} icon="content-save" mode="contained" onPress={() => {saveDetails()}}>
                    Save 
                </Button>
            </View>


            </View>

        </BackgroundLayout>
           
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    center : {
        alignSelf : 'center'
    },
    header : {
        fontSize : 20,
        fontWeight : 'bold',
        alignSelf : 'center',
        marginBottom : 30,
        color : theme.colors.primary
        
    },
    visitSummaryForm : {
        flex: 1,
        alignSelf : 'stretch',
        padding : 20,
        paddingTop : 0,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5
    },
    InputField : {
        flex : 1,
        width : '100%',
        // alignSelf : 'stretch',
        height : 35,
        marginBottom : 10,
        borderBottomColor : '#009387',
        borderBottomWidth : 2,
        fontSize : 17,
        // color : theme.colors.primary,
        
    },
    sameRow : {
        flexDirection : 'row',
    },
    CommentField : {
        flex : 1,
        height : 100,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5,
        width : '100%',
        marginBottom : 30,
        marginTop : 30,
        padding : 20,
        fontSize : 17,

    },
    actionButton: {
        flexDirection : 'row',
        alignSelf : 'flex-end',
        marginBottom : 10
        
    },
    displayPhoto: {
        height : 80 ,
        width : 80,
        borderRadius : 50 ,
    },
    button : {
        backgroundColor : theme.colors.primary,
        color : theme.colors.primary,
        width : 100,
        borderRadius : 20,
        fontSize : 10

    },
    labelText : {
        fontSize : 18,
        fontWeight : 'bold',
        color : theme.colors.primary,
        top : 10,
        marginRight : 20,
    },


})