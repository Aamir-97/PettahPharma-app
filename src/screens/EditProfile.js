import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import { Text, View, Picker, SafeAreaView, ScrollView, StyleSheet, Image, Alert} from 'react-native'
import { Button, Avatar, TextInput } from 'react-native-paper'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'

import axios from 'axios'


export default function Profile({ route , navigation}) {
  // const [selectedValue, setSelectedValue] = useState("Sick Leave");
  const {rep_ID} = route.params;
  // const ref = useRef();

const [profileDetails , setProfileDetails] = React.useState({
  name : '',
  display_Photo : '',
  email : '',
  phone_no : '',
  address : '',
  password : '',
})

  useEffect(() => {
    async function fetchData(){
    try { 
      await axios.post("http://10.0.2.2:3001/profileDetails", {
          rep_ID : rep_ID,
      }).then((response)=>{
        const profile = response.data[0];
        console.log("Hello......");
        setProfileDetails({...profileDetails, 
          name : profile.name, 
          display_Photo : profile.displayPhoto,
          email: profile.email, 
          phone_no : profile.phone_no, 
          address: profile.address, 
          password: profile.password
          // name : response.data[0].name, 
          // display_Photo : response.data[0].displayPhoto,
          // email: response.data[0].email, 
          // phone_no : response.data[0].phone_no, 
          // address: response.data[0].address, 
          // password: response.data[0].password
        })
      })

    } catch (err) {
      console.log(err , "Error While get profile details....")
    } 
    }
    fetchData();                          
  },[]);


  const submitForm = () => {
    try{
      axios.put("http://10.0.2.2:3001/updateProfile", {
          rep_ID : rep_ID,
          name : profileDetails.name,
          display_Photo : profileDetails.display_Photo,
          email : profileDetails.email,
          phone_no : profileDetails.phone_no,
          address : profileDetails.address,
          password : profileDetails.password,
      }).then((response) => {
          console.log("Succesfully Updated:!");
          Alert.alert(
            "Database",
            "Profile is Updated...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.navigate('Profile')}}
            ]
          );

      })

    } catch (err) {
      console.log(err, "Error while update the form..")
    }
  }


  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>



      <View style ={styles.profileContainer}> 

        <View style={{alignSelf : 'center'}}>
            <View style={styles.sameRow}>
              <Avatar.Image style={{backgroundColor : 'transparent'}} size={80} source={require('../assets/avatarIcon.png')} />
              <View>
              <Text style={styles.header}>Edit Profile </Text> 
              <Text style={styles.subHeader}>Rep Id :  {rep_ID}</Text> 
              </View>
            </View>
        </View>

        <View style ={styles.sameRow}>
          <Image source={require ('../assets/aamirDp.jpeg')} style ={styles.displayPhoto} /> 
          <View style={{alignSelf: 'center',marginLeft:20}}>
            <Button  style={{color:'blue',fontSize:16,fontWeight : 'bold'}} icon="camera" mode="contained" onPress={() => console.log('Change Pressed')}>
                Change 
            </Button>
          </View>
        </View>


        <TextInput
          mode= 'outlined'
          outlineColor =  {theme.colors.primary}
          // style = {styles.InputField}
          label="Your Name"
          // placeholder = "Name with intial"
          value={profileDetails.name}
          onChangeText={(text) => setProfileDetails({...profileDetails, name:text})}
        />
          <View style={styles.InputField}>
            <Picker>
                {/* selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} */}

                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="1" />
                <Picker.Item label="Female" value="2" />
                <Picker.Item label="Other" value="3" />
            </Picker>

          </View>


          <TextInput
            mode= 'outlined'
            outlineColor =  {theme.colors.primary}
            // style = {styles.InputField}
            label="Email"
            // placeholder = "Enter your mail id"
            value={profileDetails.email}
            onChangeText={(text) => setProfileDetails({...profileDetails,email:text})}
          />
          <TextInput
            mode= 'outlined'
            outlineColor =  {theme.colors.primary}
            // style = {styles.InputField}
            label="Contact Number"
            // placeholder = "Your phone number(Ex:011..)"
            value={profileDetails.phone_no}
            onChangeText={(text) => setProfileDetails({...profileDetails, phone_no:text})}
          />
          <TextInput
            mode= 'outlined'
            outlineColor =  {theme.colors.primary}
            // style = {styles.InputField}
            label="Address"
            // placeholder = "Ex: No, Lane, Hometown."
            value={profileDetails.address}
            onChangeText={(text) => setProfileDetails({...profileDetails, address:text})}
          />
          <TextInput
            mode= 'outlined'
            // style = {styles.InputField}
            label="Password"
            // placeholder = "Use different charactors(Ex:A@aa!/#)"
            value={profileDetails.password}
            onChangeText={(text) => setProfileDetails({...profileDetails, password:text})}
          />

          <View style={{alignSelf : 'center', marginTop : 10}}>
            <View style = {styles.sameRow}>
              <Button
                  style= {styles.cancelButton}
                  mode='contained'
                  icon={({color, size}) => (
                      <Icon
                      name="cancel" 
                      color={theme.colors.surface}
                      size={25}
                      />
                  )}
                  // goBack={navigation.goBack}
                  onPress={() => navigation.goBack()} 
                  > Cancel 
              </Button>
              <Button
                  style= {styles.submitButton}
                  mode='contained'
                  icon={({color, size}) => (
                      <Icon
                      name="rotate-right" 
                      color={theme.colors.surface}
                      size={25}
                      />
                  )}
                  onPress={() => submitForm()} 
                  > Submit 
              </Button>

            </View>
          </View>

      </View>
      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  header : {
    top : 5,
    fontSize : 25,
    fontWeight : 'bold',
    // alignSelf : 'center',
    // marginBottom : 30,
    color : theme.colors.primary
    
},
  subHeader:{
    fontSize : 15,
    color : 'gray',
    fontWeight  : 'bold'

  },
  profileContainer : {
    flex : 1,
    width : '100%',
    height : '100%',
    padding: 15,
    backgroundColor : theme.colors.surface,
    borderRadius : 5,
    shadowColor : 'gray',
    elevation : 10

  },
  InputField : {
    // alignSelf : 'stretch',
    height : 50,
    marginBottom : 15,
    borderBottomColor : '#009387',
    borderBottomWidth : 1,
    fontSize : 16,
    
},
  sameRow : {
    flexDirection : 'row',
    // justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%',
    // alignSelf : 'center'
  },
  editProfileButton :{

  },
  cancelButton : {
    backgroundColor : 'red',
    marginRight : 5,
  },
  displayPhoto: {
    height : 80 ,
    width : 80,
    borderRadius : 50 ,
  },

})
