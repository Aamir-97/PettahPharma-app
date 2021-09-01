import React, {useState,useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet,AsyncStorage, Alert} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import { Button } from 'react-native-paper'
import DocumentPicker from 'react-native-document-picker'
import axios from 'axios';
  
export default function ClaimExpenses({ navigation }) {

  const [rep_ID , setRepId] = useState('');
  const [expense_Type , setExpenseType] = useState('');
  const [location , setLocation] = useState('');
  const [amount , setAmount] = useState('');
  const [bills , setBills] = useState('');
  const [description , setDescription] = useState('');
  
  const saveDetails = () => { 
    // console.log(expense_Type,location,amount,bills,description);
    axios.post("http://10.0.2.2:3001/claimexpenses", {
      rep_ID: user.rep_ID, 
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
              { text: "Cancel", onPress: () => console.log("Cancelled"), style: "cancel" },
              { text: "Submit", onPress: () => console.log("Submitted") }
            ]
          );
    })

};
const [user, setUser] = useState({ rep_ID: '',  manager_ID: '',});
useEffect(() => {
  async function fetchData(){
    try {
      const userProfile = await AsyncStorage.getItem('user');
      const profile  = JSON.parse(userProfile);
      if (profile !== null){
        setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });            
      }
    } catch (e){
      console.log(e);
    }
  }
  fetchData();
},[]);

const uploadBills = async () => {
  try {
      const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
      })
      console.log(
      res.uri, 
      res.type, // mime type
      res.name,
      res.size,
      )
      console.log(res);
      setBills({...profileDetails, display_photo: res.uri});
      
  } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      } else {
      throw err
      }
  }
  return <Text>Success</Text>

}

  return (
    <SafeAreaView>
    <ScrollView> 
    <BackgroundLayout>

    <View style ={styles.expensesContainer}>
      <Text style={styles.header}>Claim Apply Form</Text> 
      
      <Picker expense_Type={expense_Type}selectedValue = {expense_Type} style={styles.InputField} onValueChange={(itemValue,itemIndex) => setExpenseType(itemValue)} >
            <Picker.Item label="Expense Type" value="" />
            <Picker.Item label="Accomodation" value="Accomodation" />
            <Picker.Item label="Fuel" value="Fuel" />
            <Picker.Item label="Daily Batta" value="Daily batta" />
            <Picker.Item label="Other" value="Other" />
        </Picker>

      <Text style = {styles.labelText}>Location</Text>
      <TextInput style={styles.InputField} placeholder="Location"  onChangeText={(val) => setLocation(val)}
                    value={location}/>

      <Text style = {styles.labelText}>Upload Bills</Text>
      <View style={{alignSelf: 'center',marginLeft:20}}>
            <Button icon="camera" mode="contained" onPress={(val) => uploadBills(val)} value={bills}> Upload </Button>
      </View>

      <Text style = {styles.labelText}>Amount</Text>
      <TextInput style={styles.InputField} placeholder="Amount"  onChangeText={(val) => setAmount(val)}
                    value={amount}/> 

      <Text style = {styles.labelText}>Description</Text>
      <TextInput style={styles.comments} placeholder="Description"  onChangeText={(val) => setDescription(val)}
                    value={description}/>

      <View style = {styles.sameRow}>
        <Button mode= 'contained'color = '#0A6466' title = 'cancel' onPress={() => { alert('Cancelled') }}>Cancel</Button>
        <Button mode= 'contained' color = '#0A6466' title = 'submit' onPress={() => {saveDetails()}}>submit</Button>
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
    padding: 15,
    backgroundColor : '#E5E5E5',
    borderRadius : 5,
    height : '100%',
    backgroundColor : theme.colors.surface,
    shadowColor : 'gray',
    elevation : 10,
    marginTop : 20,

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
  labelText : {
    fontSize : 16,
    color : 'black',
},
})