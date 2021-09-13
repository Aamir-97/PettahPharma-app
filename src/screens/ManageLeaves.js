import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, AsyncStorage} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card, DataTable} from 'react-native-paper';
import axios from 'axios';
import SearchInput, { createFilter } from 'react-native-search-filter';


const optionsPerPage = [2, 3, 4];
const Keys_to_filter = ['leave_Type'];

export default function ManageLeaves({ navigation }) {

  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [user, setUser] = useState({ rep_ID: '', manager_ID: '', });

  const [pendingLeaveList,setPendingLeaveList]=useState([]);

  const [searchTerm,setSearchTerm]=useState('');
  const filteredKey = pendingLeaveList.filter(createFilter(searchTerm.toLowerCase(), Keys_to_filter));

  const [pendingleaveCount, setPendingLeaveCount] = useState('');
  const [totalleaveCount, setTotalLeaveCount] = useState('');

    
  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID }); 
          // console.log("user")           
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[]);

  useEffect(() => {
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
  },[user]);

  async function fetchData (){

    try{  
      axios.post("http://10.0.2.2:3001/ManageLeaves/pendingleaveCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        setPendingLeaveCount(response.data.pendingleaveCount);
        // console.log("PendingleaveCount");
      });
    } catch (err) {
      console.log(err);
      console.log("Error while getting Pending Leave count");
    }

    try{  
      axios.post("http://10.0.2.2:3001/ManageLeaves/totalleaveCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        setTotalLeaveCount(response.data.totalleaveCount);
        // console.log("TotalleaveCount");
      });
    } catch (err) {
      console.log(err);
      console.log("Error while getting Total Leave count");
    } 

    try{
      axios.post("http://10.0.2.2:3001/viewPendingLeaves",{
        rep_ID:user.rep_ID,
      }).then((response)=>{
        setPendingLeaveList(response.data);
        // console.log("ViewPendingLeaves");
      })
    } catch (err){
        console.log("Error while displaying pending leaves");
    }
  }

  const ViewPendingLeave = (leave_ID) => {
    navigation.navigate('ViewPendingLeave', {leave_ID});
}
  
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
      <View style = {styles.sameRow}>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.countText}> {pendingleaveCount} </Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color="#D2F7F7" onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          <Text> Pending </Text>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.countText}> {totalleaveCount} </Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('AnnualLeaves')}></FontAwesome5Icon>
          <Text> Approved / Rejected </Text>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text/>
          <FontAwesome5Icon name= "plus-circle" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <DataTable>
                <DataTable.Header>
                    <DataTable.Title align = "center">Type of Leave</DataTable.Title>
                    <DataTable.Title align = "center">Duration</DataTable.Title>
                    <DataTable.Title align = "center">Description </DataTable.Title>
                </DataTable.Header>

                {filteredKey.map((record,i) => {
                            return(
                    <DataTable.Row key={record.leave_ID} onPress = {()=> ViewPendingLeave(record.leave_ID)}>
                    <DataTable.Cell align="center">{record.leave_Type}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.no_of_days} days</DataTable.Cell>
                    <DataTable.Cell align="center">{record.description}</DataTable.Cell>
                    
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

      {/* <View>
        
      <Card style={ styles.card }>
        <Card.Title title="Off"/>
        <Card.Content >
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "tired" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}></View>
      <Card style={ styles.card }>
        <Card.Title title="Medical Leaves"/>
        <Card.Content >
          <View style = {styles.sameRow} >
          <FontAwesome5Icon name= "frown" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}/>
      <Card.Title title="Casual Leaves"/>
        <Card.Content >
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "tired" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}></View>
      <Card style={ styles.card }>
        <Card.Title title="Annual Leaves"  />
        <Card.Content>
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "hand-holding-usd" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      </View> */}

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
  countText : {
    fontSize : 15,
    fontWeight : 'bold',
    color : theme.colors.primary
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  }
})
