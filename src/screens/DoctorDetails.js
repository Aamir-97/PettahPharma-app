import React, { useState, useEffect } from 'react';
import { DataTable, Searchbar, Button, Avatar } from 'react-native-paper';
import {Text, ScrollView, StyleSheet, View, AsyncStorage, TouchableOpacity} from 'react-native';
import { theme } from '../core/theme';
import BackgroundLayout from '../components/BackgroundLayout';
// import Button from '../components/Button';
import BackButton from '../components/BackButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import SearchInput, { createFilter } from 'react-native-search-filter';
import { ListItem } from 'react-native-elements'


import axios from 'axios';

const Keys_to_filter = ['name'];


const optionsPerPage = [2, 3, 4];

export default function DoctorDetails({navigation}){

//   const [searchQuery, setSearchQuery] = React.useState('');
//   const onChangeSearch = query => { setSearchQuery(query) }
//   console.log(searchQuery);

  const [searchTerm,setSearchTerm]=useState("");


  const [page, setPage] = React.useState(3);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);


  const [doctorList,setDoctorList]=useState([]);

  const [user, setUser] = React.useState({ 
    rep_ID: '', 
    manager_ID: '',
  });

  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (userProfile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });
        //   getDctorDetails(user.rep_ID);  
        
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();     
  },[]);

  useEffect(() => {
      try { 
          axios.post('http://10.0.2.2:3001/viewDoctorDetails',{
            rep_ID : user.rep_ID,
          }).then((response)=> {
                setDoctorList(response.data)
          })
      } catch (err) {
          console.log("Error While Get the doctor Details");
      }    
  },[doctorList]);
  

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const doctorView = (doctor_id) => {
    navigation.navigate('ViewDoctor', {doctor_id});
    console.log(doctor_id);
  }

  const filteredKey = doctorList.filter(createFilter(searchTerm.toLowerCase(), Keys_to_filter));


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
                    onChangeText={(text)=>{setSearchTerm(text)}}
                    value={searchTerm}
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

                {filteredKey.map((record,i) => {
                    return(
                    <TouchableOpacity
                        key={record.doctor_id}
                        onPress = {()=> doctorView(record.doctor_id)}
                    >
                        <DataTable.Row >
                            <DataTable.Cell align="center"> <Avatar.Image size={36} style={styles.productImage} source={require('../assets/Doctors/vectorDoctor.png')} /></DataTable.Cell>
                            <DataTable.Cell align="center">{record.name}</DataTable.Cell>
                            <DataTable.Cell align="center">{record.clinic}</DataTable.Cell>
                            <DataTable.Cell align="center">{record.contact_no}</DataTable.Cell>
                            {/* <DataTable.Cell numeric>                              
                                <EntypoIcons
                                  name="chevron-right" 
                                  color={theme.colors.primary}
                                  size={15}
                                />
                            </DataTable.Cell> */}
                        </DataTable.Row>
                    </TouchableOpacity>
                    )
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

            
            {/* {filteredKey.map((record,i) => {
                    return(
                    <View key={record.doctor_id}>
                    <TouchableOpacity                        
                        onPress = {()=> doctorView(record.doctor_id)}
                    >
                      <ListItem
                        // key={i}
                        title={record.name}
                        subtitle={record.clinic}
                        subtitle={record.contact_no}
                        leftAvatar={{ source: { uri: record.display_photo } }}
                        bottomDivider
                        chevron
                      />
                    </TouchableOpacity>
                    </View>
                    )
              })
            } */}



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
        flexDirection : 'row',
        alignSelf : 'flex-end'


    },
    productImage: {
        backgroundColor : '#B0B0B000'
    },
})

