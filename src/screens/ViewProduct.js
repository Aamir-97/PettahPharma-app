import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet,Image } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme'
import FontistoIcon from 'react-native-vector-icons/Fontisto'

import axios from 'axios';


export default function ViewProduct ({route, navigation}){

    const {product_id}= route.params;

    const [productDetails, setProductDetails] = React.useState({
        display_photo : '../assets/medicine/aspirine500.jpeg',
        name : '',
        volume : '',
        price : '',
        description : ''
    })

    useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/ProductDetails/ViewProduct",{
            product_id : product_id,  
        }).then((response)=>{
          // console.log("/ProductDetails/ViewProduct");
          setProductDetails({...productDetails,
            display_photo : response.data[0].display_photo,
            name : response.data[0].name,
            volume : response.data[0].volume,
            price : response.data[0].price,
            description : response.data[0].description,      
        });
          // console.log({...taskList});
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while get product details for View");  
        } 
      } fetchData();
  },[]);

  
    return(
        <SafeAreaView>
            <ScrollView>
                <BackgroundLayout>

                    <View style={{alignSelf :'center'}}>
                        <View style={styles.sameRow}>
                        <FontistoIcon name= "product-hunt" size= {30} color={theme.colors.primary}></FontistoIcon>
                        <Text style={styles.header}>Product Details</Text> 
                        </View>
                    </View>

                    <View style ={styles.productContainer}> 
                        <Image
                            style = {styles.medicinePhoto}
                                source ={require('../assets/medicine/benadryl.jpeg')}
                        />
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Name : </Text>
                            <Text style={styles.text}>{productDetails.name}</Text>
                            {/* <Text style={styles.text}>{productDetails.display_photo}</Text> */}
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Volume : </Text>
                            <Text style={styles.text}>{productDetails.volume}</Text>
                        </View>
                        <View style= {styles.sameRow}>
                            <Text style={styles.textLable}>Price : </Text>
                            <Text style={styles.text}>Rs. {productDetails.price}.00</Text>
                        </View>

                            <Text style={styles.textLable}>Description : </Text>
                            <Text style={styles.text}>{productDetails.description}</Text>

                    </View>
                </BackgroundLayout>

            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create ({
    productContainer : {
        flex : 1,
        width : '100%',
        height : '100%',
        padding: 20,
        backgroundColor : theme.colors.surface,
        borderRadius : 5,
        shadowColor : 'gray',
        elevation : 10,
        marginTop : 20,
    },
  
    header : {
      color : theme.colors.primary,
      fontWeight : 'bold',
      fontSize : 22,
      marginLeft : 5,
      textAlign : 'center'    
    },

    text : {
        fontSize : 16,
        marginBottom : 10


    },
    textLable : {
        fontSize : 18,
        marginBottom : 10,
        fontWeight : 'bold',
        color : theme.colors.primary,
    },
    medicinePhoto: {
        width:150, 
        height: 150, 
        marginTop:10, 
        borderRadius: 100, 
        alignSelf : 'center',
        marginBottom : 20
    },

    sameRow : {
      flexDirection : 'row',
      width : '100%'
    },
  })