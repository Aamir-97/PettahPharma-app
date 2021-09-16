import React, {useState, useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet, Alert,AsyncStorage } from 'react-native'
import { theme } from '../core/theme'
import { requiredField } from '../helpers/requiredField'
import Icon from 'react-native-vector-icons/AntDesign'
import { IconButton,Button} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import axios from 'axios'


export default function ApplyLeaves({ navigation }) {

  const [leaveType, setLeaveType] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const [rep_ID, setRepID] = React.useState('');

  const [pendingleaveCount, setPendingLeaveCount] = useState('');
  const [totalleaveCount, setTotalLeaveCount] = useState('');

  useEffect(() => {
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
  },[rep_ID]);  

    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setRepID(profile.rep_ID);
          console.log("user");            
        }
      } catch (e){
        console.log(e);
      }

    if(rep_ID){

      try{  
        axios.post("http://10.0.2.2:3001/ApplyLeaves/pendingleaveCount",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          setPendingLeaveCount(response.data.pendingleaveCount);
          console.log("/pendingleaveCount")
        });
      } catch (err) {
        console.log(err);
        console.log("Error while get  Pending Leave count");
      } 

      try{  
        axios.post("http://10.0.2.2:3001/ApplyLeaves/totalleaveCount",{
          rep_ID : rep_ID, 
        }).then((response)=>{
          setTotalLeaveCount(response.data.totalleaveCount);
          console.log("/totalleaveCount");
        });
      } catch (err) {
        console.log(err);
        console.log("Error while getting Total Leave count");
      }
      
    }

    }


//----------------------------------------------------------------------------------------------------------------
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS ==='ios');
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    useEffect(() => {
      const dtt = new Date(date);
      const year = dtt.getFullYear() + '/';
      const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dtt.getDate()).slice(-2);
      setStartDate( year+month+day); 
      console.log(year+month+day);     
      },[date]);



//------------------------------------------------------------------------------------------------------------------
  const [date2, setDate2] = useState(new Date());
  const [mode2, setMode2] = useState('date2');
  const [show2, setShow2] = useState(false);

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);

  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date2');
  };
  

  useEffect(() => {
  const dtt = new Date(date2);
  const year = dtt.getFullYear() + '/';
  const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
  const day = ('0' + dtt.getDate()).slice(-2);
  setEndDate(year+month+day);  
  console.log(year+month+day);     
  },[date2]);
