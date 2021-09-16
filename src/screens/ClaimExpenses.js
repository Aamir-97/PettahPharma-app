import React, {useState,useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView, StyleSheet,AsyncStorage, Alert, PermissionsAndroid, Image} from 'react-native'
import { theme } from '../core/theme'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign'
import BackgroundLayout from '../components/BackgroundLayout'
import { Button, IconButton,TextInput } from 'react-native-paper'
import DocumentPicker from 'react-native-document-picker'
import { requiredField } from '../helpers/requiredField';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import axios from 'axios';

  
export default function ClaimExpenses({ navigation }) {

  const [expense_Type , setExpenseType] = React.useState('');
  const [location , setLocation] = React.useState('');
  const [exp_date , setExpDate] = React.useState('');
  const [amount , setAmount] = React.useState('');
  const [bills , setBills] = React.useState('');
  const [description , setDescription] = React.useState('');
  const [bill_uri , setBillUri] = React.useState('');

  const [locationView , setLocationView] = useState(false);
  const [billsView , setBillsView] = useState(false);

  const [rep_ID, setRepID] = React.useState('');


  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setRepID(profile.rep_ID);
          console.log("user");            
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[]);
  
  const saveDetails = () => {
    // console.log("SaveDetails"); 
    axios.post("http://10.0.2.2:3001/ClaimExpenses", {
      rep_ID: rep_ID, 
      expense_Type: expense_Type,
      date : exp_date, 
      location : location, 
      amount: amount, 
      bills: bills, 
      description: description, 
      bill_uri: bill_uri, 
    }).then((response)=>{
        Alert.alert(
            "Database",
            "Claim form submitted...!",
            [
              { text: "Cancel", onPress: () => console.log("Cancelled"), style: "cancel" },
              { text: "Submit", onPress: () => navigation.goBack() }
            ]
          );
    })

  };

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
        // console.log(res);
        setBills(res.uri);
        setBillUri(res.uri);
        setBillsView(true);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        } else {
        throw err
        }
    }
    return <Text>Success</Text>
  }


    // date picker

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    // const showTimepicker = () => {
    //   showMode('time');
    // };



    useEffect(() => {
        // Date convertor
      const dtt = new Date(date);
      const year = dtt.getFullYear() + '/';
      const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
      const day = ('0' + dtt.getDate()).slice(-2);
      setExpDate(year+month+day);
      // console.log("Date");        
      },[date]);


      //   check the required field

      const checkRequired = () => {

        const expense_Type1 = requiredField(expense_Type)
        const location1 = requiredField(location)
        const amount1 = requiredField(amount)
        const exp_date1 = requiredField(exp_date)
        if (expense_Type1 || location1 || amount1 || exp_date1) {
            Alert.alert(
                "Attention.....!",
                "Please fill the required field...!",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("Ok pressed") }
                ]
              )
              return 
        }
        else {
          saveDetails();
        }

      }


  return (
    <SafeAreaView>
    <ScrollView> 
    <BackgroundLayout>

    <View style ={styles.expensesContainer}>
      <View style={{alignSelf : 'center'}}>
        <View style={styles.sameRow}>
          <Icon name="form" size={35} color={theme.colors.primary} />
          <Text style={styles.header}>Expense Claiming Form</Text>
        </View>
      </View>
      <View style ={styles.sameRow}>
          <FontistoIcon
              name="star" 
              color={theme.colors.error}
              size={12}
          />
          <Text style={styles.requiredText}> - Field is required</Text>
      </View>
                    <FontistoIcon
                        name="star" 
                        color={theme.colors.error}
                        size={8}
                        style = {{marginTop:10, marginBottom:-20,marginLeft : -10}}
                        
                    />
          <Picker 
            expense_Type={expense_Type} 
            selectedValue = {expense_Type} 
            style={styles.InputField} 
            onValueChange={(itemValue,itemIndex) => setExpenseType(itemValue)}
             >
              <Picker.Item label="Expense Type" value="" />
              <Picker.Item label="Accomodation" value="Accomodation" />
              <Picker.Item label="Fuel" value="Fuel" />
              <Picker.Item label="Daily Batta" value="Daily batta" />
              <Picker.Item label="Other" value="Other" />
          </Picker>

      <View style={{borderWidth : 0.5, borderTopColor: theme.colors.primary, marginTop : -22, marginBottom : 22}}></View>

      <Text style = {styles.labelText}>Location : </Text>
          <FontistoIcon
              name="star" 
              color={theme.colors.error}
              size={8}
              style = {{marginTop:10, marginBottom:-20,marginLeft : -10}}
              
          />
          <TextInput 
            style={styles.InputField} 
            placeholder="Place where you are :"  
            onChangeText={(val) => setLocation(val)}
            value={location}
            // keyboardType = 'number-pad'
          />

      <View style={{flexDirection  : 'row' , flex : 2, alignSelf : 'center'}}>
                <View style={{flex : 2}}>
                    <Text style = {styles.labelText}>Date : </Text> 
                </View>
                <View style={{flex : 2}}>
                    <TextInput
                        editable = {false}
                        label= 'Date'
                        mode= 'outlined'
                        outlineColor = {theme.colors.primary}
                        width = {150}
                        style={styles.InputField} 
                        value= {exp_date}
                    />
                </View>

                <View style={{flex : 2}}>
                    <IconButton
                        style = {{margin : -8}}
                        icon="calendar"
                        color= {theme.colors.primary}
                        size={45}
                        onPress={() => {showDatepicker()}}
                    />
                    <FontistoIcon
                        name="star" 
                        color={theme.colors.error}
                        size={8}
                        style = {{marginTop:10, marginBottom:-15,marginLeft : -10}}
                        
                    />
                    <Text style = {styles.subLabel} > Click Calendar</Text>

                </View>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()}
                    />
                )}
            </View>


      <View style={{flexDirection : 'row', alignSelf : 'flex-start'}}>
        <Text style = {styles.labelText}>Upload Bills : </Text>
        <Button icon="camera" mode="contained" onPress={(val) => uploadBills(val)} value={bills} style={{width : 120,margin : 10}}> Upload </Button>
      </View>

            {billsView && (
              <Image 
                source= {{uri : bills }}
                style = {styles.billPhoto}
                />
              )
            }

        <Text style = {styles.labelText}>Amount(Rs.) : </Text>
          <FontistoIcon
              name="star" 
              color={theme.colors.error}
              size={8}
              style = {{marginTop:10, marginBottom:-20,marginLeft : -10}}
              
          />
          <TextInput 
            style={styles.InputField} 
            placeholder="Enter amount"  
            onChangeText={(val) => setAmount(val)}
            value={amount}
            keyboardType = 'number-pad'
          /> 

      <Text style = {styles.labelText}>Description : </Text>
      <TextInput style={styles.comments} placeholder="Description"  onChangeText={(val) => setDescription(val)}
                    value={description}/>

      <View style = {styles.sameRow}>
        <Button icon="cancel" mode= 'contained' color = '#0A6466' style={{backgroundColor:'red'}} title = 'cancel' onPress={() => { navigation.goBack()}}>Cancel</Button>
        <Button icon="send" mode= 'contained' color = '#0A6466' title = 'submit' style={{marginLeft : 10}} onPress={() => {checkRequired()}}>submit</Button>
      </View>
    </View>
    </BackgroundLayout>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  header : {
    fontSize : 22,
    fontWeight : 'bold',
    alignSelf : 'center',
    marginBottom : 30,
    color : theme.colors.primary
    
  },
  expensesContainer : {
    flex : 1,
    width : '100%',
    padding: 15,
    backgroundColor : theme.colors.surface,
    borderRadius : 5,
    shadowColor : 'gray',
    elevation : 10,
  },
  InputField : {
    alignSelf : 'stretch',
    height : 35,
    marginBottom : 20,
    borderBottomColor : '#009387',
    borderBottomWidth : 1,
    fontSize : 16,  
    backgroundColor : theme.colors.surface  
  },
  comments : {
    height : 100,
    borderColor : '#0A6466',
    borderWidth : 1,
    marginBottom : 30,
    padding : 20,
    backgroundColor : theme.colors.surface  

  },
  sameRow : {
    flexDirection : 'row',
  },
  labelText : {
    fontSize : 18,
    fontWeight : 'bold',
    color : theme.colors.primary,
  },
  billPhoto: {
    height : 150 ,
    width : 150,
    borderRadius : 10 ,
    margin : 10,
  },
  subLabel : {
    color : 'red',
    fontWeight : 'bold',
    fontSize : 12
  },
  requiredText : {
    color : 'red',
    marginBottom : 20,
    marginTop : -2,
  },
})