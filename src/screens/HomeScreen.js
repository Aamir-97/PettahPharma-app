import React from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import Logo from '../components/Logo'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'


export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>

      
      <TopNav />
      <Logo />
      <Text style={Styles.header}>Good Morning, Aamir!</Text>
      <Paragraph>
        HomeScreen Page Checking
      </Paragraph>
      <Button
        // mode="contained"
        onPress={() => navigation.navigate('ManageLeaves')}
      >
        Manage leaves
      </Button> 
      <Button
        // mode="contained"
        onPress={() => navigation.navigate('ManageExpenses')}
      >
        Manage Expenses
      </Button>
      <Button
        // mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>


      </ScrollView>
    </SafeAreaView>
  )
}

