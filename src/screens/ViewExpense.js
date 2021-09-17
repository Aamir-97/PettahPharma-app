import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Alert, Image } from 'react-native'
import { Button } from 'react-native-paper';
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


export default function ViewExpenses ({route, navigation}){

    const {expense_ID}= route.params;

    const [expenseDetails, setExpenseDetails] = useState({
        expense_Type : '',
        amount : '',
        date : '',
        location : '',
        bills : [],
        description : '',
        bill_uri : 'expenseDetails.bill_uri',
        salesmanager_comment : '',
        status : ''
    })

    const [showButton, setShowButton] = useState(false); 
    const [salesManComment, setSalesManComment] = useState(true); 

    useEffect(()=> {
        async function fetchData(){
            try{  
                if (expenseDetails.status === 'Pending'){
                    setShowButton(true);
                    setSalesManComment(false);
                    console.log("DeleteButton");
                }   
            } catch (err) {    
                console.log(err);
            } 
          } fetchData();
    },[expenseDetails])

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/ManageExpenses/ViewExpenses",{
            expense_ID : expense_ID,  
        }).then((response)=>{
            console.log("/ManageExpenses/ViewExpenses");
          setExpenseDetails({...expenseDetails,
            expense_Type : response.data[0].expense_Type,
            amount : response.data[0].amount,
            date : response.data[0].date,
            location : response.data[0].location,
            // bills : response.data[0].bills,
            description : response.data[0].description,   
            bill_uri : response.data[0].bill_uri,   
            salesmanager_comment : response.data[0].salesmanager_comment,
            status : response.data[0].status,   
        });
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while get expense details for View");  
        } 
      } fetchData();
  },[]);

  const deleteConfirmation = () => { 
    Alert.alert(
        "Here You....!",
        "Are you sure want to delete?",
        [
            {
            text: "NO",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
            },
            { text: "YES", onPress: () => deleteExpense()}
        ]
        );

  }

  const deleteExpense = () => {
    try{  
          axios.post("http://10.0.2.2:3001/Expense/DeleteExpense",{
            expense_ID : expense_ID,
          // rep_note : taskDetails.rep_note        
      }).then((response)=>{
        // console.log("Task rejected Successfully");
        Alert.alert(
            "Expense Deleted",
            "Your Claimed Expense is deleted...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {navigation.goBack()}}
            ]
          ); 
      });
      } catch (err) {    
        console.log(err);
        console.log("Error while complete the task");  
      }

  }

    const dtt = new Date(expenseDetails.date);
    const year = dtt.getFullYear() + '/';
    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
    const day = ('0' + dtt.getDate()).slice(-2);

  
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}>
                        <FontAwesome5Icon name="money-check-alt" size={25} color={theme.colors.primary} />
                        <Text style={styles.header}>Expense Details</Text> 
                        </View>
                    </View>
                    <View style ={styles.expenseContainer}> 
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Expense Type : </Text>
                            <Text style={styles.text}>{expenseDetails.expense_Type}</Text>
                        </View>

                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Amount : </Text>
                            <Text style={styles.text}>Rs. {expenseDetails.amount}.00</Text>
                        </View>

                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Date : </Text>
                            <Text style={styles.text}>{year+month+day}</Text>
                        </View>

                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Location : </Text>
                            <Text style={styles.text}>{expenseDetails.location}</Text>
                        </View>

                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Bills : {expenseDetails.bills_uri} </Text>
                                {expenseDetails.bill_uri && (
                                    <Image 
                                        source= {{uri : expenseDetails.bill_uri }}
                                        style = {styles.billPhoto}
                                        />
                                    )
                                }
                        </View>

                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.CommentField}>{expenseDetails.description}</Text>

                            {salesManComment && (
                                <Text style={styles.textLable}>Sales Manager Comment : </Text>  
                            )}

                            {salesManComment && (
                                <Text style={styles.CommentField}>{expenseDetails.salesmanager_comment}</Text>
                            )}

                            <View style= {styles.sameRow}>
                                <Text style={styles.textLable}>Status : </Text>
                                <Text style={styles.status}>{expenseDetails.status}</Text>

                                {showButton && (
                                        <Button
                                            style= {styles.cancelButton}
                                            labelStyle = {{fontSize : 16, fontWeight : 'bold'}}
                                            mode='contained'
                                            icon={({color, size}) => (
                                                <Icon
                                                name="delete" 
                                                color={theme.colors.surface}
                                                size={20}
                                                />
                                            )}
                                            onPress={() => deleteConfirmation()} 
                                            > Delete 
                                        </Button>

                                )}
                            </View>


                    </View>
                </BackgroundLayout>

            </ScrollView>
        </SafeAreaView>  
    )

}

const styles = StyleSheet.create ({
    expenseContainer : {
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
    status : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.error
    },
    textLable : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.primary,
    },CommentField : {
        flex : 1,
        height : 100,
        color : 'blue',
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5,
        width : '100%',
        marginBottom : 20,
        marginTop : 20,
        padding : 20,
        fontSize : 17,

    },
    
    sameRow : {
      flexDirection : 'row',
      width : '100%'
    },
    cancelButton : {
        backgroundColor : 'red',
        marginLeft : 50,
    },
    billPhoto: {
        height : 150 ,
        width : 150,
        borderRadius : 10 ,
        margin : 10,
      },
  })