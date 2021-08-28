import React, { useEffect, useState } from 'react';
import { DataTable, Searchbar, Avatar } from 'react-native-paper';
import {Text, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import BackButton from '../components/BackButton';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import { theme } from '../core/theme';

import SearchInput, { createFilter } from 'react-native-search-filter';

import axios from 'axios';


const Keys_to_filter = ['name'];
const optionsPerPage = [2, 3, 4];

export default function ProductDetails({navigation}){

//   const [searchQuery, setSearchQuery] = React.useState('');
//   const onChangeSearch = query => setSearchQuery(query);

    const [searchTerm, setSearchTerm] = useState('');

  const [productList,setProductList]=useState([]);

  const filteredKey = productList.filter(createFilter(searchTerm.toLowerCase(), Keys_to_filter));


  useEffect(()=>{
    axios.get("http://10.0.2.2:3001/viewproduct").then((response)=>{
      setProductList(response.data);
    //   console.log({...productList});
    })
  },[]);

  const [page, setPage] = React.useState(2);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const viewProduct = (product_id) => {
      navigation.navigate('ViewProduct', {product_id});
    //   console.log("product passed to the viewProduct function");
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
                    // value={query}
                    onChangeText={(text) => {setSearchTerm(text)} }
                    value={searchTerm}
                />

            </View>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Image</DataTable.Title>
                    <DataTable.Title>Medicine</DataTable.Title>
                    <DataTable.Title numeric>Volume</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>

                {filteredKey.map((record,i) => {
                    return(
                    <TouchableOpacity
                        key={record.product_id}
                        onPress = {()=> viewProduct(record.product_id)}
                    >
                        <DataTable.Row >
                            <DataTable.Cell align="center"> <Avatar.Image size={36} style={styles.productImage} source={{uri : record.display_photo}} /></DataTable.Cell>
                            <DataTable.Cell align='right'>{record.name}</DataTable.Cell>
                            <DataTable.Cell numeric>{record.volume}</DataTable.Cell>
                            <DataTable.Cell numeric>{record.price}
                                <EntypoIcons
                                    name="chevron-right" 
                                    color={theme.colors.primary}
                                    size={15}
                                />
                            
                            </DataTable.Cell>
                            {/* <DataTable.Cell align="center">{record.description}</DataTable.Cell> */}
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
