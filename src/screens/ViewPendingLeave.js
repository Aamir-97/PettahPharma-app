import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'

import axios from 'axios';


export default function ViewPendingLeave ({route, navigation}){

    const {leave_ID}= route.params;

    const [pendingLeaveDetails, setPendingLeaveDetails] = useState({
        leave_Type : '',
        no_of_days : '',
        description : '',
        salesmanager_comment : '',
        start_Date : '',
        end_Date : ''
    })

const dtt = new Date(pendingLeaveDetails.start_Date);
const year = dtt.getFullYear() + '/';
const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
const day = ('0' + dtt.getDate()).slice(-2);

const dtt2 = new Date(pendingLeaveDetails.end_Date);
const year2 = dtt2.getFullYear() + '/';
const month2 = ('0' + (dtt2.getMonth() + 1)).slice(-2) + '/';
const day2 = ('0' + dtt2.getDate()).slice(-2);

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/ManageLeaves/ViewPendingLeave",{
            leave_ID : leave_ID,  
        }).then((response)=>{
          setPendingLeaveDetails({...pendingLeaveDetails,
            leave_Type : response.data[0].leave_Type,
            start_Date : response.data[0].start_Date,
            end_Date : response.data[0].end_Date,
            no_of_days : response.data[0].no_of_days,
            salesmanager_comment : response.data[0].salesmanager_comment,
            description : response.data[0].description,  
        });
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while get Pending Leave details for View");  
        } 
      } fetchData();
  },[]);

  
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}><Text style={styles.header}>Pending Leave</Text> 
                        </View>
                    </View>
                    <View style ={styles.pendingContainer}> 
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Leave Type : </Text>
                            <Text style={styles.text}>{pendingLeaveDetails.leave_Type}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Start Dtae : </Text>
                            <Text style={styles.text}>{year + month + day}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>End Date : </Text>
                            <Text style={styles.text}>{year2 + month2 + day2}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Duration : </Text>
                            <Text style={styles.text}>{pendingLeaveDetails.no_of_days}</Text>
                        </View>
                    
                            <Text style={styles.textLable}>Sales Manager Comment : </Text>
                            <Text style={styles.CommentField}>{pendingLeaveDetails.salesmanager_comment}</Text>
                        
                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.CommentField}>{pendingLeaveDetails.description}</Text>

                    </View>
                </BackgroundLayout>

            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create ({
    pendingContainer : {
        flex : 1,
        width : '100%',
        height : '100%',
        padding: 20,
        backgroundColor : theme.colors.surface,
        borderRadius : 5,
        shadowColor : 'gray',
        elevation : 10,
        marginTop : 20,
    },
  
    header : {
      color : theme.colors.primary,
      fontWeight : 'bold',
      fontSize : 22,
      marginLeft : 5,
      textAlign : 'center'    
    },

    text : {
        fontSize : 16,
        marginBottom : 10

    },
    textLable : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.primary,

    },sameRow : {
      flexDirection : 'row',
      width : '100%'
    },
    CommentField : {
        flex : 1,
        height : 100,
        borderWidth : 2,
        borderRadius : 5,
        width : '100%',
        marginBottom : 30,
        marginTop : 30,
        padding : 20,
        fontSize : 17,

    },
  })