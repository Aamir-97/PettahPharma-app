import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { theme } from './src/core/theme'
import Icon from 'react-native-vector-icons/Ionicons'

import {
  StartScreen,
  LoginScreen,
  ResetPasswordScreen,
  HomeScreen,
  ManageExpenses,
  ManageLeaves,
  ApplyLeaves,
  ApprovedLeaves,
  ClaimExpenses,
  Task,
  VisitSummaryReport,
  VSRForm,
  DoctorDetails,
  ProductDetails
} from './src/screens'

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const TaskStack = createStackNavigator();
// const LoginStack = createStackNavigator();
// const HomeStack = createStackNavigator();

const TaskStackScreen = ({navigation}) => {
  <TaskStack.Navigator>
    <TaskStack name="VSRForm" component={VSRForm} ></TaskStack>
  </TaskStack.Navigator>
}

// const LoginStackScreen = ({navigation}) => {
//   <LoginStack.Navigator>
//     <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
//   </LoginStack.Navigator>
// }

// const HomeStackScreen = ({navigation}) => {
//           <HomeStack.Navigator
//           screenOptions={{
//             headerStyle: {
//               backgroundColor : "#009387",
//               height : 50
//             },
//             headerTintColor : "#ffffff",
//             headerTintStyle : {
//               fontWeight : 'bold',
//             }
//           }}
//         >
//           <HomeStack.Screen name="Home" component={HomeScreen} options={{
//             title : 'Home',
//             headerLeft : () => (
//               <Icon.Button name="menu" size= {25}
//               backgroundColor ='#009387' onPress={() => navigation.openDrawer()}></Icon.Button>
//             )
//           }} />
//         </HomeStack.Navigator>
// }


export default function Routes() {
  return (
    <NavigationContainer>
    <Provider theme={theme}>
      <Drawer.Navigator initialRouteName="StartScreen"
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
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="ManageExpenses" component={ManageExpenses} />
          <Drawer.Screen name="ManageLeaves" component={ManageLeaves} />
          <Drawer.Screen name="ApprovedLeaves" component={ApprovedLeaves} />
          <Drawer.Screen name="Task" component={Task} />
          <Drawer.Screen name="VisitSummaryReport" component={VisitSummaryReport} />
          <Drawer.Screen name="DoctorDetails" component={DoctorDetails} />
          <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      </Drawer.Navigator>
      
        {/* <Stack.Navigator
          initialRouteName="StartScreen"
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
            // headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown : false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown : false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
          <Stack.Screen name="ClaimExpenses" component={ClaimExpenses} />
          <Stack.Screen name="ManageLeaves" component={ManageLeaves} />
          <Stack.Screen name="ApplyLeaves" component={ApplyLeaves} />
          <Stack.Screen name="ApprovedLeaves" component={ApprovedLeaves} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="VisitSummaryReport" component={VisitSummaryReport} />
          <Stack.Screen name="VSRForm" component={VSRForm} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator> */}
      
    </Provider>
    </NavigationContainer>
  )
}
