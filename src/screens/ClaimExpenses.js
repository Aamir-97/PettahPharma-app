import React, {useState,useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView, StyleSheet,AsyncStorage, Alert, PermissionsAndroid, Image} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign'
import BackgroundLayout from '../components/BackgroundLayout'
import { Button, IconButton,TextInput } from 'react-native-paper'
import DocumentPicker from 'react-native-document-picker'
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
  
export default function ClaimExpenses({ navigation }) {

  const [expense_Type , setExpenseType] = React.useState('');
  const [location , setLocation] = React.useState('');
  // const [location , setLocation] = useState({log : 0.0000 , lat : 0.0000});
  // const [location , setLocation] = useState({
  //   latitude : 0,
  //   longitude : 0
  // });
  const [exp_date , setExpDate] = React.useState('');
  const [amount , setAmount] = React.useState('');
  const [bills , setBills] = React.useState('');
  const [description , setDescription] = React.useState('');

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
  },[user]);
  
  const saveDetails = () => { 
    // console.log(expense_Type,location,amount,bills,description);
    axios.post("http://10.0.2.2:3001/ClaimExpenses", {
      rep_ID: user.rep_ID, 
      expense_Type: expense_Type,
      date : exp_date, 
      location : location, 
      // location : location.latitude+location.longitude, 
      amount: amount, 
      bills: bills, 
      description: description, 
    }).then(()=>{
        // console.log(expense_ID);
        // console.log("Succesfully Inserted:!");
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
      // setShow(false);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      // setShow(true);
      // setMode('date');
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
      },[date]);


      const componentDidMount= () => {
        // if (hasLocationPermission) {
          Geolocation.getCurrentPosition(
              (position) => {
                // console.log(position);
                // console.log(position.coords.latitude);
                setLocation ({...location, latitude : position.coords.latitude,longitude : position.coords.longitude})
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
      <View style={styles.sameRow}>
        <Icon name="form" size={35} color={theme.colors.primary} />
        <Text style={styles.header}>Expense Claiming Form</Text>
      </View>

      
        <Picker expense_Type={expense_Type}selectedValue = {expense_Type} style={styles.InputField} onValueChange={(itemValue,itemIndex) => setExpenseType(itemValue)} >
            <Picker.Item label="Expense Type" value="" />
            <Picker.Item label="Accomodation" value="Accomodation" />
            <Picker.Item label="Fuel" value="Fuel" />
            <Picker.Item label="Daily Batta" value="Daily batta" />
            <Picker.Item label="Other" value="Other" />
        </Picker>
      <View style={{borderWidth : 0.5, borderTopColor: theme.colors.primary, marginTop : -22, marginBottom : 22}}></View>

      {/* <Text style = {styles.labelText}> </Text>
      <TextInput style={styles.InputField} placeholder="Select the Location"  onChangeText={(val) => setLocation(val)}
                    value={location}/> */}

      <Text style = {styles.labelText}>Location : </Text>
      <Text style={styles.subLabel}>(Set Current Location By click the button)</Text>
      <View style={{flexDirection: 'row', alignSelf: 'flex-start',margin:12}}>
            <Button icon="location-enter" mode="contained" onPress={componentDidMount} value={location}> SET </Button>
            <Text>
            {location && (
                <Text style = {{fontSize : 16, color: theme.colors.primary, fontWeight : 'bold'}}> Location is uploaded.. </Text>
            
              )}
            </Text>
            {/* <Button icon="camera" mode="contained" onPress={(val) => uploadBills(val)} value={bills}> Add Location </Button> */}
      </View>

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
                    // onChange={(event, selectedDate) => {
                    //   setDate(selectedDate);
                    // }}
                    />
                )}
            </View>


      <View style={{flexDirection : 'row', alignSelf : 'flex-start'}}>
        <Text style = {styles.labelText}>Upload Bills : </Text>
        <Button icon="camera" mode="contained" onPress={(val) => uploadBills(val)} value={bills} style={{width : 120,margin : 10}}> Upload </Button>
      </View>

        {/* <Text> */}
            {bills && (
              <Image 
                source= {{uri : bills }}
                style = {styles.billPhoto}
                />
              )
            }
        {/* </Text> */}

      <Text style = {styles.labelText}>Amount(Rs.) : </Text>
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
        <Button icon="cancel" mode= 'contained' color = '#0A6466' style={{backgroundColor:'red'}} title = 'cancel' onPress={() => { alert('Cancelled') }}>Cancel</Button>
        <Button icon="send" mode= 'contained' color = '#0A6466' title = 'submit' style={{marginLeft : 10}} onPress={() => {saveDetails()}}>submit</Button>
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
    alignSelf : 'center'
    // justifyContent: 'space-between',
    // marginBottom : 20,
    // width : '100%'
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
})