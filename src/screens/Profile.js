import React, { useState, useEffect } from 'react';
import {Text, ScrollView, StyleSheet, View, TouchableOpacity, Image, SafeAreaView, AsyncStorage} from 'react-native';
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
        display_photo : 'https://i.pravatar.cc/300',
        email : '',
        phone_no : '',
        address : '',
        working_area : '',
        rating : '',
        manager_ID : '',
        joined : ''
    });

    const [mangerDetails, setManagerDetails] = React.useState({
        name : '',
        display_photo : 'https://i.pravatar.cc/300',
        email : '',
        phone_no : '',
        working_area : '',
        joined : ''
    });

// useEffect for get medical rep details
    useEffect(() => {
        async function fetchData(){        
            const userProfile = await AsyncStorage.getItem('user');
            const profile  = JSON.parse(userProfile);
            if ( profile !== null){
              setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID }); 
            
            // Beck-end function
            await axios.post("http://10.0.2.2:3001/profileDetails",{
                rep_ID : profile.rep_ID,
            }).then((response)=>{
                const profile = response.data[0];
                // console.log("/profileDetails");
                setProfileDetails({...profileDetails, 
                    name : profile.name,
                    display_photo : profile.display_photo,
                    email : profile.email,
                    phone_no : profile.phone_no,
                    address : profile.address,
                    working_area : profile.working_area,
                    rating : profile.rating,
                    manager_ID : profile.manager_ID,
                    joined : profile.created_at

                });
            });
            return;
            }
        }
        fetchData();       
      },[]);


    //   useEffect for get manager details
    useEffect(() => {
        async function fetchData(){
          try {    
            // Beck-end function
            await axios.post("http://10.0.2.2:3001/Profile/ManagerDetails",{
                manager_ID : user.manager_ID,
            }).then((response)=>{
                const profile = response.data[0];
                // console.log("/ManagerDetails");
                setManagerDetails({...mangerDetails, 
                    name : profile.name,
                    display_photo : profile.display_photo,
                    email : profile.email,
                    phone_no : profile.phone_no,
                    working_area : profile.area,
                    joined : profile.created_at,
                });
            });
          } catch (e){
            console.log(e);
          }
        }
        fetchData();       
      },[user]);


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
    }

    const dtt = new Date(profileDetails.joined);
    const year = dtt.getFullYear() + '/';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dtt.getDate()).slice(-2);

    return ( 
        <SafeAreaView>
            <ScrollView>
            <BackgroundLayout>
                <View style={styles.sameRow}>
                    <Button
                        labelStyle = {{fontWeight : 'bold'}}
                        mode='text'
                        icon={({color, size}) => (
                            <FontAwesome5Icon
                            name="angle-double-left" 
                            color={theme.colors.primary}
                            size={25}
                            />
                        )}
                        onPress={() => navigation.goBack()} 
                        // onPress={() => navigation.navigate('Home')} 
                        > Back
                    </Button>
                </View>



                <View>
                    <Image style={{padding:10, width:'100%',height:150, alignItems:'center'}} 
                        // source ={{ uri: 'https://source.unsplash.com/1600x900/?portrait'}}>
                        source ={require ('../assets/landscpeImage.jpg')}>
                    </Image>
                </View>

                    <View style={{alignItems:'center'}}>   

                            {profileDetails.display_photo && (
                                <Image 
                                    source= {{uri : profileDetails.display_photo }}
                                    style = {{width:150, height: 150, marginTop:-65, borderRadius: 100}}
                                    />
                                )
                            }                      

                        <Text style={{fontSize:25, fontWeight:'bold', color: theme.colors.primary,  }}>{ profileDetails.name }</Text>

                        <Text style={{fontSize:15, fontWeight:'bold', color:'grey'}}>25, Male (Rep id  : {user.rep_ID})</Text>
                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="briefcase" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={{fontSize:15, paddingLeft : 5}}>Medical representative</Text>
                        </View>
                    </View>

                    <View style={{flexDirection : 'row-reverse'}}>
                        <Button 
                            icon={({color, size}) => (
                                <FontAwesome5Icon
                                name="user-edit" 
                                color= "#0000FF"
                                size={20}
                                />
                            )} 
                            mode="text" 
                            color = "blue"
                            labelStyle ={ styles.editButtonLabel}
                            onPress={() => editProfile(user.rep_ID)}>
                            Edit
                        </Button>
                </View>

                    <View style = {styles.Container}>

                        <Text style={{fontSize:20, fontWeight:'bold', color: theme.colors.error, textAlign : 'center' }}> Your Profile </Text>

                        
                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="phone" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Mobile No. : { profileDetails.phone_no }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="map-marker-alt" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Address : { profileDetails.address }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="envelope" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Email : { profileDetails.email }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="network-wired" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Joined At : {year + month + day} </Text>
                        </View>

                    </View>


                    <View style = {styles.Container}>

                        <Text style={{fontSize:20, fontWeight:'bold', color: theme.colors.error, textAlign : 'center' }}> Your Manager Profile </Text>

                        <Image source ={require('../assets/thulasiDp.jpg')} style = {{width:80, height: 80, borderRadius: 100, alignSelf : 'center'}}></Image> 
                        
                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="user-tie" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Name. : { mangerDetails.name }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="envelope" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Email : { mangerDetails.email }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="phone" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Conatct No. : { mangerDetails.phone_no }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="map-marker-alt" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Working Area : { mangerDetails.area }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="network-wired" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Joined At : {year + month + day} </Text>
                        </View>

                    </View>


                    <View style = {styles.Container}>

                        <Text style={{fontSize:20, fontWeight:'bold', color: theme.colors.error, textAlign : 'center' }}> Performances </Text>

                        
                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="external-link-alt" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Mobile No. : { profileDetails.phone_no }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="crosshairs" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Address : { profileDetails.address }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="dice-d20" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Email : { profileDetails.email }</Text>
                        </View>

                        <View style = {styles.sameRow}>
                            <FontAwesome5Icon name="dollar-sign" color={theme.colors.primary} size={20}></FontAwesome5Icon>
                            <Text style={styles.detailText}>Joined At : {year + month + day} </Text>
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

    Container : {
        flex : 1,
        width : '100%',
        height : '100%',
        padding: 15,
        backgroundColor : theme.colors.surface,
        borderRadius : 5,
        shadowColor : 'gray',
        elevation : 10,
        marginBottom : 20
    
      },
    detailText : {
        fontSize : 16,
        color : theme.colors.primary,
        marginLeft : 8,
        fontWeight : 'bold',

    },

  })
