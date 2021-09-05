import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, AsyncStorage} from 'react-native'
import { Button, Card, DataTable } from 'react-native-paper'
import { theme } from '../core/theme'
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import axios from 'axios';

const optionsPerPage = [2, 3, 4];

export default function ManageExpenses({ navigation }) {

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
  },[]);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => { setSearchQuery(query) }
  console.log(searchQuery);

  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  const [expensesList,setExpensesList]=useState([]);

  const [dailybatta, setDailyBatta] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [accomodations, setAccomodation] = useState(0);
  const [other, setOther] = useState(0);
  const [total, setTotal] = useState(0);


  useEffect(()=>{
    axios.post("http://10.0.2.2:3001/ViewExpenses",{
      rep_ID : user.rep_ID,
    }).then((response)=>{
      setExpensesList(response.data);
    });
  },[user]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);


  useEffect(() => {
    async function fetchData(){
      try {
        axios.post("http://10.0.2.2:3001/Expenses/DailyBatta",{
            rep_ID : user.rep_ID,  
          }).then((response)=>{
            setDailyBatta(response.data[0].Total);
          });
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[dailybatta]);

  useEffect(() => {
    async function fetchData(){
      try {
        axios.post("http://10.0.2.2:3001/Expenses/Accomodation",{
          rep_ID : user.rep_ID,  
        }).then((response)=>{
          setAccomodation(response.data[0].Total);
        });
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[accomodations]);

  useEffect(() => {
    async function fetchData(){
      try {
        axios.post("http://10.0.2.2:3001/Expenses/Fuel",{
          rep_ID : user.rep_ID,  
        }).then((response)=>{
          setFuel(response.data[0].Total);
        });
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[fuel]);

  useEffect(() => {
    async function fetchData(){
      try {
        axios.post("http://10.0.2.2:3001/Expenses/Other",{
          rep_ID : user.rep_ID,  
        }).then((response)=>{
          setOther(response.data[0].Total);
        });
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[other]);

  useEffect(() => {
    async function fetchData(){
      try {
        axios.post("http://10.0.2.2:3001/Expenses/Total",{
          rep_ID : user.rep_ID,  
        }).then((response)=>{
          setTotal(response.data[0].Total);
        });;
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[total]);
  

  const ViewExpense = (expense_ID) => {
    navigation.navigate('ViewExpense', {expense_ID});
  //   console.log("expense passed to the ViewExpense function");
}

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

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
              // labelStyle = {{fontWeight : 'bold', marginLeft : -2, color:'#0000FF'}}
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
              <Text style={styles.textLable}>Total : </Text>
              <Text style={styles.text}>Rs. {total}.00</Text>
          </View>
        </Card.Content>
      </Card>

       <DataTable>
            <DataTable.Header>
              <DataTable.Title >Expense Type</DataTable.Title>
              <DataTable.Title > |  Amount  | </DataTable.Title>
              <DataTable.Title >Date | </DataTable.Title>
              <DataTable.Title numeric>Status</DataTable.Title>
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

                              if (record.status===0){
                                return(
                                  <DataTable.Row key={record.expense_ID} onPress = {()=> ViewExpense(record.expense_ID)}>
                                  <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                                  <DataTable.Cell align = "center">Rs.{record.amount}.00</DataTable.Cell>
                                  <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                                  <DataTable.Cell numeric><Text style={{color:theme.colors.secondary, fontWeight: 'bold'}}>Pending</Text></DataTable.Cell>
                                  </DataTable.Row>
                                )                                
                              } else if (record.status===1){
                                return(
                                  <DataTable.Row key={record.expense_ID} onPress = {()=> ViewExpense(record.expense_ID)}>
                                  <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                                  <DataTable.Cell align = "center">Rs.{record.amount}.00</DataTable.Cell>
                                  <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                                  <DataTable.Cell numeric><Text style={{color:theme.colors.primary, fontWeight: 'bold'}}>Accepted</Text></DataTable.Cell>
                                  </DataTable.Row>
                                )  
                              } else {
                                return(
                                  <DataTable.Row key={record.expense_ID} onPress = {()=> ViewExpense(record.expense_ID)}>
                                  <DataTable.Cell align = "center"> {record.expense_Type}</DataTable.Cell>
                                  <DataTable.Cell align = "center">Rs.{record.amount}.00</DataTable.Cell>
                                  <DataTable.Cell align = "center">{year+month+day}</DataTable.Cell>
                                  <DataTable.Cell numeric><Text style={{color:theme.colors.error, fontWeight: 'bold'}}>Rejected</Text></DataTable.Cell>
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
    // backgroundColor :"#D2F7F7",
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
      marginLeft : -40,
      fontSize : 16,
      marginBottom : 6,
      fontWeight : 'bold',
      color : theme.colors.primary,
      // alignSelf : 'flex-start'
  },
})
