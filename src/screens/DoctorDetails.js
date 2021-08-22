import React, { useState, useEffect } from 'react';
import { DataTable, Searchbar, Button, Avatar } from 'react-native-paper';
import {Text, ScrollView, StyleSheet, View, AsyncStorage} from 'react-native';
import { theme } from '../core/theme';
import BackgroundLayout from '../components/BackgroundLayout';
// import Button from '../components/Button';
import BackButton from '../components/BackButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo'

import axios from 'axios';


const optionsPerPage = [2, 3, 4];

export default function DoctorDetails({navigation}){

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => { setSearchQuery(query) }
  console.log(searchQuery);

//   const [searchTerm,setSearchTerm]=useState("");


  const [page, setPage] = React.useState(3);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);


  const [productList,setProductList]=useState([]);

  useEffect(()=>{
    axios.get("http://10.0.2.2:3001/viewDoctorDetails").then((response)=>{
      setProductList(response.data);
    })
  },[]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);



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
                    onChangeText={onChangeSearch}
                    // onChangeText={(e)=>{setSearchTerm(e.target.value);}}
                    value={searchQuery}
                />

            </View>
            <Button
                style= {styles.addButton}
                mode='contained'
                icon={({color, size}) => (
                    <EntypoIcons 
                    name="add-user" 
                    color={theme.colors.surface}
                    size={22}
                    />
                )}
                onPress={() => navigation.navigate('AddNewDoctor')} 
                > Add New Doctor 
            </Button>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Profile</DataTable.Title>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Clinic Center</DataTable.Title>
                    <DataTable.Title numeric>Contact</DataTable.Title>
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
                    <DataTable.Row key={record.doctor_id}>
                    <DataTable.Cell align="center"> <Avatar.Image size={36} style={styles.productImage} source={require('../assets/Doctors/vectorDoctor.png')} /></DataTable.Cell>
                    <DataTable.Cell align="center">{record.name}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.clinic}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.contact_no}</DataTable.Cell>
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
        width : 200,
        // height : 50,
        flexDirection : 'row',
        alignSelf : 'flex-end'


    },
    productImage: {
        backgroundColor : '#B0B0B000'
    },
})

