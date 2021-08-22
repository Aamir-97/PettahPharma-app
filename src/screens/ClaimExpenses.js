import React, {useState} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet, Button} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import Currencyinput from '../components/CurrencyInput'
import ImagePicker from 'react-native-image-crop-picker';

  
export default function ClaimExpenses({ navigation }) {
  return (
    <SafeAreaView>
    <ScrollView> 
    <BackgroundLayout>

    <View style ={styles.expensesContainer}>
      <Text style={styles.header}>Claim Form</Text> 

      <TextInput style={styles.InputField} placeholder="Med Rep ID" />  
      
      <Picker>
        {/* selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} */}
            <Picker.Item label="Travel Expenses" value="1" />
            <Picker.Item label="Accomodation" value="2" />
            <Picker.Item label="Food and Drink" value="3" />
      </Picker>
      
      <TextInput style={styles.InputField} placeholder="Location" />
      <TextInput style={styles.InputField} placeholder="Upload Bills" />
      <TextInput style={styles.InputField} placeholder="Amount" />
      <TextInput style={styles.comments} placeholder="Comments" />
         {/* <Currencyinput/>  */}
        {/* <Image/> */}
      <View style = {styles.sameRow}>
        <Button color = '#0A6466' title = 'submit' onPress={() => { alert('Applied') }}>Apply</Button>
        <Button color = '#0A6466' title = 'cancel' onPress={() => { alert('Cancelled') }}>Cancel</Button>
      </View>
    </View>

    </BackgroundLayout>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  header : {
    fontSize : 20,
    fontWeight : 'bold',
    alignSelf : 'center',
    marginBottom : 30,
    color : theme.colors.primary
    
},
  expensesContainer : {
    flex : 1,
    width : '100%',
    minHeight : 300,
    // margin : 20,
    padding: 15,
    backgroundColor : '#E5E5E5',
    borderRadius : 5,

  },
  InputField : {
    alignSelf : 'stretch',
    height : 35,
    marginBottom : 25,
    borderBottomColor : '#009387',
    borderBottomWidth : 1,
    fontSize : 16,
    
},
  comments : {
    height : 100,
    borderColor : '#0A6466',
    borderWidth : 1,
    marginBottom : 30,
    padding : 20
},
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
})