import React, {useState, useEffect} from 'react'
import { View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, AsyncStorage, Button} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import { Text ,DataTable} from 'react-native-paper'
import axios from 'axios';

const optionsPerPage = [2, 3, 4];

export default function AnnualLeaves({ navigation }) {
 
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => { setSearchQuery(query) }
  console.log(searchQuery);

//   const [searchTerm,setSearchTerm]=useState("");

  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  const [leaveList,setLeaveList]=useState([]);

  const [user, setUser] = useState({ rep_ID: '',  manager_ID: '',});

  const [pendingleaveCount, setPendingLeaveCount] = useState('');
  const [totalleaveCount, setTotalLeaveCount] = useState('');

  useEffect(() => {
    try{  
      axios.post("http://10.0.2.2:3001/AnnualLeaves/pendingleaveCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        setPendingLeaveCount(response.data.pendingleaveCount);
      });
    } catch (err) {
      console.log(err);
      console.log("Error while getting Pending Leave count");
    } 
  },[pendingleaveCount]);

  useEffect(() => {
    try{  
      axios.post("http://10.0.2.2:3001/AnnualLeaves/totalleaveCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        setTotalLeaveCount(response.data.totalleaveCount);
      });
    } catch (err) {
      console.log(err);
      console.log("Error while getting Total Leave count");
    } 
  },[totalleaveCount]);
  
// view approved and rejected leaves
  useEffect(()=>{
    try{
    axios.post('http://10.0.2.2:3001/viewLeaves',{
      rep_ID : user.rep_ID,
    }).then((response)=>{
      setLeaveList(response.data)
    })
  } catch (err) {
      console.log("Error while displaying leaves");
  }
},[leaveList]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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
  
  const ViewApprovedLeave = (leave_ID) => {
    navigation.navigate('ViewApprovedLeave', {leave_ID});
  //   console.log("leave passed to the ViewApprovedLeave function");
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
          <DataTable >
                <DataTable.Header>
                    <DataTable.Title align = "center">Type of Leaves</DataTable.Title>
                    <DataTable.Title align = "center">Duration</DataTable.Title>
                    <DataTable.Title align = "center">Leave Status</DataTable.Title>
                    <DataTable.Title align = "center">Description</DataTable.Title>
                </DataTable.Header>

                {leaveList.filter(val=>{if(searchQuery===""){
                            return val;
                            }else if(
                            val.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            { return val;
                             } 
                          }).map((record)=>{
                            return(
                    <DataTable.Row key={record.leave_ID} onPress = {()=> ViewApprovedLeave(record.leave_ID)}>
                    <DataTable.Cell align="center">{record.leave_Type}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.no_of_days} days</DataTable.Cell>
                    <DataTable.Cell align="center">{record.status}</DataTable.Cell>
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
  }
})
