import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, Button} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card} from 'react-native-paper';
import ExpensesGraph from '../components/ExpensesGraph'
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const optionsPerPage = [2, 3, 4];

export default function ManageExpenses({ navigation }) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => { setSearchQuery(query) }
  console.log(searchQuery);

// **  const [searchTerm,setSearchTerm]=useState("");


  const [page, setPage] = React.useState(3);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);


  const [productList,setProductList]=useState([]);

  useEffect(()=>{
    axios.get("http://10.0.2.2:3001/viewExpenses").then((response)=>{
      setProductList(response.data);
    })
  },[]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

      <View style = {styles.sameRow}>
      <Text></Text>
        <Button color = '#0A6466' title = 'claim'
          onPress={() => navigation.navigate('ClaimExpenses')}>Claim</Button>

      </View>
      
      <View>
      <ExpensesGraph />
      <Card style={ styles.card }>
        <Card.Title title="Expenses for the Day"/>
        <View style={{ marginBottom : 25 }}></View>
        <Card.Content >
          <View style = {styles.sameRow}>
          <View style = {styles.sameColumn}>
          <View style={{  marginBottom : 25, }}></View>
          <Text>Food and Drink :</Text>
          <Text>Accomodations :</Text>
          <Text>Travel Expenses :</Text>
          <View style={{  marginBottom : 10, }}></View>
          <Text>Total :</Text>
          </View>
          <View style = {styles.sameColumn}>
          <View style={{ marginBottom : 25 }}></View> 
          <Text>Rs.706</Text>
          <Text>Rs.5789</Text>
          <Text>Rs.824</Text>
          <View style={{ marginBottom : 10 }}></View> 
          <Text>Rs.7319</Text>
          </View>
        </View>
        </Card.Content>
      </Card>

       <DataTable>
            <DataTable.Header>
              <DataTable.Title>Type of Expense</DataTable.Title>
              <DataTable.Title >Location</DataTable.Title>
              <DataTable.Title>Amount</DataTable.Title>
              <DataTable.Title >Date</DataTable.Title>
              <DataTable.Title >Sales Manager Comments</DataTable.Title>
            </DataTable.Header>

            {productList.filter(val=>{if(searchQuery===""){
                            return val;
                            }else if(
                            val.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            {
                            return val;
                            }
                            }).map((record)=>{
                            return(
                    <DataTable.Row key={record.expense_id}>
                    <DataTable.Cell align="center"> {record.expense_Type}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.location}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.amount}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.Date}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.salesmanager_comment}</DataTable.Cell>
                    </DataTable.Row>
                    )})
                }

                  <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={(page) => setPage(page)}
                    label="1-2 of 6"
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
          </DataTable>

      </View>
      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create ({
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 5,
    marginTop : 5,
    width : '100%'
  },
  card: {
    backgroundColor :"#D2F7F7",
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  }
})
