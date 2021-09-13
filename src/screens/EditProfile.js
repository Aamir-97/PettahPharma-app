import React, {useState, useEffect} from 'react'
import { Text, View, Picker, SafeAreaView, ScrollView, StyleSheet, Image, Alert} from 'react-native'
import { Button, Avatar, TextInput } from 'react-native-paper'
import { theme } from '../core/theme'
import BackgroundLayout from '../components/BackgroundLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { emailValidator } from '../helpers/emailValidator'
import DocumentPicker from 'react-native-document-picker'


import axios from 'axios'


export default function Profile({ route , navigation}) {
  const {rep_ID} = route.params;

const [profileDetails , setProfileDetails] = React.useState({
  name : '',
  display_photo : 'https://i.pravatar.cc/300',
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
        console.log("/profileDetails");
        setProfileDetails({...profileDetails, 
          name : profile.name, 
          display_photo : profile.display_photo,
          email: profile.email, 
          phone_no : profile.phone_no, 
          address: profile.address, 
          password: profile.password
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
          display_photo : profileDetails.display_photo,
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

      // Check for valid email

    const checkEmail = () => {
          const email = emailValidator(profileDetails.email)
          if ( email ) {
              Alert.alert(
                  "Invalid email.....!",
                  "Please enter the valid email ...!",
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
            submitForm();
          }
    
    }



        // Pick a single file
      const profileImage = async () => {
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
              setProfileDetails({...profileDetails, display_photo: res.uri});
              // console.log("image uploaded");
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

      <View style ={styles.profileContainer}> 

        <View style={{alignSelf : 'center'}}>
            <View style={styles.sameRow}>
              <Avatar.Image style={{backgroundColor : 'transparent'}} size={60} source={require('../assets/avatarIcon.png')} />
              <View>
                <Text style={styles.header}>Edit Profile </Text> 
                <Text style={styles.subHeader}>Rep Id :  {rep_ID}</Text> 
              </View>
            </View>
        </View>

        <View style ={styles.sameRow}>
            {profileDetails.display_photo && (
              <Image 
                source= {{uri : profileDetails.display_photo }}
                style = {styles.displayPhoto}
                />
              )
            }

          
          <View style={{alignSelf: 'center',marginLeft:20}}>
            <Button icon="camera" mode="contained" onPress={() => profileImage()}>
                Change 
            </Button>

          </View>
        </View>


        <TextInput
          mode= 'outlined'
          outlineColor =  {theme.colors.primary}
          label="Your Name"
          value={profileDetails.name}
          onChangeText={(text) => setProfileDetails({...profileDetails, name:text})}
        />
          <View style={styles.InputField}>
            <Picker>
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="1" />
                <Picker.Item label="Female" value="2" />
                <Picker.Item label="Other" value="3" />
            </Picker>

          </View>


          <TextInput
            mode= 'outlined'
            outlineColor =  {theme.colors.primary}
            label="Email"
            keyboardType = 'email-address'
            value={profileDetails.email}
            onChangeText={(text) => setProfileDetails({...profileDetails,email:text})}
          />
          <TextInput
            mode= 'outlined'
            outlineColor =  {theme.colors.primary}
            label="Contact Number"
            keyboardType = 'number-pad'
            value={profileDetails.phone_no}
            onChangeText={(text) => setProfileDetails({...profileDetails, phone_no:text})}
          />
          <TextInput
            mode= 'outlined'
            outlineColor =  {theme.colors.primary}
            label="Address"
            value={profileDetails.address}
            onChangeText={(text) => setProfileDetails({...profileDetails, address:text})}
          />
          <TextInput
            mode= 'outlined'
            label="Password"
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
                  onPress={() => checkEmail()} 
                  > Update 
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
    color : theme.colors.primary,    
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
    height : 50,
    marginBottom : 15,
    borderBottomColor : '#009387',
    borderBottomWidth : 1,
    fontSize : 16,
    
},
  sameRow : {
    flexDirection : 'row',
    marginBottom : 20,
    width : '100%',
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
