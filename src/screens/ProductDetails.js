import React, { useEffect, useState } from 'react';
import { DataTable, Searchbar, Avatar } from 'react-native-paper';
import {Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

import axios from 'axios';

const optionsPerPage = [2, 3, 4];

export default function ProductDetails({navigation}){

//   const [searchQuery, setSearchQuery] = React.useState('');
//   const onChangeSearch = query => setSearchQuery(query);

  const [page, setPage] = React.useState(3);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);


//   const [searchTerm, setSearchTerm] = useState('');
// console.log(searchTerm);

  const [query, setSearchTerm] = React.useState('');
  const onChangeSearch = query => setSearchTerm(query);
  console.log(query);




  const [productList,setProductList]=useState([]);

  useEffect(()=>{
    axios.get("http://10.0.2.2:3001/viewproduct").then((response)=>{
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
                    value={query}
                    // onChangeText={(text) => setSearchTerm({ value: text})}
                    // value={searchTerm}
                />

            </View>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Image</DataTable.Title>
                    <DataTable.Title>Medicine</DataTable.Title>
                    <DataTable.Title numeric>Volume</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>

                {productList.filter(val=>{if(query===""){
                            return val;
                            }else if(
                            val.name.toLowerCase().includes(query.toLowerCase()));
                            {
                            return val
                            }
                            }).map((record)=>{
                            return(
                    <DataTable.Row key={record.product_ID}>
                    <DataTable.Cell align="center">{record.display_photo}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.name}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.volume}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.price}</DataTable.Cell>
                    {/* <DataTable.Cell align="center">{record.description}</DataTable.Cell> */}
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
    productImage: {
        backgroundColor : '#B0B0B000'
    }
})
