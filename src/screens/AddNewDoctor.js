import React, {useState} from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Image, Alert} from 'react-native';
import { Button } from 'react-native-paper'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import axios from 'axios'

export default function AddNewDoctor ({navigation}){

    const [displayPhoto , setDisplayPhoto] = React.useState('');
    const [slmcNo , setSlmcNo] = React.useState('');
    const [doctorName , setDoctorName] = React.useState('');
    const [clinic , setClinic] = React.useState('');
    const [contactNumber , setContactNumber] = React.useState('');
    const [email , setEmail] = React.useState('');
    const [clinicArea , setClinicArea] = React.useState('');
    const [dob , setDob] = React.useState('');
    const [citations , setCitations] = React.useState('');
    const [qualification , setQualification] = React.useState('');
    const [note , setNote] = React.useState('');


    const saveDetails = () => { 
        axios.post("http://10.0.2.2:3001/doctor/addNewDoctor", {
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
        }).then((response)=>{
            console.log(slmcNo);
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
                <View style={styles.center}>
                    <View style={styles.sameRow}>
                    <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontistoIcon>
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
                    onChangeText={(val) => setSlmcNo(val)}
                    value={slmcNo}
                />
            </View>
            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Doctor's Name :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex:John"
                    onChangeText={(val) => setDoctorName(val)}
                    value={doctorName}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Clinic :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="Name of medical center"
                    onChangeText={(val) => setClinic(val)}
                    value={clinic}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Contact Number :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex: 0768921288"
                    onChangeText={(val) => setContactNumber(val)}
                    value={contactNumber}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Email :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex:john@gmail.com"
                    onChangeText={(val) => setEmail(val)}
                    value={email}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Cilinic Area :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="Location of clinic(Colombo)"
                    onChangeText={(val) => setClinicArea(val)}
                    value={clinicArea}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Date of Birth :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="Choose date(ex:2021-5-10)"
                    onChangeText={(val) => setDob(val)}
                    value={dob}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Citations :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex:General Doctor"
                    onChangeText={(val) => setCitations(val)}
                    value={citations}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Qualification :</Text>
                <TextInput 
                    style = {styles.InputField}
                    placeholder="ex: MBBS(sur.Eye)"
                    onChangeText={(val) => setQualification(val)}
                    value={qualification}
                />
            </View>

            <View style ={styles.sameRow}>
                <Text style = {styles.labelText}> Note :</Text>
                <TextInput 
                    style = {styles.CommentField}
                    placeholder="Other Information"
                    onChangeText={(val) => setNote(val)}
                    value={note}
                />
            </View>

            <Button mode="contained" onPress={() => {saveDetails()}}>
                Save
            </Button>


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
        alignSelf : 'stretch',
        padding : 20,
        paddingTop : 0,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5
    },
    InputField : {
        alignSelf : 'stretch',
        height : 35,
        marginBottom : 10,
        borderBottomColor : '#009387',
        borderBottomWidth : 2,
        fontSize : 16,
        color : theme.colors.primary,
        
    },
    sameRow : {
        flexDirection : 'row',
        width : '100%',
        // justifyContent : 'space-between'
        // alignContent : 'center'
        // justifyContent : 'center'
    },
    CommentField : {
        height : 100,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5,
        width : '60%',
        marginBottom : 30,
        marginTop : 30,
        padding : 20,
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
        fontSize : 16,
        fontWeight : 'bold',
        color : theme.colors.primary,
        top : 10,
        marginRight : 20,
    },


})