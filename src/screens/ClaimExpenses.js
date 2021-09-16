import React, {useState,useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView, StyleSheet,AsyncStorage, Alert, PermissionsAndroid, Image} from 'react-native'
import { theme } from '../core/theme'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign'
import BackgroundLayout from '../components/BackgroundLayout'
import { Button, IconButton,TextInput } from 'react-native-paper'
import DocumentPicker from 'react-native-document-picker'
import Geolocation from 'react-native-geolocation-service';
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

  // const [user, setUser] = useState({ rep_ID: '',  manager_ID: '',});
  const [rep_ID, setRepID] = React.useState('');


  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          // setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });
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
      // rep_ID: user.rep_ID, 
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


      const componentDidMount= () => {
        // if (hasLocationPermission) {
          Geolocation.getCurrentPosition(
              (position) => {
                // console.log(position);
                // console.log(position.coords.latitude);
                // setLocation ({...location, latitude : position.coords.latitude,longitude : position.coords.longitude})
                setLocation (position);
                setLocationView(true);
              },
              (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        // }
      }


      // const requestLocationPermission = async () => {
      //   try {
      //     const granted = await PermissionsAndroid.request(
      //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //       {
      //         title: "Pettah Pharma location Permission",
      //         message:
      //           "Pettah Pharma needs access to your location " +
      //           "so you can set the expense's location.",
      //         buttonNeutral: "Ask Me Later",
      //         buttonNegative: "Cancel",
      //         buttonPositive: "OK"
      //       }
      //     );
      //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //       console.log("You can use the location");
      //       componentDidMount();
      //     } else {
      //       console.log("Camera permission denied");
      //     }
      //   } catch (err) {
      //     console.warn(err);
      //   }
      // };
      


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
          <Picker expense_Type={expense_Type}selectedValue = {expense_Type} style={styles.InputField} onValueChange={(itemValue,itemIndex) => setExpenseType(itemValue)} >
              <Picker.Item label="Expense Type" value="" />
              <Picker.Item label="Accomodation" value="Accomodation" />
              <Picker.Item label="Fuel" value="Fuel" />
              <Picker.Item label="Daily Batta" value="Daily batta" />
              <Picker.Item label="Other" value="Other" />
          </Picker>

      <View style={{borderWidth : 0.5, borderTopColor: theme.colors.primary, marginTop : -22, marginBottom : 22}}></View>

      
      {/* <Text style = {styles.labelText}>Location : </Text>
      <Text style={styles.subLabel}>(Set Current Location By click the button)</Text>
      <View style={{flexDirection: 'row', alignSelf: 'flex-start',margin:12}}>
            <Button icon="location-enter" mode="contained" onPress={componentDidMount} value={location}> SET </Button>

            {locationView && (
                <Text style = {{fontSize : 16, color: theme.colors.primary, fontWeight : 'bold'}}> Location is uploaded.. </Text>
            
              )}

      </View> */}

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