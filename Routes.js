import React, { useState, useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { theme } from './src/core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import { DrawerContent } from './src/screens/DrawerContent'
import { AuthContext } from './src/components/context'

import AsyncStorage from '@react-native-async-storage/async-storage'

// Screens
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import ApplyLeaves from './src/screens/ApplyLeaves'
import AnnualLeaves from './src/screens/AnnualLeaves'
import ClaimExpenses from './src/screens/ClaimExpenses'
import DoctorDetails from './src/screens/DoctorDetails'
import ManageExpenses from './src/screens/ManageExpenses'
import ManageLeaves from './src/screens/ManageLeaves'
import ProductDetails from './src/screens/ProductDetails'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import VisitSummaryReport from './src/screens/VisitSummaryReport'
import VSRForm from './src/screens/VSRForm'
import AddNewTask from './src/screens/AddNewTask'
import AddNewDoctor from './src/screens/AddNewDoctor'
import DiscussionForum from './src/screens/DiscussionForum'
import TestForm from './src/screens/TestForm'
import { View, ActivityIndicator } from 'react-native'
import Profile from './src/screens/Profile'
import EditProfile from './src/screens/EditProfile'


const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator ();
const VisitSummaryReportStack = createStackNavigator ();
const ManageLeavesStack = createStackNavigator ();
const ManageExpensesStack = createStackNavigator ();
const DoctorDetailsStack = createStackNavigator ();
const ProfileStack = createStackNavigator ();

const HomeStackScreen= ({navigation}) => {
  return (
    <HomeStack.Navigator 
    initialRouteName = "Home"
    screenOptions={{
      headerStyle: {
        backgroundColor : "#0A6466",
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
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} /> 
    <HomeStack.Screen name="AddNewTask" component = {AddNewTask} />
    <HomeStack.Screen name="TestForm" component = {TestForm} />

    </HomeStack.Navigator>
    
  )

};

const VisitSummaryReportStackScreen = ({navigation}) => {
  return (
    <VisitSummaryReportStack.Navigator
    initialRouteName="VisitSummaryReport" 
    screenOptions={{
      headerStyle: {
        backgroundColor : "#0A6466",
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
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} />
      <VisitSummaryReportStack.Screen  name="VSRForm" component={VSRForm} options={{
        title: "New Report"
      }} />

    </VisitSummaryReportStack.Navigator>
  )
};


const DoctorDetailsStackScreen = ({navigation}) => {
  return (
    <DoctorDetailsStack.Navigator
    initialRouteName="DoctorDetails" 
    screenOptions={{
      headerStyle: {
        backgroundColor : "#0A6466",
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
      <DoctorDetailsStack.Screen  name="DoctorDetails" component={DoctorDetails} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} />
      <DoctorDetailsStack.Screen  name="AddNewDoctor" component={AddNewDoctor} options={{
        title: "Add New Doctor"
      }} />

    </DoctorDetailsStack.Navigator>
  )
};


const ManageLeavesStackScreen = ({navigation}) => {
  return (
    <ManageLeavesStack.Navigator 
    initialRouteName = "ManageLeaves"
    screenOptions={{
      headerStyle: {
        backgroundColor : "#0A6466",
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
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }}/>
      <ManageLeavesStack.Screen name="ApplyLeaves" component={ApplyLeaves} options={{
        title: "Apply Leaves"
      }} />
      <ManageLeavesStack.Screen name="AnnualLeaves" component={AnnualLeaves} options={{
        title: "Annual Leaves"
      }} />

    </ManageLeavesStack.Navigator>
  )
};

const AuthStackScreen = ({navigation}) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="StartScreen" component={StartScreen} 
      options ={{
        headerShown :false,
      }}
      />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} 
      options= { {
        headerShown : false,
      }}/>
      <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} 
      options= { {
        headerShown : false,
      }}/>
      <AuthStack.Screen name="Home" component={HomeStackScreen} 
            options= { {
              headerShown : false,
            }}/>
    </AuthStack.Navigator>
  )
}


const ManageExpensesStackScreen = ({navigation}) => {
  return (
    <ManageExpensesStack.Navigator 
    initialRouteName = "ManageExpenses"
    screenOptions={{
      headerStyle: {
        backgroundColor : "#0A6466",
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
      <ManageExpensesStack.Screen name="ManageExpenses" component={ManageExpenses} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }}/>
      <ManageExpensesStack.Screen name="ClaimExpenses" component={ClaimExpenses} options={{
        title: "Claim Expenses"
      }} />

    </ManageExpensesStack.Navigator>
  )
};

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
    initialRouteName="Profile" 
    screenOptions={{
      headerStyle: {
        backgroundColor : "#0A6466",
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
      <ProfileStack.Screen  name="Profile" component={Profile} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} />
      <ProfileStack.Screen  name="EditProfile" component={EditProfile} options={{
        title: "Edit Profile"
      }} />

    </ProfileStack.Navigator>
  )
};

export default function Routes() {

  const initialLoginState = {
    isLoading : true,
    userName : null,
    userToken : null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN':
       return {
         ...prevState,
         userToken : action.token,
         isLoading : false,
       };
      case 'LOGIN':
       return {
        ...prevState,
        userToken : action.token,
        userEmail : action.email,
        userID : action.id,
        isLoading : false,
       };
      case 'LOGOUT':
       return {
        ...prevState,
        userToken : null,
        userName : null,
        isLoading : false,
       };
    }
  }

  const [loginState , dispatch ] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(email, password) => {
      let userToken, userID;
      userToken, userID = null;
      console.log("Sign In Function in route file");
      // console.log(email);
      // console.log(password);
      try {
        axios.post("http://10.0.2.2:3001/login", {
          email: email,
          password: password,
        }).then((response)=>{
          console.log (response.data.id);
          if (response.data.id){
            userToken = 'medicalrep';
            dispatch({ type : 'LOGIN', id:userID , email: email, token: userToken  });
          }
        });
        await AsyncStorage.setItem(key, userToken);
      } catch (e){
        console.log(e);
      }


    },
    
    signOut: async() => {
      // setIsLoading(false);
      // setUserToken(null);
      try {
        userToken = 'medicalrep';
        await AsyncStorage.removeItem('userToken')
      } catch (e){
        console.log(e);
      }
      dispatch({ type : 'LOGOUT' });

    },

  }),[]);

  // useEffect(() => {
  //   setTimeout(async()=>{
  //     let userToken;
  //     userToken= null;
  //     try {
  //       userToken = await AsyncStorage.getItem('userToken', userToken);        
  //     } catch (e){
  //       console.log(e);
  //     }
  //     dispatch({ type : 'RETRIEVE_TOKEN', token: userToken });

  //   });

  // },[]);

  if (loginState.isloading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext} >
    <NavigationContainer>
    <Provider theme={theme}>          
      { loginState.userToken == null ? (
      <Drawer.Navigator 
                screenOptions={{
                  headerStyle: {
                    backgroundColor : "#0A6466",
                    height : 50
                  },
                  headerTintColor : "#ffffff",
                  headerTintStyle : {
                    fontWeight : 'bold',
                    alignItems : 'center',
                    justifyContent : 'center',
                  }
                  }}
                  drawerContent={props => <DrawerContent {...props}/>}
                  >

          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Profile" component={Profile} options={{ headerShown : true }}/>
          <Drawer.Screen name="ManageExpenses" component={ManageExpensesStackScreen} />
          <Drawer.Screen name="ManageLeaves" component={ManageLeavesStackScreen} />
          <Drawer.Screen name="VisitSummaryReport" component={VisitSummaryReportStackScreen} />
          <Drawer.Screen name="DoctorDetails" component={DoctorDetailsStackScreen} />
          <Drawer.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown : true }} />
          <Drawer.Screen name="DiscussionForum" component={DiscussionForum} options={{ headerShown : true }} />
      </Drawer.Navigator>  

      ) : 
        <AuthStackScreen />
                  
      }      
    </Provider>
    </NavigationContainer>
    </AuthContext.Provider>

  )
};
