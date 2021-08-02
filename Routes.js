import React from 'react'
import { Provider } from 'react-native-paper'
// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  ResetPasswordScreen,
  Dashboard,
  ManageExpenses,
  ManageLeaves,
  ApplyLeaves,
  ApprovedLeaves,
  ClaimExpenses,
} from './src/screens'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <Provider theme={theme}>
      
      
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
          <Stack.Screen name="ClaimExpenses" component={ClaimExpenses} />
          <Stack.Screen name="ManageLeaves" component={ManageLeaves} />
          <Stack.Screen name="ApplyLeaves" component={ApplyLeaves} />
          <Stack.Screen name="ApprovedLeaves" component={ApprovedLeaves} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      
    </Provider>
  )
}
