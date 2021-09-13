import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'
import axios from 'axios';


export default function ViewExpenses ({route, navigation}){

    const {expense_ID}= route.params;

    const [expenseDetails, setExpenseDetails] = useState({
        expense_Type : '',
        amount : '',
        date : '',
        location : '',
        description : '',
        salesmanager_comment : '',
        status : ''
    })

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/ManageExpenses/ViewExpenses",{
            expense_ID : expense_ID,  
        }).then((response)=>{
            // console.log("/ViewExpenses");
          setExpenseDetails({...expenseDetails,
            expense_Type : response.data[0].expense_Type,
            amount : response.data[0].amount,
            date : response.data[0].date,
            location : response.data[0].location,
            description : response.data[0].description,   
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
                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.CommentField}>{expenseDetails.description}</Text>
                        </View>
                            <Text style={styles.textLable}>Sales Manager Comment : </Text>
                            <Text style={styles.CommentField}>{expenseDetails.salesmanager_comment}</Text>
                        
                            <Text style={styles.textLable}>Status : </Text>
                            <Text style={styles.text}>{expenseDetails.status}</Text>


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
    textLable : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.primary,
    },CommentField : {
        flex : 1,
        height : 100,
        borderColor : theme.colors.primary,
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