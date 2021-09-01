import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet,Image } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'

import axios from 'axios';


export default function ViewApprovedLeave ({route, navigation}){

    const {leave_ID}= route.params;

    const [approvedLeaveDetails, setApprovedLeaveDetails] = useState({
        leave_Type : '',
        no_of_days : '',
        description : '',
        salesmanager_comment : '',
        start_Date : '',
        end_Date : ''
    })

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/AnnualLeaves/ViewApprovedLeave",{
            leave_ID : leave_ID,  
        }).then((response)=>{
          setApprovedLeaveDetails({...approvedLeaveDetails,
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
          console.log("Error while getting Approved leave details");  
        } 
      } fetchData();
  },[]);

  
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}>
                          <Text style={styles.header}>Approved Leave</Text> 
                        </View>
                    </View>
                    <View style ={styles.approvedContainer}> 
                    <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Leave Type : </Text>
                            <Text style={styles.text}>{approvedLeaveDetails.leave_Type}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Start Date : </Text>
                            <Text style={styles.text}>{approvedLeaveDetails.start_Date}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>End Date : </Text>
                            <Text style={styles.text}>{approvedLeaveDetails.end_Date}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Duration : </Text>
                            <Text style={styles.text}>{approvedLeaveDetails.no_of_days}</Text>
                        </View>
                            <Text style={styles.textLable}>Sales Manager Comment : </Text>
                            <Text style={styles.CommentField}>{approvedLeaveDetails.salesmanager_comment}</Text>
                        
                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.CommentField}>{approvedLeaveDetails.description}</Text>

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