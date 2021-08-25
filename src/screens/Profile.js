import { bold } from 'ansi-colors';
import React, { useState, useEffect } from 'react';
import {Text, ScrollView, StyleSheet, View, TouchableHighlight, TouchableOpacity, Image, SafeAreaView, AsyncStorage} from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import { Button } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../core/theme'

import axios from 'axios';


export default function Profile({navigation}){

    const [user, setUser] = React.useState({ 
        rep_ID: '', 
        manager_ID: '',
      });

    const [profileDetails, setProfileDetails] = React.useState({
        name : '',
        display_photo : '',
        email : '',
        phone_no : '',
        address : '',
        working_area : '',
        rating : '',
        manager_ID : '',
        joined : ''
    });


    useEffect(() => {
        async function fetchData(){
          try {
            const userProfile = await AsyncStorage.getItem('user');
            const profile  = JSON.parse(userProfile);
            if ( profile !== null){
              setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID }); 
            //   getProfileData(user.rep_ID);    
            
            // Beck-end function
            await axios.post("http://10.0.2.2:3001/profileDetails",{
                rep_ID : profile.rep_ID,
            }).then((response)=>{
                // const profile = response.data[0];
                // console.log(response.data[0].name);
                setProfileDetails({...profileDetails, 
                    name : response.data[0].name,
                    display_photo : response.data[0].display_photo,
                    email : response.data[0].email,
                    phone_no : response.data[0].phone_no,
                    address : response.data[0].address,
                    working_area : response.data[0].working_area,
                    rating : response.data[0].rating,
                    manager_ID : response.data[0].manager_ID,
                    joined : response.data[0].joined

                });
            });
            }
          } catch (e){
            console.log(e);
          }
        }
        fetchData();     
      },[]);


    // const getProfileData = (rep_ID) => {
    //     try {
    //         axios.post("http://10.0.2.2:3001/profileDetails",{
    //             rep_ID : rep_ID,
    //         }).then((response)=>{
    //             // const profile = response.data[0];
    //             // console.log(response.data[0].name);
    //             setProfileDetails({...profileDetails, 
    //                 name : response.data[0].name,
    //                 display_photo : response.data[0].display_photo,
    //                 email : response.data[0].email,
    //                 phone_no : response.data[0].phone_no,
    //                 address : response.data[0].address,
    //                 working_area : response.data[0].working_area,
    //                 rating : response.data[0].rating,
    //                 manager_ID : response.data[0].manager_ID,
    //                 joined : response.data[0].joined

    //             });
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         console.log("Error While get the Profile Details");
    //     }
    // }

    const editProfile = (rep_ID) => {
        navigation.navigate('EditProfile', {rep_ID});
        // console.log(rep_ID);
    }

    return ( 
        <SafeAreaView>
            <ScrollView>
            <BackgroundLayout>

                <Button 
                    style = {{ alignSelf : 'flex-end'}}                     
                    icon={({color, size}) => (
                        <FontAwesome5Icon
                        name="user-edit" 
                        color= {theme.colors.error}
                        size={20}
                        />
                    )} 
                    mode="text" 
                    color = "blue"
                    labelStyle ={ styles.editButtonLabel}
                    onPress={() => editProfile(user.rep_ID)}>
                    Edit
                </Button>

                <View>
                    <Image style={{padding:10, width:'100%',height:150, alignItems:'center'}} 
                        source ={{ uri: 'https://source.unsplash.com/1600x900/?portrait'}}>
                    </Image>
                    {/* <TouchableOpacity>
                        <Image source ={{ uri: 'https://source.unsplash.com/1600x900/?portrait'}} style = {{width:160, height: 160, marginTop:70, borderRadius: 100}}></Image>
                    </TouchableOpacity> */}
                </View>

                    <View style={{alignItems:'center'}}>                          

                        <Image source ={require('../assets/aamirDp.jpeg')} style = {{width:150, height: 150, marginTop:-65, borderRadius: 100}}></Image> 

                        <Text style={{fontSize:25, fontWeight:'bold', color: theme.colors.primary,  }}>{ profileDetails.name }</Text>

                        <Text style={{fontSize:15, fontWeight:'bold', color:'grey'}}>25, Male (Rep id  : {user.rep_ID})</Text>
                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="briefcase" color={theme.colors.primary} size={25}></FontAwesome5Icon>
                            <Text style={{fontSize:15, paddingLeft : 5}}>Medical representative</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="phone" color={theme.colors.primary} size={25}></FontAwesome5Icon>
                            <Text style={{fontSize:15, paddingLeft : 5}}>{ profileDetails.phone_no }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="map-marker-alt" color={theme.colors.primary} size={25}></FontAwesome5Icon>
                            <Text style={{fontSize:15, paddingLeft : 5}}>{ profileDetails.address }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="envelope" color={theme.colors.primary} size={25}></FontAwesome5Icon>
                            <Text style={{fontSize:15, paddingLeft : 5}}>{ profileDetails.email }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="network-wired" color={theme.colors.primary} size={25}></FontAwesome5Icon>
                            <Text style={{fontSize:15, paddingLeft : 5}}>Joined At : { profileDetails.phone_no } </Text>
                        </View>


                    </View>



            
            </BackgroundLayout>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create ({
    sameRow : {
      flexDirection : 'row',
      margin : 5,
    },
    editButtonLabel :{
        fontSize : 16,
        fontWeight : 'bold',
    },
    editButton : {
        alignSelf : 'flex-end'

    },
    sameColumn : {
      flexDirection : 'column',
      height : '9%',
      marginTop : 5,
      marginBottom : 5,
    },

  })
