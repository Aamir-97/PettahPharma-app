import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet,} from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'

import axios from 'axios';


export default function ViewLeave ({route, navigation}){

    const {leave_ID}= route.params;

    const [LeaveDetails, setLeaveDetails] = useState({
        leave_Type : '',
        no_of_days : '',
        description : '',
        salesmanager_comment : '',
        status : '',
        start_Date : '',
        end_Date : ''
    });

const dtt = new Date(LeaveDetails.start_Date);
const year = dtt.getFullYear() + '/';
const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
const day = ('0' + dtt.getDate()).slice(-2);

const dtt2 = new Date(LeaveDetails.end_Date);
const year2 = dtt2.getFullYear() + '/';
const month2 = ('0' + (dtt2.getMonth() + 1)).slice(-2) + '/';
const day2 = ('0' + dtt2.getDate()).slice(-2);

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/AnnualLeaves/ViewLeave",{
            leave_ID : leave_ID,  
        }).then((response)=>{
            console.log("/ViewLeave");
          setLeaveDetails({...LeaveDetails,
            leave_Type : response.data[0].leave_Type,
            start_Date : response.data[0].start_Date,
            end_Date : response.data[0].end_Date,
            no_of_days : response.data[0].no_of_days,
            status  : response.data[0].status,
            salesmanager_comment : response.data[0].salesmanager_comment,
            description : response.data[0].description,      
        });
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while getting leave details");  
        } 
      } fetchData();
  },[]);

  
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}>
                          <Text style={styles.header}>Leave</Text> 
                        </View>
                    </View>
                    <View style ={styles.approvedContainer}> 
                    <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Leave Type : </Text>
                            <Text style={styles.text}>{LeaveDetails.leave_Type}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Start Date : </Text>
                            <Text style={styles.text}>{year + month + day}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>End Date : </Text>
                            <Text style={styles.text}>{year2 + month2 + day2}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Duration : </Text>
                            <Text style={styles.text}>{LeaveDetails.no_of_days}day(s)</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Status : </Text>
                            <Text style={styles.text}>{LeaveDetails.status}</Text>
                        </View>
                            <Text style={styles.textLable}>Sales Manager Comment : </Text>
                            <Text style={styles.CommentField}>{LeaveDetails.salesmanager_comment}</Text>
                        
                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.CommentField}>{LeaveDetails.description}</Text>

                    </View>
                </BackgroundLayout>

            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create ({
    approvedContainer : {
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

    sameRow : {
      flexDirection : 'row',
      width : '100%'
    },
  })