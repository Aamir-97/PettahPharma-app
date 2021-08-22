import React, { useEffect, useState } from 'react'
import { Text, 
          View, 
          SafeAreaView, 
          ScrollView, 
          StatusBar, 
          Image, 
          StyleSheet, 
          Button, 
          Alert,
          AsyncStorage
        } from 'react-native'
import Styles from '../core/Styles'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import BackgroundLayout from '../components/BackgroundLayout'

import axios from 'axios'



export default function HomeScreen({ navigation }) {

  const [user, setUser] = React.useState({ 
    rep_ID: '', 
    manager_ID: '',
  });

  const [stateData, setStateData] = React.useState({
    reportCount : '',
    expensesCount: '',
    leaveCount: '',
    doctorCount: '',
    SheduledTaskCount: '',
    productsCount: ''
  })
 
  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (userProfile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });
          getReportCount(user.rep_ID);
          getExpensesCount(user.rep_ID);
          getLeaveCount(user.rep_ID);        
          getDoctorCount(user.rep_ID);        
          getSheduledTaskCount(user.rep_ID);        
          getProductCount();  
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();     
  },[]);


  const getReportCount = (rep_ID) => {
    try{  
      axios.post("http://10.0.2.2:3001/homePage/reportCount",{
        rep_ID : rep_ID,  
      }).then((response)=>{
        setStateData({...stateData, reportCount : response.data.reportCount})
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Static Data");
    }
  };

  const getExpensesCount = (rep_ID) => {
    try{  
      // to post claimed expenses count
      axios.post("http://10.0.2.2:3001/homePage/expensesCount",{
        rep_ID : rep_ID, 
      }).then((response)=>{
        setStateData({...stateData, expensesCount: response.data.expensesCount });
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Static Data");
    }
  };

  const getLeaveCount = (rep_ID) => {
    try{  
      // to post annual leave taken count
      axios.post("http://10.0.2.2:3001/homePage/leaveCount",{
        rep_ID : rep_ID, 
      }).then((response)=>{
        setStateData({...stateData, leaveCount: response.data.leaveCount });
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Static Data");
    }
  };

  const getDoctorCount = (rep_ID) => {
    try{  
      // to post total doctors count
      axios.post("http://10.0.2.2:3001/homePage/doctorCount",{
        rep_ID : rep_ID, 
      }).then((response)=>{
        // console.log(response.data.doctorCount);      
        setStateData({...stateData, doctorCount: response.data.doctorCount });
      });  
    } catch (err) {
      console.log(err);
      console.log("Error while get Static Data");
    }
  };

  const getSheduledTaskCount = (rep_ID) => {
    try{  
      // to post sheduled task count
      axios.post("http://10.0.2.2:3001/homePage/SheduledTaskCount",{
        rep_ID : rep_ID, 
      }).then((response)=>{
        setStateData({...stateData, SheduledTaskCount: response.data.SheduledTaskCount });
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Static Data");
    }
  };

  const getProductCount = () => {
    try{  
      // to post total products count
      axios.get("http://10.0.2.2:3001/homePage/productsCount").then((response)=>{
        setStateData({...stateData, productsCount: response.data.productsCount });
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Static Data");
    }
  };
    

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
      <Image style= {Styles.homelogo} 
      source ={require('../assets/logoWithoutName.png')} 
      />
      <Text style={Styles.header}>Good Morning, Aamir!</Text>
      <Text style={{alignSelf : 'center'}}> You have 0 task or sheduled today {"\n"} </Text>
  

        <View style = {styles.sameRow}>
          <View style={{alignItems: 'center'}}>
            <Text> {stateData.reportCount} </Text>
            <Text> Visit Report </Text>
            <FontAwesome5Icon name= "file-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {stateData.expensesCount} </Text>
            <Text> Claimed Expenses </Text>
            <FontAwesome5Icon name= "money-bill-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageExpenses')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {stateData.leaveCount} </Text>
            <Text> Leave Taken </Text>
            <FontAwesome5Icon name= "adjust" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          </View>
        </View>


        <View style = {styles.sameRow}>
          <View style={{alignItems: 'center'}}>
            <Text> {stateData.doctorCount} </Text>
            <Text> Total Doctors </Text>
            <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('DoctorDetails')}></FontistoIcon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {stateData.SheduledTaskCount} </Text>
            <Text> Sheduled Task </Text>
            <FontAwesome5Icon name= "tasks" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ProductDetails')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {stateData.productsCount} </Text>
            <Text> Total Products </Text>
            <FontAwesome5Icon name= "capsules" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('')}></FontAwesome5Icon>
          </View>
        </View>


        <View style ={styles.sheduleContainer}>
          <View style = {styles.sameRow}>
            <Text style={styles.TaskHeader}>Task and Shedules </Text>
            <Button
              color = '#0A6466'
              title = 'Add new'
              onPress= {() => navigation.navigate('AddNewTask')}
            />
            <Button
              color = '#0A6466'
              title = 'TestForm'
              // onPress= {() => navigation.navigate('TestForm')}
              onPress= {() => getStaticCounts(user.rep_ID)}
              // onPress= {() => readStorage()}          
            />
          </View>
          <View style={{borderBottomColor : 'black', borderBottomWidth : 1,  marginBottom : 15, }}></View>
        </View>

      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  sheduleContainer : {
    flex : 1,
    width : '100%',
    minHeight : 300,
    padding: 15,
    backgroundColor : '#E5E5E5',
    borderRadius : 5,
  },

  TaskHeader : {
    color : theme.colors.primary,
    fontWeight : 'bold',
    fontSize : 18,
    flexDirection : 'row',
    justifyContent: 'space-between',
  },

  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
})

