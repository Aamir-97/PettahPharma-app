import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, AsyncStorage} from 'react-native'
import { Button, Searchbar, Card, DataTable } from 'react-native-paper'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackButton from '../components/BackButton'
import BackgroundLayout from '../components/BackgroundLayout'
import axios from 'axios';
import SearchInput, { createFilter } from 'react-native-search-filter';

const Keys_to_filter = ['expense_Type', 'date', 'status'];
const optionsPerPage = [2, 3, 4];

export default function ManageExpenses({ navigation }) {

  const [rep_ID, setRepID] = React.useState('');


  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [expensesList,setExpensesList]=useState([]);

  const [dailybatta, setDailyBatta] = useState('');
  const [fuel, setFuel] = useState('');
  const [accomodations, setAccomodation] = useState('');
  const [other, setOther] = useState('');
  const [total, setTotal] = useState('');

  const [searchTerm,setSearchTerm]=useState("");
  const filteredKey = expensesList.filter(createFilter(searchTerm.toLowerCase(), Keys_to_filter));

  useEffect(() => {
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
  },[rep_ID]);

    async function fetchData(){

      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setRepID(profile.rep_ID);
          console.log("user");           
        }
      } catch (e){
        console.log(e);
      }
    if(rep_ID){

      try {
        axios.post("http://10.0.2.2:3001/Expenses/StatisticsData",{
          rep_ID : rep_ID,
        }).then((response)=>{
          setDailyBatta(response.data[0].DailyBatta);
          setFuel(response.data[0].Fuel);
          setAccomodation(response.data[0].Accomodation);
          setOther(response.data[0].Other);
          setTotal(response.data[0].Total);
          console.log("/Expenses/StatisticsData");
        });
      } catch (e){
        console.log(e);
      }

      try {
        axios.post("http://10.0.2.2:3001/ViewExpenses",{
          rep_ID : rep_ID,
        }).then((response)=>{
          setExpensesList(response.data);
          console.log("/ViewExpenses");
        });
      } catch (e){
        console.log(e);
      }

    }

    }

  const ViewExpense = (expense_ID) => {
    navigation.navigate('ViewExpense', {expense_ID});
  }

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
            <View style= {styles.sameRow}>
                <View style={{top:-20}}>
                <BackButton goBack={navigation.goBack} />
                </View>                

            </View>

        <View style={{flexDirection : "row", alignSelf:'flex-end'}}>
            <Button
              mode='contained'
              icon={({color, size}) => (
                  <FontAwesome5Icon
                  name="wpforms" 
                  color= {theme.colors.surface}
                  size={25}
                  />
              )}
              onPress={() => navigation.navigate('ClaimExpenses')} 
              > Claim For Expenses
            </Button>
        </View>


      
      <View>
      
      <Card style={ styles.card }>
        <Card.Title title="Total Expenses by Category" style={{}} />
        <Card.Content >
          <View style= {styles.sameRow}>
              <FontAwesome5Icon name="money-bill-wave" size={22} color={theme.colors.primary} />
              <Text style={styles.textLable}>Daily Batta : </Text>
              <Text style={styles.text}>Rs. {dailybatta}.00</Text>
          </View>
          <View style= {styles.sameRow}>
              <FontAwesome5Icon name="hotel" size={22} color={theme.colors.primary} />
              <Text style={styles.textLable}>Accomodations : </Text>
              <Text style={styles.text}>Rs. {accomodations}.00</Text>
          </View>
          <View style= {styles.sameRow}>
              <Icon name="fuel" size={25} color={theme.colors.primary} />
              <Text style={styles.textLable}>Fuel : </Text>
              <Text style={styles.text}>Rs. {fuel}.00</Text>
          </View>
          <View style= {styles.sameRow}>
              <FontAwesome5Icon name="coins" size={22} color={theme.colors.primary} />
              <Text style={styles.textLable}>Other : </Text>
              <Text style={styles.text}>Rs. {other}.00</Text>
          </View>
          <View style= {styles.sameRow}>
              <FontAwesome5Icon name="money-check-alt" size={22} color={theme.colors.primary} />
              <Text style={styles.totalLable}>Total : </Text>
              <Text style={{fontSize : 16,fontWeight : 'bold'}}>Rs. {total}.00</Text>
          </View>
        </Card.Content>
      </Card>

                <Searchbar
                    style= {styles.searchBar}
                    placeholder="Search"
                    onChangeText={(text) => {setSearchTerm(text)} }
                    value={searchTerm}
                />

       <DataTable>
            <DataTable.Header>
              <DataTable.Title >Expense Type</DataTable.Title>
              <DataTable.Title > |  Amount  | </DataTable.Title>
              <DataTable.Title >Date | </DataTable.Title>
              <DataTable.Title numeric>Status</DataTable.Title>
            </DataTable.Header>

            {filteredKey.map((record,i) => {
                    const dtt = new Date(record.date);
                    const year = dtt.getFullYear() + '/';
                    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
                    const day = ('0' + dtt.getDate()).slice(-2);

                    let price =record.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                              if (record.status==='Pending'){
                                return(
                                  <DataTable.Row key={record.expense_ID} onPress = {()=> ViewExpense(record.expense_ID)}>
                                  <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                                  <DataTable.Cell align = "center">Rs.{price}.00</DataTable.Cell>
                                  <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                                  <DataTable.Cell numeric><Text style={{color:'blue', fontWeight: 'bold'}}>{record.status}</Text></DataTable.Cell>
                                  </DataTable.Row>
                                )                                
                              } else if (record.status==='Accept'){
                                return(
                                  <DataTable.Row key={record.expense_ID} onPress = {()=> ViewExpense(record.expense_ID)}>
                                  <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                                  <DataTable.Cell align = "center">Rs.{price}.00</DataTable.Cell>
                                  <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                                  <DataTable.Cell numeric><Text style={{color:theme.colors.primary, fontWeight: 'bold'}}>{record.status}</Text></DataTable.Cell>
                                  </DataTable.Row>
                                )  
                              } else {
                                return(
                                  <DataTable.Row key={record.expense_ID} onPress = {()=> ViewExpense(record.expense_ID)}>
                                  <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                                  <DataTable.Cell align = "center">Rs.{price}.00</DataTable.Cell>
                                  <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                                  <DataTable.Cell numeric><Text style={{color:theme.colors.error, fontWeight: 'bold'}}>{record.status}</Text></DataTable.Cell>
                                  </DataTable.Row>
                                )
                              }
                            })
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
    backgroundColor : theme.colors.surface,
    flex : 1,
    width : '100%',
    height : '80%',
    padding: 5,
    borderRadius : 5,
    shadowColor : 'gray',
    elevation : 10,
    marginTop : 20,
  },
  title: {
    fontSize : 18,
    marginBottom : 10,
    fontWeight : 'bold',
    color : theme.colors.primary,
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  },
  text : {
      fontSize : 16,
  },
  textLable : {
      // marginLeft : 20,
      alignSelf : 'flex-start',
      fontSize : 16,
      marginBottom : 6,
      fontWeight : 'bold',
      color : theme.colors.primary,
  },
  totalLable : {
      // marginLeft : 20,
      fontSize : 18,
      marginBottom : 6,
      fontWeight : 'bold',
      color : theme.colors.primary,
  },
  searchBar: {
    width : '100%',
    height: 40,
    marginBottom : 15,
    marginTop : 15,
},
})
