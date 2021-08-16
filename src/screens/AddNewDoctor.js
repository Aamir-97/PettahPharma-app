import React, {useState} from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Picker, Image, Alert} from 'react-native';
import { Button } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import axios from 'axios'

export default function AddNewDoctor ({navigation}){

    const [displayPhoto , setDisplayPhoto] = useState('');
    const [slmcNo , setSlmcNo] = useState('');
    const [doctorName , setDoctorName] = useState('');
    const [clinic , setClinic] = useState('');
    const [contactNumber , setContactNumber] = useState('');
    const [email , setEmail] = useState('');
    const [clinicArea , setClinicArea] = useState('');
    const [dob , setDob] = useState('');
    const [citations , setCitations] = useState('');
    const [qualification , setQualification] = useState('');
    const [note , setnote] = useState('');


    const saveDetails = () => { 
        axios.post("http://localhost:3001/doctor/addNewDoctor", {
            displayPhoto: displayPhoto, 
            slmcNo: slmcNo,
            doctorName : doctorName, 
            clinic: clinic, 
            contactNumber: contactNumber, 
            email: email, 
            clinicArea: clinicArea, 
            dob: dob, 
            citations: citations, 
            qualification: qualification, 
            note: note  
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



    // const connect= () => {
    //     const URL = "http://10.0.2.2:3001/test";
    //     fetch (URL).then(response => {
    //         if (response.status == 200){
    //             return response.text();
    //         }
    //         else {
    //             throw new Error ("Something Wrong");
    //         }
    //     }).then(responseText => {
    //         // this.setState({response: responseText});
    //     }).catch(error => {
    //         console.error(error.message);
    //     })
    // }


    const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);
  
    // const onChange = (event, selectedDate) => {
    //   const currentDate = selectedDate || date;
    //   setShow(Platform.OS === 'android');
    //   setDate(currentDate);
    // };
  
    // const showMode = (currentMode) => {
    //   setShow(true);
    //   setMode(currentMode);
    // };
  
    // const showDatepicker = () => {
    //   showMode('date');
    // };
  
    // const showTimepicker = () => {
    //   showMode('time');
    // };

    return (
        <ScrollView>
            <BackgroundLayout>
                <View style={styles.sameRow}>
                <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontistoIcon>
                <Text style={styles.header}>Enter the Doctor Details</Text> 
                </View>



            {/* Add New Doctor Form */}

            <View style={styles.visitSummaryForm}>

            <View style={styles.actionButton}>
            <Button  labelStyle={{color:'red',fontSize:16,fontWeight : 'bold'}} icon="delete" mode="Text" onPress={() => console.log('Delete Pressed')}>
                Delete
            </Button>
            <Button  labelStyle={{color:'blue',fontSize:16,fontWeight : 'bold'}} icon="account-edit" mode="Text" onPress={() => console.log('Edit Pressed')}>
                Edit
            </Button>

            </View>

            <View style ={styles.sameRow}>
                <Image source={require ('../assets/Doctors/aamirDp.jpeg')} style ={styles.displayPhoto} /> 
                <Button  style={{color:'blue',fontSize:16,fontWeight : 'bold', marginTop : 45}} icon="camera" mode="contained" onPress={() => console.log('Change Pressed')}>
                Change 
                </Button>
                
                <TextInput style= {styles.InputField} placeholder="SLMC No." required onChange={(e) => {
                    setSlmcNo(e.target.value)
                }} />    
            </View>
                





            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Doctor's Name :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setDoctorName(e.target.value)
                }}/>
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Clinic :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setClinic(e.target.value)
                }} />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Contact Number :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setContactNumber(e.target.value)
                }} />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Email :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Cilinic Area :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setClinicArea(e.target.value)
                }} />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Date of Birth :</Text>
                {/* <TextInput style={styles.InputField} onChange={(e) => {
                    setDob(e.target.value)
                }}/> */}
            

            <DatePicker
                style={styles.InputField}
                // date={this.state.date}
                mode="date"
                placeholder="Date of visit"
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
                    color : theme.colors.primary,
                },
                dateInput: {
                    // marginLeft: 36
                    borderColor: "#B0B0B000",
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setDate({date: date})}}
            />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Citations :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setCitations(e.target.value)
                }}/>
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Qualification :</Text>
                <TextInput style={styles.InputField} onChange={(e) => {
                    setQualification(e.target.value)
                }} />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Note :</Text>
                <TextInput style={styles.CommentField} placeholder="Other Description" onChange={(e) => {
                    setnote(e.target.value)
                }}/>

            </View>

            <Button mode="contained" onPress={() => {saveDetails}}>
                Save
            </Button>


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
        // margin : 20,
        padding : 20,
        paddingTop : 0,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5
    },
    InputField : {
        alignSelf : 'stretch',
        height : 35,
        width : '60%',
        marginBottom : 10,
        borderBottomColor : '#009387',
        borderBottomWidth : 1,
        fontSize : 16,
        
    },
    sameRow : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between'
        // alignContent : 'center'
        // justifyContent : 'center'
    },
    CommentField : {
        height : 100,
        borderColor : '#0A6466',
        borderWidth : 1,
        marginBottom : 30,
        marginTop : 30,
        padding : 20,
    },
    actionButton: {
        flexDirection : 'row',
        // right : 0,
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
        fontSize : 16,
        fontWeight : 'bold',
        color : theme.colors.primary,
        top : 10,
        marginRight : 20,
    },


})