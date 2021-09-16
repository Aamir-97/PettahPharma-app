import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native'
import { Button }from 'react-native-paper'
import Styles from '../core/Styles'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import BackgroundLayout from '../components/BackgroundLayout'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { ListItem, Icon } from 'react-native-elements'


import axios from 'axios'

export default function HomeScreen({ navigation }) {

  const [rep_ID, setRepID] = React.useState('');

  const [reportCount, setReportCount] = React.useState('');
  const [expensesAmount, setExpensesAmount] = React.useState('');
  const [leaveCount, setLeaveCount] = React.useState('');
  const [doctorCount, setDoctorCount] = React.useState('');
  const [sheduledTaskCount, setSheduledTaskCount] = React.useState('');
  const [completedTaskCount, setCompletedTaskCount] = React.useState(-1);
  const [productsCount, setProductsCount] = React.useState('');
  const [userName, setuserName] = React.useState('');

  const [taskList, setTaskList]=useState([]);

  useEffect(() => {
      fetchData();
      console.log("useEffect");
      return navigation.addListener('focus', () => {
        fetchData();
      });
  },[rep_ID]);

      async function fetchData(){

        try {
          const userProfile = await AsyncStorage.getItem('user');
          const profile  = JSON.parse(userProfile);
          if (userProfile !== null){
            setRepID(profile.rep_ID);
            console.log("user");       
          }
        } catch (e){
          console.log(e);
        }

      if(rep_ID){
      
        try{  
          await axios.post("http://10.0.2.2:3001/HomePage/StatisticsData",{
          rep_ID : rep_ID,  
        }).then((response)=>{
          setReportCount(response.data[0].reportCount);
          setExpensesAmount(response.data[0].expensesAmount);
          setLeaveCount(response.data[0].leaveCount);
          setDoctorCount(response.data[0].doctorCount);
          setSheduledTaskCount(response.data[0].ScheduledTaskCount);
          setCompletedTaskCount(response.data[0].completedTaskCount);
          setProductsCount(response.data[0].productsCount);
          console.log("/HomePage/StatisticsData");
        });
        } catch (err) {
          console.log(err);
          console.log("Error while get report count");
        }

        try{  
          await axios.post("http://10.0.2.2:3001/homePage/viewTask",{
            rep_ID : rep_ID,  
        }).then((response)=>{
          setTaskList(response.data);
          console.log("ViewTask");            
        });
        await axios.post("http://10.0.2.2:3001/profileDetails",{
          rep_ID : rep_ID,  
        }).then((response)=>{
          setuserName(response.data[0].name);
          console.log("HomePageRepName");
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while getTask for view, Error While get rep name");  
        }

      }
    }; 

  const viewTask = (task_id) =>{
    navigation.navigate('ViewTask', {task_id});
  }

    

  return (
    <SafeAreaView>
      <ScrollView> 
      {completedTaskCount === -1 ? (
      <View style={{justifyContent: 'center',alignItems : 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      ) :

      (<BackgroundLayout>

      <Image style= {Styles.homelogo} 
      source ={require('../assets/logoWithoutName.png')} 
      />
      <Text style={Styles.header}>Good Morning, {userName}!</Text>
      <View style={{alignSelf : 'center', flexDirection : 'row'}}>
        <Text style ={styles.countTextLabel}> You have </Text>
        <Text style ={{ color: 'red', fontSize : 15, fontWeight : 'bold'} }> {sheduledTaskCount} </Text> 
        <Text style ={styles.countTextLabel}> task or scheduled today {"\n"} </Text>
      </View>
  

        <View style = {styles.sameRow}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.countText}> {reportCount} </Text>
            <Text style={styles.countTextLabel}> Visit Report </Text>
            <FontAwesome5Icon name= "file-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.countText}> {expensesAmount}.00 </Text>
            <Text style={styles.countTextLabel}> Claimed Expenses </Text>
            <FontAwesome5Icon name= "money-bill-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageExpenses')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.countText}> {leaveCount}/40 </Text>
            <Text style={styles.countTextLabel}> Leave Taken </Text>
            <FontAwesome5Icon name= "adjust" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          </View>
        </View> 


        <View style = {styles.sameRow}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.countText}> {doctorCount} </Text>
            <Text style={styles.countTextLabel}> Total Doctors </Text>
            <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('DoctorDetails')}></FontistoIcon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.countText}> {completedTaskCount} </Text>
            <Text style={styles.countTextLabel}> Completed Tasks </Text>
            <FontAwesome5Icon name= "tasks" size= {30} color={theme.colors.primary} onPress= {() => console.log("Task Clikked")}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.countText}> {productsCount} </Text>
            <Text style={styles.countTextLabel}> Total Products </Text>
            <FontAwesome5Icon name= "capsules" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ProductDetails')}></FontAwesome5Icon>
          </View>
        </View>


        <View style ={styles.sheduleContainer}>

          <View style = {styles.sameRow}>
            <Text style= {styles.TaskHeader}>Task and Schedules </Text>
            <Button
                mode='contained'
                icon={({color, size}) => (
                    <Icons
                    name="add" 
                    color={theme.colors.surface}
                    size={25}
                    />
                )}
                onPress={() => navigation.navigate('AddNewTask')} 
                > Schedule 
            </Button>
          </View>
          <View style={{borderBottomColor : theme.colors.primary, borderBottomWidth : 1,  marginBottom : 10, }}></View>

          
          {taskList.map((record,i) => {
              const dtt = new Date(record.date);
              const year = dtt.getFullYear() + '/';
              const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
              const day = ('0' + dtt.getDate()).slice(-2);
                    return( 
                  <TouchableOpacity
                      key={record.task_id}
                      onPress = {() => viewTask(record.task_id)}
                  >          
                    <ListItem bottomDivider>
                      <FontAwesome5Icon name='window-restore' size={22} color={theme.colors.primary}/>
                      <ListItem.Content>
                        <ListItem.Title style={{color: theme.colors.primary, fontWeight : 'bold'}}>{record.title} - ({record.type})</ListItem.Title>
                        <ListItem.Subtitle style= {styles.Subtitle}>{year + month + day} - {record.location}</ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>  
                  </TouchableOpacity>    
                )
              })
            }

        </View>

      </BackgroundLayout>      
      )}
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
    backgroundColor : theme.colors.surface,
    borderRadius : 5,
    shadowColor : '#D2F7F7',
    elevation : 10,
    borderColor : theme.colors.primary,
    borderWidth : 1
  },

  TaskHeader : {
    color : theme.colors.primary,
    fontWeight : 'bold',
    fontSize : 18,
    flexDirection : 'row',
    justifyContent: 'space-between',
    top : 5
  },

  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
  Subtitle: {
    fontSize : 15,
  },
  countText : {
    fontSize : 15,
    fontWeight : 'bold',
    color : theme.colors.primary
  },
  countTextLabel : {
    fontSize : 15,
    fontWeight : 'bold'
  }
})

