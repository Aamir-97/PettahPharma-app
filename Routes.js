import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-native-paper'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { theme } from './src/core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import { DrawerContent } from './src/screens/DrawerContent'
import { AuthContext } from './src/components/context'


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
import { View, ActivityIndicator, Alert } from 'react-native'
import Profile from './src/screens/Profile'
import EditProfile from './src/screens/EditProfile'
import ViewTask from './src/screens/ViewTask'
import ViewDoctor from './src/screens/ViewDoctor'
import ViewProduct from './src/screens/ViewProduct'
import ViewExpense from './src/screens/ViewExpense'
import ViewLeave from './src/screens/ViewLeave'
import ViewPendingLeave from './src/screens/ViewPendingLeave'
import ViewVSR from './src/screens/ViewVSR';


const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator ();
const VisitSummaryReportStack = createStackNavigator ();
const ManageLeavesStack = createStackNavigator ();
const ManageExpensesStack = createStackNavigator ();
const DoctorDetailsStack = createStackNavigator ();
const ProductDetailsStack = createStackNavigator ();
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
    <HomeStack.Screen name="AddNewTask" component = {AddNewTask} options={{ title:'Add New Schedule'}} />
    <HomeStack.Screen name="ViewTask" component = {ViewTask} options={{ title:'Task Details'}}/>

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
        ),
        title: "Visit Summary Reports"
      }} />
      <VisitSummaryReportStack.Screen  name="VSRForm" component={VSRForm} options={{
        title: "New Report",
        // headerLeft: () => (
        //   <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        // ),
      }} />

      <VisitSummaryReportStack.Screen  name="ViewVSR" component={ViewVSR} options={{
        title: "Edit VS Report",
        // headerLeft: () => (
        //   <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        // ),
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
      <DoctorDetailsStack.Screen  name="ViewDoctor" component={ViewDoctor} options={{
        title: "Doctor's Details",
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} />

    </DoctorDetailsStack.Navigator>
  )
};

const ProductDetailsStackScreen = ({navigation}) => {
  return (
    <ProductDetailsStack.Navigator
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
      <ProductDetailsStack.Screen  name="ProductDetails" component={ProductDetails} options= { {
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }} />
      <ProductDetailsStack.Screen  name="ViewProduct" component={ViewProduct} options={{
        title: "Product's Details"
      }} />
    </ProductDetailsStack.Navigator>
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
      <ManageLeavesStack.Screen name="ManageLeaves" component={ManageLeaves} options= {{
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        ),
        title: "Pending Leaves"
      }}/>
      <ManageLeavesStack.Screen name="ApplyLeaves" component={ApplyLeaves} options={{
        title: "Apply Leaves"
      }} />
      <ManageLeavesStack.Screen name="AnnualLeaves" component={AnnualLeaves} options={{
        title: "Approved & Rejected Leaves"
      }} />

      <ManageLeavesStack.Screen  name="ViewLeave" component={ViewLeave} options={{
        title: "Leave Details"
      }} />
      <ManageLeavesStack.Screen  name="ViewPendingLeave" component={ViewPendingLeave} options={{
        title: "Pending Leave Details"
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
        title : 'Manage Expenses',
        headerLeft: () => (
          <Icon.Button name= "menu" size= {25} backgroundColor="#0A6466" onPress= { () => navigation.openDrawer()}></Icon.Button>
        )
      }}/>
      <ManageExpensesStack.Screen name="ClaimExpenses" component={ClaimExpenses} options={{
        title: "Claim Expenses"
      }} />

      <ManageExpensesStack.Screen  name="ViewExpense" component={ViewExpense} options={{
        title: "Expense Details"
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
      <ProfileStack.Screen  name="Home" component={HomeScreen} />


    </ProfileStack.Navigator>
  )
};

export default function Routes() {

  const initialLoginState = {
    isLoading : true,
    rep_ID : null,
    manager_ID: null,
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
        rep_ID : action.id,
        manager_ID : action.man_ID,
        isLoading : false,
       };
      case 'LOGOUT':
       return {
        ...prevState,
        userToken : null,
        rep_ID : null,
        manager_ID : null,
        isLoading : false,
       };
    }
  }

  const [loginState , dispatch ] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(email, password) => {
      let userToken, rep_ID, manager_ID;
      userToken, rep_ID, manager_ID = null;
      try {
        axios.post("http://10.0.2.2:3001/login", {
          email: email,
          password: password,
        }).then((response)=>{
          // console.log (response.data.id);
          if (response.data.rep_ID){
            userToken = 'medicalrep';
            const user = {
              rep_ID : response.data.rep_ID,
              manager_ID : response.data.manager_ID,
              userToken: userToken,
            };
            storeData(user);
            dispatch({ type : 'LOGIN', id: rep_ID, man_ID: manager_ID,  token: userToken  });

          } else if (response.data.message) {
            Alert.alert(response.data.message, "Check your email and password...!");
          }
        });
      } catch (e){
        console.log(e);
      }
    },
    
    signOut: async() => {
      try {
        loginState.userToken = 'medicalrep';
        // await AsyncStorage.removeItem('userToken'); 
        await AsyncStorage.removeItem('user'); 
        await AsyncStorage.clear();
      } catch (e){
        console.log(e);
      }
      dispatch({ type : 'LOGOUT' });
    },

  }),[loginState.userToken]);

  const storeData = async (value) => {
    try {
      // console.log(value, "-----Value Assigned----");
      await AsyncStorage.setItem('user',JSON.stringify(value));
    }catch (err) {
      console.log(err, "Error while storing the values.");
    }
  }

  useEffect(() => {
    setTimeout(async()=>{
      let userToken;
      userToken= null;
      // userToken= "medicalRep";
      try {   
        // const userProfile = await AsyncStorage.getItem('user');
        // const profile  = JSON.parse(userProfile); 
        // userToken = profile.userToken;
        userToken = await AsyncStorage.getItem('user');
      } catch (e){
        console.log(e);
      }
      dispatch({ type : 'RETRIEVE_TOKEN', token: userToken });
    });

  },[]);

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
      { loginState.userToken !== null ? (
      <Drawer.Navigator 
          drawerContent={props => <DrawerContent {...props}/>}
      >

          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
          <Drawer.Screen name="ManageExpenses" component={ManageExpensesStackScreen} />
          <Drawer.Screen name="ManageLeaves" component={ManageLeavesStackScreen} />
          <Drawer.Screen name="VisitSummaryReport" component={VisitSummaryReportStackScreen} />
          <Drawer.Screen name="DoctorDetails" component={DoctorDetailsStackScreen} />
          <Drawer.Screen name="ProductDetails" component={ProductDetailsStackScreen} />
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
