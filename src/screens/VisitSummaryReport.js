import React from 'react';
import {Text, ScrollView } from 'react-native';
import Button from '../components/Button';


export default function VisitSummaryReport({navigation}){
    return ( 
        <ScrollView>
        <Button
        mode='contained'
        onPress={() => navigation.navigate('VSRForm')} > New Report </Button>
        <Text> This is Visit Summary Report Page</Text>
        </ScrollView>
    )
}


