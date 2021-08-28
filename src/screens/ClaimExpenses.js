import React, {useState} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import Image from '../components/Image'
// import Currencyinput from '../components/Currencyinput'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-paper'
import axios from 'axios';
import UploadButton from '../components/UploadButton'
  
export default function ClaimExpenses({ navigation }) {

  const [rep_ID , setRepId] = React.useState('');
  const [expense_Type , setExpenseType] = React.useState('');
  const [location , setLocation] = React.useState('');
  const [amount , setAmount] = React.useState('');
  const [bills , setBills] = React.useState('');
  const [description , setDescription] = React.useState('');
  
  const saveDetails = () => { 
    axios.post("http://10.0.2.2:3001/claimexpenses", {
      rep_ID: rep_ID, 
      expense_Type: expense_Type,
      location : location, 
      amount: amount, 
      bills: bills, 
      description: description, 
    }).then(()=>{
        console.log(expense_ID);
        console.log("Succesfully Inserted:!");
        Alert.alert(
            "Database",
            "Claim form submitted...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancelled"),
                style: "cancel"
              },
              { text: "Submit", onPress: () => console.log("Submitted") }
            ]
          );
    })

};

  return (
    <SafeAreaView>
    <ScrollView> 
    <BackgroundLayout>

    <View style ={styles.expensesContainer}>
      <Text style={styles.header}>Claim Form</Text> 

      <TextInput style={styles.InputField} placeholder="Med Rep ID"  onChangeText={(val) => setRepId(val)}
                    value={rep_ID}/>  
      
      <Picker> expense_Type={expense_Type} style={{ height: 50, width: 150 }} onValueChange={(itemValue,itemIndex) => setExpenseType(itemValue)}
            <Picker.Item label="Travel Expenses" value="1" />
            <Picker.Item label="Accomodation" value="2" />
            <Picker.Item label="Food and Drink" value="3" />
      </Picker>
      
      <TextInput style={styles.InputField} placeholder="Location"  onChangeText={(val) => setLocation(val)}
                    value={location}/>
      {/* <TextInput style={styles.InputField} placeholder="Upload Bills"  onChangeText={(val) => setBills(val)}
                    value={bills}/> */}
      {/* <Image icon="camera" mode="contained" onPress={(val) => setBills(val)}
                    value={amount}>Upload Bills</Image> */}
      <Image/>
      {/* Upload Bills: <UploadButton onPress={(val) => setBills(val)}
                    value={bills}/> */}
      <TextInput style={styles.comments} placeholder="Comments"  onChangeText={(val) => setDescription(val)}
                    value={description}/>
         {/* <Currencyinput/>  */}
        {/* <Image/> */}
      <View style = {styles.sameRow}>
        <Button color = '#0A6466' title = 'submit' onPress={() => {saveDetails()}}></Button>
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