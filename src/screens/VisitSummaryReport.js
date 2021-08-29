import React, { useState, useEffect } from 'react';
import { DataTable, Searchbar, Button, Avatar } from 'react-native-paper';
import {Text, ScrollView, StyleSheet, View, AsyncStorage, TouchableOpacity} from 'react-native';
import { theme } from '../core/theme';
import BackgroundLayout from '../components/BackgroundLayout';
import BackButton from '../components/BackButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import SearchInput, { createFilter } from 'react-native-search-filter';


import axios from 'axios';

const Keys_to_filter = ['visit_type', 'date'];
const optionsPerPage = [2, 3, 4, 5];

export default function VisitSummaryReport({navigation}){

  // const [searchQuery, setSearchQuery] = React.useState('');
  // const onChangeSearch = query => { setSearchQuery(query) }
  // console.log(searchQuery);

  const [searchTerm,setSearchTerm]=useState("");


  const [page, setPage] = React.useState(3);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[6]);


  const [productList, setProductList]=useState([]);

  const filteredKey = productList.filter(createFilter(searchTerm.toLowerCase(), Keys_to_filter));




  // useEffect( async()=>{

  // },[]);

  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile); 
        if (profile !== null ){
          const rep_ID = profile.rep_ID;
          getStaticCounts(rep_ID);
        }      
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[productList]);    


  const getStaticCounts = (rep_ID) => {
    // console.log(rep_ID);
    // console.log(user.rep_ID);
    try{  
      axios.post("http://10.0.2.2:3001/viewVisitSummaryReport",{
        rep_ID : rep_ID,  
    }).then((response)=>{
      setProductList(response.data);
    });
    } catch (err) {    
      console.log(err);
      console.log("Error while get Static Data");
    }
  };

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);


  const viewReport = (report_id) => {
    navigation.navigate('ViewVSR',{report_id});
  }



  return (
    <ScrollView>
        <BackgroundLayout>
            <View style= {styles.sameRow}>
                <View style={{top:-20}}>
                <BackButton goBack={navigation.goBack} />
                </View>                
                <Searchbar
                    style= {styles.searchBar}
                    placeholder="Search"
                    // onChangeText={onChangeSearch}
                    onChangeText={(text) => {setSearchTerm(text)} }
                    value={searchTerm}
                />

            </View>
            <Button
                style= {styles.addButton}
                mode='contained'
                icon={({color, size}) => (
                    <Icon
                    name="file-plus-outline" 
                    color={theme.colors.surface}
                    size={25}
                    />
                )}
                onPress={() => navigation.push('VSRForm')} 
                > New Report 
            </Button>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Visit Type</DataTable.Title>
                    <DataTable.Title numeric>Clinic/Doctor</DataTable.Title>
                    {/* <DataTable.Title numeric>Description</DataTable.Title> */}
                </DataTable.Header>

                {filteredKey.map((record,i) => {
                    const dtt = new Date(record.date);
                    const year = dtt.getFullYear() + '/';
                    const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
                    const day = ('0' + dtt.getDate()).slice(-2);
                    return(
                        <TouchableOpacity
                              key={record.report_id}
                              onPress = {() => viewReport(record.report_id)}
                        >
                          <DataTable.Row >
                            <DataTable.Cell align="center">{year + month + day}</DataTable.Cell>
                            <DataTable.Cell align="center">{record.visit_type} Visit</DataTable.Cell>
                            <DataTable.Cell align="center" numeric>{record.location}
                                <EntypoIcons
                                  name="chevron-right" 
                                  color={theme.colors.primary}
                                  size={15}
                                />
                            </DataTable.Cell>
                            {/* <DataTable.Cell align="center">{record.description}</DataTable.Cell> */}
                            {/* <DataTable.Cell numaric></DataTable.Cell> */}
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

        </BackgroundLayout>
    </ScrollView>
  );
}


const styles= StyleSheet.create({
    searchBar: {
        width : '80%',
        marginLeft : '20%',
        height: 40,
    },
    sameRow : {
        flexDirection : 'row',
        // alignSelf : 'center',
        justifyContent : 'space-between'
    },
    addButton: {
        margin: 10,
        // width : 200,
        // height : 50,
        flexDirection : 'row',
        alignSelf : 'flex-end'


    },
    productImage: {
        backgroundColor : '#B0B0B000'
    },
})

