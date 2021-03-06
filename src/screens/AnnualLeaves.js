import React, {useState, useEffect} from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import { Text ,DataTable, Searchbar} from 'react-native-paper'
import BackButton from '../components/BackButton'
import axios from 'axios';
import SearchInput, { createFilter } from 'react-native-search-filter';


const optionsPerPage = [2, 3, 4];
const Keys_to_filter = ['leave_Type', 'start_Date'];


export default function AnnualLeaves({ navigation }) {

  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [leaveList,setLeaveList]=useState([]);

  const [searchTerm,setSearchTerm]=useState("");
  const filteredKey = leaveList.filter(createFilter(searchTerm.toLowerCase(), Keys_to_filter));

  const [rep_ID, setRepID] = React.useState('');

  const [pendingleaveCount, setPendingLeaveCount] = useState('');
  const [totalleaveCount, setTotalLeaveCount] = useState('');

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
        // console.log("user");            
      }
    } catch (e){
      console.log(e);
    }
  if(rep_ID){
    try{  
      axios.post("http://10.0.2.2:3001/AnnualLeaves/pendingleaveCount",{
        rep_ID : rep_ID, 
      }).then((response)=>{
        setPendingLeaveCount(response.data.pendingleaveCount);
        console.log("/pendingleaveCount");
      });
    } catch (err) {
      console.log(err);
      console.log("Error while getting Pending Leave count");
    }

    try{  
      axios.post("http://10.0.2.2:3001/AnnualLeaves/totalleaveCount",{
        rep_ID : rep_ID, 
      }).then((response)=>{
        setTotalLeaveCount(response.data.totalleaveCount);
        console.log("/totalleaveCount");
      });
    } catch (err) {
      console.log(err);
      console.log("Error while getting Total Leave count");
    }

    try{
      axios.post('http://10.0.2.2:3001/viewLeaves',{
        rep_ID : rep_ID,
      }).then((response)=>{
        setLeaveList(response.data);
        console.log("/viewLeaves");
      })
    } catch (err) {
        console.log("Error while displaying pending & rejected leaves");
    }
  }
  }
  
  const ViewLeave = (leave_ID) => {
    navigation.navigate('ViewLeave', {leave_ID});
  }


  
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
        <View>
        <View style = {styles.sameRow}>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.countText}> {pendingleaveCount} </Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color =  {theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          <Text color ="#D2F7F7"> Pending </Text>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.countText}> {totalleaveCount} </Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color = "#D2F7F7" onPress= {() => navigation.navigate('AnnualLeaves')}></FontAwesome5Icon>
          <Text> Approved / Rejected </Text>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text/>
          <FontAwesome5Icon name= "plus-circle" size= {40} color = {theme.colors.primary}  onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <View style= {styles.sameRow}>
                <View style={{top:-20}}>
                <BackButton goBack={navigation.goBack} />
                </View>                
                <Searchbar style= {styles.searchBar} placeholder="Search" onChangeText={(text) => {setSearchTerm(text)} } value={searchTerm} />
            </View>
          <DataTable >
                <DataTable.Header>
                    <DataTable.Title align = "right">Type of Leaves </DataTable.Title>
                    <DataTable.Title> Start Date  </DataTable.Title>
                    <DataTable.Title>        Duration</DataTable.Title>
                    <DataTable.Title numeric>Leave Status</DataTable.Title>
                </DataTable.Header>

                {filteredKey.map((record,i) => {
                  const dtt = new Date(record.start_Date);
                  const year = dtt.getFullYear() + '-';
                  const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '-';
                  const day = ('0' + dtt.getDate()).slice(-2);
                    return(
                    <TouchableOpacity key={record.leave_ID} onPress = {()=> ViewLeave(record.leave_ID)}>
                    <DataTable.Row >
                    <DataTable.Cell align="right">{record.leave_Type} </DataTable.Cell>
                    <DataTable.Cell > {year+month+day} </DataTable.Cell>
                    <DataTable.Cell numeric>{record.no_of_days} day(s)</DataTable.Cell>
                    <DataTable.Cell numeric>{record.status}</DataTable.Cell>
                    </DataTable.Row>
                    </TouchableOpacity>
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
  DataTable: {
    backgroundColor :"#D2F7F7",
  },
  countText : {
    fontSize : 15,
    fontWeight : 'bold',
    color : theme.colors.primary
  },
  sameColumn : {
    flexDirection : 'column',
    height : '9%',
    marginTop : 5,
    marginBottom : 5,
  },
  searchBar: {
    width : '80%',
    marginLeft : '20%',
    height: 40,
    marginBottom : 10
},
})
