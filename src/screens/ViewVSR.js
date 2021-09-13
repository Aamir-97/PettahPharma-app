import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet,Image, Alert } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'
import { Button } from 'react-native-paper'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/MaterialIcons'




import axios from 'axios';


export default function ViewVSR ({route, navigation}){

    const {report_id}= route.params;

    const [reportDetails, setReportDetails] = React.useState({
        visit_type : '',
        location : '',
        date : '',
        avg_duration : '',
        no_of_sample : '',
        description : '',
        doctor_name : '',
        product_name : '',
        manager_comment : ''
    })

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/VisitSummaryReport/ViewVSR",{
            report_id : report_id,  
        }).then((response)=>{
            console.log("/VisitSummaryReport/ViewVSR");
            setReportDetails({...reportDetails,
            visit_type : response.data[0].visit_type,
            location : response.data[0].location,
            date : response.data[0].date,
            avg_duration : response.data[0].avg_duration,
            no_of_sample : response.data[0].no_of_sample,      
            description : response.data[0].description,      
            doctor_name : response.data[0].doctor_name,      
            product_name : response.data[0].product_name,      
            manager_comment : response.data[0].manager_comment,      
        });
          // console.log({...taskList});
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while get product details for View");  
        } 
      } fetchData();
  },[]);

  const deleteReport = () => {
    try{  
        axios.post("http://10.0.2.2:3001/VisitSummaryReport/DeleteReport",{
          report_id : report_id,  
      }).then((response)=>{
            //   console.log("Succesfully Updated:!");
            Alert.alert(
            "Database Visit Report Table",
            "Report Details successfully removed...!",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: () => {navigation.navigate('VisitSummaryReport')}}
            ]
            );     
   
        // console.log({...taskList});
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while get product details for View");  
      }

  }

  const deleteConfirmation = () => { 
    Alert.alert(
        "Here You....!",
        "Are you sure want to delete the report?",
        [
            {
            text: "NO",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
            },
            { text: "YES", onPress: () => deleteReport()}
        ]
        );

  }

        //   Date convertor
        const dtt = new Date(reportDetails.date);
        const year = dtt.getFullYear() + '/';
        const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
        const day = ('0' + dtt.getDate()).slice(-2);

  
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}>
                        <FontistoIcon name= "file-1" size= {30} color={theme.colors.primary}></FontistoIcon>
                        <Text style={styles.header}>Visit Summary Details</Text> 
                        </View>
                    </View>

                    <View style ={styles.productContainer}> 

                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Visit Type : </Text>
                            <Text style={styles.text}> {reportDetails.visit_type} </Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Visited Place : </Text>
                            <Text style={styles.text}> {reportDetails.location} </Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Date : </Text>
                            <Text style={styles.text}> {year+month+day}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Average Time Duration : </Text>
                            <Text style={styles.text}> {reportDetails.avg_duration}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Visited Doctor (if) : </Text>
                            <Text style={styles.text}> {reportDetails.doctor_name}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Product (if sample given) : </Text>
                            <Text style={styles.text}> {reportDetails.product_name}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Number Of Product : </Text>
                            <Text style={styles.text}> {reportDetails.no_of_sample}</Text>
                        </View>


                            <Text style={styles.textLable}>Salesmanager Comments (if given) : </Text>
                            <View style ={{height : 80, borderColor : 'red', borderWidth : 2, borderRadius : 5}}>
                            <Text style={styles.text}> {reportDetails.manager_comment}</Text>
                            </View>

                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.text}>{reportDetails.description}</Text>


                        <View style={{alignSelf : 'center', marginTop : 10}}>
                            <View style = {styles.sameRow}>
                            <Button
                                style= {styles.cancelButton}
                                mode='contained'
                                icon={({color, size}) => (
                                    <Icon
                                    name="delete-forever" 
                                    color={theme.colors.surface}
                                    size={25}
                                    />
                                )}
                                // goBack={navigation.goBack}
                                onPress={() => deleteConfirmation()} 
                                > Delete 
                            </Button>
                            <Button
                                disabled
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
    productContainer : {
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
    //   top : 5,
      textAlign : 'center'    
    },

    text : {
        fontSize : 18,
        marginBottom : 10


    },
    textLable : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.primary,
    },

    medicinePhoto: {
        width:150, 
        height: 150, 
        marginTop:10, 
        borderRadius: 100, 
        alignSelf : 'center',
        marginBottom : 20
    },
    cancelButton : {
        backgroundColor : 'red',
        marginRight : 5,
    },
    sameRow : {
      flexDirection : 'row',
      width : '100%'
    },
  })