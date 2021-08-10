import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { theme } from './src/core/theme'
import Icon from 'react-native-vector-icons/Ionicons'

// Screens
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import ApplyLeaves from './src/screens/ApplyLeaves'
import ApprovedLeaves from './src/screens/ApprovedLeaves'
import ClaimExpenses from './src/screens/ClaimExpenses'
import DoctorDetails from './src/screens/DoctorDetails'
import ManageExpenses from './src/screens/ManageExpenses'
import ManageLeaves from './src/screens/ManageLeaves'
import ProductDetails from './src/screens/ProductDetails'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import Task from './src/screens/Task'
import VisitSummaryReport from './src/screens/VisitSummaryReport'
import VSRForm from './src/screens/VSRForm'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator ();
const VisitSummaryReportStack = createStackNavigator ();
const ManageLeavesStack = createStackNavigator ();

const HomeStackScreen= ({navigation}) => {
  return (
    <HomeStack.Navigator 
    initialRouteName = "Home"
    screenOptions={{
      headerStyle: {
        backgroundColor : "#009387",
        height : 50
      },
      headerTintColor : "#ffffff",
      headerTintStyle : {
        fontWeight : 'bold',
        alignItems : 'center',
        justifyContent : 'center'
      }
    }}
    >
    <HomeStack.Screen name="Home" component={HomeScreen} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#009387" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} /> 

    </HomeStack.Navigator>
    
  )

};

const VisitSummaryReportStackScreen = ({navigation}) => {
  return (
    <VisitSummaryReportStack.Navigator
    initialRouteName="VisitSummaryReport" 
    screenOptions={{
      headerStyle: {
        backgroundColor : "#009387",
        height : 50
      },
      headerTintColor : "#ffffff",
      headerTintStyle : {
        fontWeight : 'bold',
        alignItems : 'center',
        justifyContent : 'center'
      }
    }}
      >
      <VisitSummaryReportStack.Screen  name="VisitSummaryReport" component={VisitSummaryReport} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#009387" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} />
      <VisitSummaryReportStack.Screen  name="VSRForm" component={VSRForm} options={{
        title: "New Report"
      }} />

    </VisitSummaryReportStack.Navigator>
  )
};


const ManageLeavesStackScreen = ({navigation}) => {
  return (
    <ManageLeavesStack.Navigator 
    initialRouteName = "ManageLeaves"
    screenOptions={{
      headerStyle: {
        backgroundColor : "#009387",
        height : 50
      },
      headerTintColor : "#ffffff",
      headerTintStyle : {
        fontWeight : 'bold',
        alignItems : 'center',
        justifyContent : 'center'
      }
    }}
    >
      <ManageLeavesStack.Screen name="ManageLeaves" component={ManageLeaves} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#009387" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }}/>
      <ManageLeavesStack.Screen name="ApplyLeaves" component={ApplyLeaves} />
      <ManageLeavesStack.Screen name="ApprovedLeaves" component={ApprovedLeaves} />

    </ManageLeavesStack.Navigator>
  )
}

export default function Routes() {
  return (
    <NavigationContainer>
    <Provider theme={theme}>      
      <Drawer.Navigator initialRouteName="VisitSummaryReport"
                screenOptions={{
                  headerStyle: {
                    backgroundColor : "#009387",
                    height : 50
                  },
                  headerTintColor : "#ffffff",
                  headerTintStyle : {
                    fontWeight : 'bold',
                    alignItems : 'center',
                    justifyContent : 'center',
                  }
                  }}
                  >

          <Drawer.Screen name="StartScreen" component={StartScreen} options={{headerShown : false, drawerLabel: () => null , title: null, drawerIcon: () => null}} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{headerShown : false, drawerLabel: () => null , title: null, drawerIcon: () => null }} />
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="VisitSummaryReport" component={VisitSummaryReportStackScreen} />
          <Drawer.Screen name="ManageExpenses" component={ManageExpenses} />
          <Drawer.Screen name="ManageLeaves" component={ManageLeavesStackScreen} />
          <Drawer.Screen name="DoctorDetails" component={DoctorDetails} />
          <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      </Drawer.Navigator> 
      
    </Provider>
    </NavigationContainer>
  )
};