//---------------------------------------------------------------------------------------------------------------------------

  const checkRequired = () => {
    console.log(leaveType, startDate, endDate);
    const leaveTypeCheck = requiredField(leaveType)
    const startDateCheck = requiredField(startDate)
    const endDateCheck = requiredField(endDate)

    if (leaveTypeCheck || startDateCheck || endDateCheck ) {
        Alert.alert(
            "Fill required field.....!",
            "Type, Start Date & End Date are required...!",
            [
              {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
              { text: "OK", onPress: () => console.log("Ok pressed") }
            ]
          )
          return 
    }
    else {
        checkAvailable();
    }
  }

  const checkAvailable = () =>{
      console.log("checkAvailable function working...!");
      try {
        axios.post("http://10.0.2.2:3001/ApplyLeaves/CheckAvailability", {            
            rep_ID : rep_ID,
            startDate : startDate,
            endDate : endDate,
        }).then((response)=>{
             console.log("Succesfully Inserted:!");
            console.log(response.data.leaveAvailable);
            if (response.data.leaveAvailable === 1) {
                saveDetails();
            } else {
                Alert.alert(
                    "Attention.....!",
                    "You already on leave or you have a task that day...!",
                    [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                      { text: "OK", onPress: () => console.log("Ok pressed") } ]
                  )
            }
        })
      } catch (err) {
            console.log(err, "Error while check availability for leave");
      }
  }

  const saveDetails = () =>{
    axios.post("http://10.0.2.2:3001/applyLeave", { 
      rep_ID : rep_ID,
      leaveType: leaveType, 
      startDate: startDate, 
      endDate: endDate, 
      description: description
    }).then((response)=>{
      console.log("/applyLeave");
      Alert.alert("Database", "Leave Form submitted sucessfully",
        [{text: "Cancel", onPress: () => console.log("Cancelled"),style:"cancel"},
          {text:"Submit", onPress: () => navigation.navigate('Home')}
        ]);
    })
  };

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
      <View style = {styles.sameRow}>
      
        <View style={{alignItems: 'center'}}>
        <Text style={styles.countText}> {pendingleaveCount} </Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color=  {theme.colors.primary}onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          <Text fontSize = "12"> Pending </Text>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.countText}> {totalleaveCount} </Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color= {theme.colors.primary} onPress= {() => navigation.navigate('AnnualLeaves')}></FontAwesome5Icon>
          <Text> Approved / Rejected </Text>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text/>
          <FontAwesome5Icon name= "plus-circle" size= {40} color= "#D2F7F7" onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <View style ={styles.leaveContainer}>
      <View style = {{flexDirection  : 'row' , alignSelf : 'center'}}>
      <Icon name="form" size={35} color={theme.colors.primary} />
        <Text style={styles.header}>Leave Apply Form</Text> 
      </View>

        <Picker 
            leaveType={leaveType} 
            selectedValue = {leaveType} 
            style={styles.InputField} 
            onValueChange={(itemValue,itemIndex) => setLeaveType(itemValue)} >
            <Picker.Item label="Leave Type" value="" />
            <Picker.Item label="Annual Leave" value="Annual" />
            <Picker.Item label="Medical leave" value="Medical" />
            <Picker.Item label="Casual Leave" value="Casual" />
        </Picker>
        <View style={{borderWidth : 0.5, borderTopColor: theme.colors.primary, marginTop : -22, marginBottom : 22}}></View>

        <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>
                <View style={{flex : 2}}>
                    <Text style = {styles.labelText}>Start Date :</Text> 
                </View>
                <View style={{flex : 2}}>
                    <TextInput editable = {false} label= 'Date' mode= 'outlined' outlineColor = {theme.colors.primary} style={styles.InputField}  value= {startDate}/>
                </View>
                <View style={{flex : 2}}>
                    <IconButton style = {{margin : -8}} icon="calendar" color= {theme.colors.primary} size={45} onPress={() => {showDatepicker()}} />
                </View>
                {show && (
                    <DateTimePicker 
                      testID="dateTimePicker" 
                      value={date} 
                      mode={mode} 
                      is24Hour={true} 
                      display="default" 
                      onChange={onChange}
                      minimumDate={new Date()} 
                      />
                )}
            </View>

            <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>
                <View style={{flex : 2}}>
                    <Text style = {styles.labelText}>End Date :</Text> 
                </View>
                <View style={{flex : 2}}>
                    <TextInput editable = {false} label= 'Date' mode= 'outlined' outlineColor = {theme.colors.primary} style={styles.InputField}  value= {endDate}/>
                </View>
                <View style={{flex : 2}}>
                    <IconButton style = {{margin : -8}} icon="calendar" color= {theme.colors.primary} size={45} onPress={() => {showDatepicker2()}} />
                </View>
                {show2 && (
                    <DateTimePicker 
                      testID="dateTimePicker" 
                      value={date2} mode={mode2} 
                      is24Hour={true} 
                      display="default" 
                      onChange={onChange2}
                      minimumDate={date} 
                      />
                )}
            </View>

        
        <Text style = {styles.labelText}>Description :</Text>
        <TextInput style={styles.description} onChangeText={(val) => setDescription(val)} value={description}/>

        <View style = {{flexDirection  : 'row' , alignSelf : 'center', width : '70%'}}>
        <Button icon = "cancel" mode= "contained" color = '#0A6466' style={{backgroundColor:'red'}} title = 'cancel' onPress={() => {navigation.goBack()}}>Cancel</Button>
        <Button icon = "send" mode = "contained" color = '#0A6466' style = {{marginLeft : 10}}title = 'submit' style={{marginLeft : 10}} onPress={() => {checkRequired() }}>Apply</Button>
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
    alignSelf : 'center',
    marginBottom : 30,
    color : theme.colors.primary
    
},
  leaveContainer : {
    flex : 1,
    width : '100%',
    padding: 15,
    borderRadius : 5,
    height : '100%',
    backgroundColor : theme.colors.surface,
    shadowColor : 'gray',
    elevation : 10,
    marginTop : 20,
  },
  InputField : {
    alignSelf : 'stretch',
    height : 35,
    marginBottom : 25,
    borderBottomColor : '#009387',
    borderBottomWidth : 1,
    fontSize : 16,    
  },
  description : {
    height : 100,
    borderColor : '#0A6466',
    borderWidth : 2,
    marginBottom : 30,
    padding : 20,
    borderRadius : 10,
  },
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
  countText : {
    fontSize : 15,
    fontWeight : 'bold',
    color : theme.colors.primary
  },
  labelText : {
    fontSize : 16,
    fontWeight : 'bold',
    color : theme.colors.primary,
  },
})