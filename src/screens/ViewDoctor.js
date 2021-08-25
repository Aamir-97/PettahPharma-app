import React, { useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import Background from '../components/Background'


export default function ViewDoctor ({route, navigation}){

    const {doctor_id}= route.params;

    return(
        <SafeAreaView>
            <ScrollView>
                <Background>
                    <Text>This is Doctor Details Page</Text>
                    <Text>{doctor_id}</Text>
                </Background>

            </ScrollView>
        </SafeAreaView>
    )

}