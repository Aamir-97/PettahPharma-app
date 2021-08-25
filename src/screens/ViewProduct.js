import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import Background from '../components/Background'


export default function ViewProduct ({route, navigation}){

    const {product_id}= route.params;





    return(
        <SafeAreaView>
            <ScrollView>
                <Background>
                    <Text>This is View task Page</Text>
                    <Text>{product_id}</Text>
                </Background>

            </ScrollView>
        </SafeAreaView>
    )

}