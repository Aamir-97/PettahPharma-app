import React from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, Button} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card} from 'react-native-paper';
import ExpensesGraph from '../components/ExpensesGraph'


export default function ManageExpenses({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

      <View style = {styles.sameRow}>
      <Text></Text>
        <Button color = '#0A6466' title = 'claim'
          onPress={() => navigation.navigate('ClaimExpenses')}>Claim</Button>

      </View>
      
      <View>
      <ExpensesGraph />
      <Card style={ styles.card }>
        <Card.Title title="Expenses for the Day"/>
        <View style={{ marginBottom : 25 }}></View>
        <Card.Content >
          <View style = {styles.sameRow}>
          <View style = {styles.sameColumn}>
          <View style={{  marginBottom : 25, }}></View>
          <Text>Food and Drink :</Text>
          <Text>Accomodations :</Text>
          <Text>Travel Expenses :</Text>
          <View style={{  marginBottom : 10, }}></View>
          <Text>Total :</Text>
          </View>
          <View style = {styles.sameColumn}>
          <View style={{ marginBottom : 25 }}></View> 
          <Text>Rs.706</Text>
          <Text>Rs.5789</Text>
          <Text>Rs.824</Text>
          <View style={{ marginBottom : 10 }}></View> 
          <Text>Rs.7319</Text>
          </View>

          </View>
        </Card.Content>
      </Card> 
      </View>

      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create ({
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 5,
    marginTop : 5,
    width : '100%'
  },
  card: {
    backgroundColor :"#D2F7F7",
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  }
})
