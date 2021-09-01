import React, {useState, useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet, Button, Alert,AsyncStorage} from 'react-native'
import { theme } from '../core/theme'
// import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import axios from 'axios'


export default function ApplyLeaves({ navigation }) {

  const [rep_ID , setRepId] = useState('');
  const [leaveType,setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description,setDescription] = useState('');

  const [user, setUser] = useState({ rep_ID: '',  manager_ID: '',});
  
  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });            
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[]);

  const saveDetails = () =>{
    axios.post("http://10.0.2.2:3001/applyLeave", { 
      rep_ID : user.rep_ID,
      leaveType: leaveType, 
      startDate: startDate, 
      endDate: endDate, 
      description: description
    }).then((response)=>{
      console.log(leave_ID);
      console.log("Inserted sucessfully");
      Alert.alert("Database", "Leave Form submitted sucessfully",
        [{text: "Cancel", onPress: () => console.log("Cancelled"),style:"cancel"},
          {text:"Submit", onPress: () => console.log("Submitted")}
        ]);
    })
  };

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
      <View style = {styles.sameRow}>
      
        <View style={{alignItems: 'center'}}>
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          <Text> Pending </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('AnnualLeaves')}></FontAwesome5Icon>
          <Text> Approved </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FontAwesome5Icon name= "plus-circle" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <View style ={styles.leaveContainer}>
        {/* <Calendar/> */}
        <Text style={styles.header}>Leave Apply Form</Text> 

        <Picker leaveType={leaveType} style={styles.InputField}
        selectedValue = {leaveType}
        onValueChange={(itemValue,itemIndex) => setLeaveType(itemValue)} >
            <Picker.Item label="Leave Type" value="" />
            <Picker.Item label="Annual Leave" value="Annual Leave" />
            <Picker.Item label="Medical leave" value="Medical Leave" />
            <Picker.Item label="Casual Leave" value="Casual Leave" />
        </Picker>
        
        <View style = {styles.sameRow}>
        <Text style = {styles.labelText}>Start Date </Text>
        <TextInput style={styles.InputField} onChangeText={(text) => setStartDate(text) } value={startDate}/>

        {/* <DatePicker date={startDate} onDateChange={setStartDate} /> */}
        </View>

        <View style = {styles.sameRow}>

        <Text style = {styles.labelText}>End Date</Text>
        <TextInput style={styles.InputField} onChangeText={(text) => setEndDate(text) } value={endDate}/>
        {/* <DatePicker date={endDate} onDateChange={setEndDate} /> */}
        </View>

        
        <Text style = {styles.labelText}>Description :</Text>
        <TextInput style={styles.description} onChangeText={(val) => setDescription(val)} value={description}/>

      
        <View style = {styles.sameRow}>
        <Button color = '#0A6466' title = 'cancel' onPress={() => {alert('Cancelled')}}/>
        <Button color = '#0A6466' title = 'submit' onPress={() => {saveDetails() }}/>
        </View>
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
  leaveContainer : {
    flex : 1,
    width : '100%',
    minHeight : 300,
    padding: 15,
    backgroundColor : '#E5E5E5',
    borderRadius : 5,

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
    borderWidth : 1,
    marginBottom : 30,
    padding : 20,
},
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
  labelText : {
    fontSize : 16,
    color : 'black',
  },
})