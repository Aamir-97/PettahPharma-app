import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, AsyncStorage, Button} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card} from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const optionsPerPage = [2, 3, 4];

export default function ManageExpenses({ navigation }) {

  const[dailybatta, setDailybatta] = useState('');
  const[accomodations, setAccomodations] = useState('');
  const[fuel,setFuel] = useState('');
  const[other,setOther] = useState('');

  // useEffect(()=>{
  //   axios.get("http://10.0.2.2:3001/viewExpenses").then((response)=>{
  //     set(response.data);
  //   })
  // },[]);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => { setSearchQuery(query) }
  console.log(searchQuery);

  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  const [expensesList,setExpensesList]=useState([]);

  useEffect(()=>{
    axios.get("http://10.0.2.2:3001/viewClaims").then((response)=>{
      setExpensesList(response.data);
    })
  },[]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [user, setUser] = useState({ rep_ID: '',  manager_ID: '',});
  
  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });            
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[user]);

  useEffect(() => {
    async function fetchData(){
      try {
        axios.post("")        
        
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[expensesList]);

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

      <View style = {styles.sameRow}>
      <Text></Text>
        <Button color = '#0A6466' title = 'claim for expenses' onPress={() => navigation.navigate('ClaimExpenses')}>Claim</Button>

      </View>
      
      <View>
      
      <Card style={ styles.card }>
        <Card.Title title="Total Expenses by Category"/>
        <View style={{ marginBottom : 25 }}></View>
        <Card.Content >
          <View style = {styles.sameColumn}>
          <View style={{  marginBottom : 25, }}></View>
          <Text>Daily Batta : {dailybatta}</Text>
          <Text>Accomodations :  {accomodations}</Text>
          <Text>Fuel :  {fuel}</Text>
          <Text>Other :  {other}</Text>
          </View>
        </Card.Content>
      </Card>

       <DataTable>
            <DataTable.Header>
              <DataTable.Title >Type of Expenses</DataTable.Title>
              {/* <DataTable.Title >Location</DataTable.Title> */}
              <DataTable.Title >Amount</DataTable.Title>
              <DataTable.Title >Date</DataTable.Title>
              {/* <DataTable.Title >Sales Manager Comments</DataTable.Title> */}
              {/* <DataTable.Title>Expense Status</DataTable.Title> */}
            </DataTable.Header>

            {expensesList.filter(val=>{if(searchQuery===""){
                            return val;
                            }else if(
                            val.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            {
                            return val;
                            }
                            }).map((record)=>{
                              const dtt = new Date(record.date);
                              const year = dtt.getFullYear() + '/';
                              const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
                              const day = ('0' + dtt.getDate()).slice(-2);
                            return(
                    <DataTable.Row key={record.expense_ID}>
                    <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                    {/* <DataTable.Cell align="center">{record.location}</DataTable.Cell> */}
                    <DataTable.Cell align = "center">{record.amount}</DataTable.Cell>
                    <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                    {/* <DataTable.Cell align="center">{record.salesmanager_comment}</DataTable.Cell> */}
                    {/* <DataTable.Cell align="center">{record.expense_status}</DataTable.Cell> */}
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
  image: {
    width: 250,
    height: 250,
    marginBottom: 8,
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  }
})
