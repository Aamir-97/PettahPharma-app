import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ScrollView, StyleSheet, Picker, Alert, AsyncStorage, Platform, TextInput} from 'react-native';
import { IconButton, Button } from 'react-native-paper'
import NumericInput from 'react-native-numeric-input'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { requiredField } from '../helpers/requiredField';

import axios from 'axios';

export default function VSRForm ({navigation}){


    const [doctorList,setDoctorList]=useState([]);
    const [productList,setProductList]=useState([]);

    const [user, setUser] = React.useState({ 
        rep_ID: '', 
        manager_ID: '',
      });

    const [formDetails, setFormDetails] = React.useState({
        visit_type : '',
        location : '',
        date : '',
        avg_duration : '',
        no_of_sample : null,
        description : '',
        doctor_name : '',
        product_name: '',

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
            console.log("formdata")
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
        console.log("/getDoctorName");
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
        console.log("/getProductsName");
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while get Static Data");
      }
    };

    const submitForm = () => {
        axios.post("http://10.0.2.2:3001/vsr/submitForm", {
            visit_type: formDetails.visit_type, 
            location: formDetails.location,
            date: formDetails.date, 
            avg_duration: formDetails.avg_duration, 
            no_of_sample: formDetails.no_of_sample,
            description: formDetails.description,   
            doctor_name : formDetails.doctor_name, 
            product_name: formDetails.product_name,
            rep_ID : user.rep_ID,
            manager_ID : user.manager_ID,
            created_at : new Date(),
        }).then((response)=>{
            if (response){
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
            }

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

    // Date Convertor
    const dtt = new Date(formDetails.date);
    const year = dtt.getFullYear() + '/';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dtt.getDate()).slice(-2);


    useEffect(() => {
      //   Date convertor
      const dtt = new Date(date);
      const year = dtt.getFullYear() + '/';
      const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dtt.getDate()).slice(-2);
      setFormDetails ({...formDetails, date : year+month+day});        
      },[date]); 


    const checkRequired = () => {
        const visit_type = requiredField(formDetails.visit_type)
        const location = requiredField(formDetails.location)
        const date = requiredField(formDetails.date)
        if (visit_type || location || date ) {
            Alert.alert(
                "Attention.....!",
                "Please fill the required field...!",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("Ok pressed") }
                ]
              )
              return 
        }
        else {
            submitForm ();
        }
      }

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

                <View style ={styles.sameRow}>
                    <FontistoIcon
                        name="star" 
                        color={theme.colors.error}
                        size={14}
                    />
                    <Text style={styles.requiredText}> - Field is required</Text>
                </View>



                {/* VSRForm */}

                <View style={styles.visitSummaryForm}>
                        <View style={styles.InputField}>
                            <FontistoIcon
                                name="star" 
                                color={theme.colors.error}
                                size={8}
                                style = {{marginBottom: -12}}                                    
                            />
                            <Picker 
                                    selectedValue={formDetails.visit_type}
                                    onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, visit_type: itemValue })}
                                    >
                                <Picker.Item label="Visit type" value="" />
                                <Picker.Item label="Regular Visit" value="Regular" />
                                <Picker.Item label="Promotion Visit" value="Promotion" />
                                <Picker.Item label="Appoinment Visit" value="Appoinment" />
                            </Picker>
                        </View>

                    {/* <View style={styles.sameRow}> */}
                        <FontistoIcon
                            name="star" 
                            color={theme.colors.error}
                            size={8}
                            style = {{marginBottom: -12, marginTop:6, paddingLeft:5}}                                    
                        />
                        <TextInput 
                            style={styles.InputField} 
                            label= "Location"
                            placeholder = "Location"
                            value= {formDetails.location}
                            onChangeText = {text => setFormDetails({...formDetails, location:text})}
                        />                  
                    {/* </View>     */}



                    <View style={styles.InputField}>
                        <Picker 
                            selectedValue={formDetails.doctor_name}
                            onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, doctor_name: itemValue })}
                        >
                            <Picker.Item label="Name of the Doctor" value="" />
                            {doctorList.map((record)=>{
                                return(
                                    <Picker.Item label={record.name} value={record.doctor_id} key={record.doctor_id} />
                                )})
                            }
                        </Picker>
                    </View>

                        <View style={styles.InputField}>
                            <Picker
                                selectedValue={formDetails.avg_duration}
                                onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, avg_duration: itemValue })}
                                >
                                <Picker.Item label="Avg. Visit Duration (Time)" value="" />
                                <Picker.Item label="Less Than 30 min" value="0.5" />
                                <Picker.Item label="30 min" value="0.5" />
                                <Picker.Item label="1 hr" value="1" />
                                <Picker.Item label="1 hr 30 min" value="1.5" />
                                <Picker.Item label="2 hr" value="2" />
                            </Picker>
                        </View>

                        <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>
                            <View style={{flex : 2}}>
                                <TextInput 
                                    editable = {false}
                                    style={styles.InputField} 
                                    placeholder = "Date"
                                    value= {year+month+day}
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
                                <View style={{flex : 2, flexDirection : 'row'}}>
                                <FontistoIcon
                                    name="star" 
                                    color={theme.colors.error}
                                    size={8}
                                    style = {{marginTop : 2}}                                            
                                />
                                <Text style = {{color : 'red', fontSize : 10}} > Click Calendar</Text>
                                </View>

                            </View>

                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                maximumDate = {new Date()}
                                />
                            )}
                        </View>


                    <View style={styles.InputField}>
                        <Picker
                            selectedValue={formDetails.product_name}
                            onValueChange={(itemValue, itemIndex) => setFormDetails({ ...formDetails, product_name: itemValue })}
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
                            value={formDetails.no_of_sample} 
                            onChange={(val) => setFormDetails({ ...formDetails, no_of_sample:val})} 
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={150} 
                            totalHeight={40} 
                            iconSize={25}
                            // step={1.5}
                            minValue = {0}
                            valueType='real'
                            rounded 
                            textColor={theme.colors.primary} 
                            iconStyle={{ color: 'black' }}
                            // rightButtonBackgroundColor='#EA3788' 
                            // leftButtonBackgroundColor='#E56B70'  
                        />                    
                    </View>

                    <TextInput 
                        style={styles.CommentField} 
                        placeholder= "Comment"
                        value= {formDetails.description}
                        onChangeText = {text => setFormDetails({...formDetails, description:text})}
                    />

                    <View style={{alignSelf: 'flex-end'}}>
                        <Button icon="content-save" size={35} mode="contained" onPress={() => {checkRequired()}}>
                            Submit 
                        </Button>
                    </View>
      


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
        paddingLeft : 5,
        height : 45,
        marginBottom : 10,
        borderColor : theme.colors.primary,
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 18,
        
    },
    sameRow : {
        flexDirection : 'row',
    },
    CommentField : {
        paddingLeft : 5,
        marginBottom : 10,
        borderColor : theme.colors.primary,
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 18,
        height : 100,
        marginTop : 10

    }

})