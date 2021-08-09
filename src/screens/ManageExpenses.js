import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import ExpensesGraph from '../components/ExpensesGraph'
// import Expenses from '../components/Expenses'
import Styles from '../core/Styles'

export default function ManageExpenses({ navigation }) {
  return (
    <Background>
      <Text style={Styles.header}>Manage Expenses</Text >
      <Button position="right" mode="contained" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'ClaimExpenses' }], }) } >Claim</Button>
      <Text style={Styles.header1}>Monthly Expenses</Text >
      <ExpensesGraph />
      {/* <Expenses/> */}
      <form>
      <label>
          Food and Drink:
            <input type="text" />
        </label>
        <label>
          Fuel:
            <input type="text" />
        </label>
        <label>
          Accomodations:
          <input type="text" />
        </label>
      </form>
    </Background>
  )
}
