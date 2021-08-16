import React from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, Button} from 'react-native'
import Logo from '../components/Logo'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
// import Background from '../components/Background'
import { theme } from '../core/theme'
// import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
// import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'



export default function HomeScreen({ navigation }) {
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
          <Text> 56 </Text>
          <Text> Visit Report </Text>
          <FontAwesome5Icon name= "file-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text> 15 </Text>
          <Text> Claimed Expenses </Text>
          <FontAwesome5Icon name= "money-bill-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text> 18 </Text>
          <Text> Annual left Leaves </Text>
          <FontAwesome5Icon name= "adjust" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
        </View>
      </View>


      <View style = {styles.sameRow}>
        <View style={{alignItems: 'center'}}>
          <Text> 30 </Text>
          <Text> Total Doctors </Text>
          <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontistoIcon>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text> 2 </Text>
          <Text> Sheduled Task </Text>
          <FontAwesome5Icon name= "tasks" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text> 26 </Text>
          <Text> Total Products </Text>
          <FontAwesome5Icon name= "capsules" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
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
    // margin : 20,
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

