import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Picker, Alert, AsyncStorage} from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import NumericInput from 'react-native-numeric-input'
import DatePicker from 'react-native-date-picker'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/Feather'

import axios from 'axios';


export default function VSRForm ({navigation}){


    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => { setSearchQuery(query) }

    const [doctorList,setDoctorList]=useState([]);
    const [productList,setProductList]=useState([]);

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
            getDocotorsName(rep_ID);
            getProductsName();
          }      
        } catch (e){
          console.log(e);
        }
      }
      fetchData();
    },[]);  
  
  
    const getDocotorsName = (rep_ID) => {
      try{  
        axios.post("http://10.0.2.2:3001/vsr/getDoctorName",{
          rep_ID : rep_ID,  
      }).then((response)=>{
        setDoctorList(response.data);
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while get Static Data");
      }
    };

    const getProductsName = () => {
      try{  
        axios.get("http://10.0.2.2:3001/vsr/getProductsName",{
      }).then((response)=>{
        setProductList(response.data);
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while get Static Data");
      }
    };

    const [formDetails, setFormDetails] = React.useState({
        visitType : '',
        location : '',
        date: '',
        avgDuration : '',
        noOfSample : null,
        comments : '',
        doctorId : null,
        productId: null,

    });

    const submitForm = () => {
        console.log("Submit form funtion is working")
        axios.post("http://10.0.2.2:3001/vsr/submitForm", {
            visitType: formDetails.visitType, 
            location: formDetails.location,
            date: formDetails.date, 
            avgDuration: formDetails.avgDuration, 
            noOfSample: formDetails.noOfSample,
            comments: formDetails.comments,   
            doctorId : formDetails.doctorId, 
            productId: formDetails.productId,
            repId : user.rep_ID,
            managerId : user.manager_ID,
        }).then((response)=>{
            // console.log(slmcNo);
            console.log("Succesfully Inserted:!");
            Alert.alert(
                "Database",
                "New VSR Form Successfully inserted...!",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {navigation.navigate('VisitSummaryReport')} }
                ]
              );
        })

    };

    return (
        <SafeAreaProvider>
        <ScrollView>
            <BackgroundLayout>

                <View style={{alignSelf : 'center'}}>
                    <View style={styles.sameRow}>
                        <Icon name="file-text" color={theme.colors.primary} size={35} />                             
                        <Text style={styles.header}>Visit Summary Report</Text>
                    </View>
                </View>


                {/* VSRForm */}

                <View style={styles.visitSummaryForm}>
                    <View style={styles.InputField}>
                        <Picker 
                                selectedValue={formDetails.visitType}
                                onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, visitType: itemValue })}
                                >
                            <Picker.Item label="Visit type" value="" />
                            <Picker.Item label="Ragular" value="Ragular" />
                            <Picker.Item label="Promotion Visit" value="Promotion Visit" />
                            <Picker.Item label="Appoinment" value="Appoinment" />
                        </Picker>
                    </View>

                    <TextInput 
                    style={styles.InputField} 
                        label= "Location"
                        value= {formDetails.location}
                        onChangeText = {text => setFormDetails({...formDetails, location:text})}
                    />
                    <View style={styles.InputField}>
                        <Picker 
                            selectedValue={formDetails.doctorId}
                            onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, doctorId: itemValue })}
                        >
                            <Picker.Item label="Name of the Doctor" value="" />
                            {doctorList.map((record)=>{
                                return(
                                    <Picker.Item label={record.name} value={record.doctor_id} key={record.doctor_id} />
                                )})
                            }
                        </Picker>
                    </View>

                    {/* <View style ={styles.sameRow}> */}
                        <View style={styles.InputField}>
                            <Picker
                                selectedValue={formDetails.avgDuration}
                                onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, avgDuration: itemValue })}
                                >
                                <Picker.Item label="Avg. Visit Duration (Time)" value="" />
                                <Picker.Item label="30 min" value="0.5" />
                                <Picker.Item label="1 hr" value="1" />
                                <Picker.Item label="1 hr 30 min" value="1.5" />
                                <Picker.Item label="2 hr" value="2" />
                            </Picker>
                        </View>
                        <TextInput 
                            style={styles.InputField} 
                                label= "Date (YYYY-MM-DD)"
                                value= {formDetails.date}
                                onChangeText = {text => setFormDetails({ ...formDetails, date:text})}
                            />
                        {/* <DatePicker date={formDetails.date} onDateChange={setFormDetails} /> */}
                    {/* </View> */}


                    <View style={styles.InputField}>
                        <Picker
                            selectedValue={formDetails.productId}
                            onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, productId: itemValue })}
                            >
                            <Picker.Item label="Sample Medicine" value="" />
                            {productList.map((record)=>{
                                return(
                                    <Picker.Item label={record.name} value={record.name} key={record.product_id} />
                                )})
                            }
                        </Picker>
                    </View> 

                    <View style ={styles.sameRow}> 
                        <Text style = {{ fontSize : 16}}> No. Of Sample : </Text>
                        <NumericInput 
                            value={formDetails.noOfSample} 
                            onChange={(val) => setFormDetails({ ...formDetails, noOfSample:val})} 
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={150} 
                            totalHeight={40} 
                            iconSize={25}
                            // step={1.5}
                            minValue = {0}
                            valueType='real'
                            rounded 
                            textColor='#B0228C' 
                            iconStyle={{ color: 'black' }}
                            // rightButtonBackgroundColor='#EA3788' 
                            // leftButtonBackgroundColor='#E56B70'  
                        />                    
                    </View>

                    <TextInput 
                        style={styles.CommentField} 
                        label= "Comment"
                        value= {formDetails.comments}
                        onChangeText = {text => setFormDetails({...formDetails, comments:text})}
                    />

                    <Button 
                    // icon="camera" 
                    mode="contained" 
                    onPress={() => {submitForm()}}>
                        Submit
                    </Button>
      


                </View>
            </BackgroundLayout>
        </ScrollView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create ({
    header : {
        fontSize : 20,
        fontWeight : 'bold',
        alignSelf : 'center',
        marginBottom : 30,
        color : theme.colors.primary,
        top :5
        
    },
    visitSummaryForm : {
        alignSelf : 'stretch',
        // margin : 20,
        padding : 20,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5
    },
    InputField : {
        alignSelf : 'stretch',
        height : 35,
        marginBottom : 10,
        borderBottomColor : '#009387',
        borderBottomWidth : 1,
        fontSize : 16,
        height : 50,
        
    },
    sameRow : {
        flexDirection : 'row',
        // alignSelf : 'center',
        // justifyContent : 'space-between'
    },
    CommentField : {
        height : 100,
        borderBottomColor : '#009387',
        borderBottomWidth : 1,
        // borderColor : '#0A6466',
        // borderWidth : 1,
        marginBottom : 30,
        marginTop : 30,
        padding : 20,
    }

})