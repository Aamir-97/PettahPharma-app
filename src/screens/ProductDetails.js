import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import Button from '../components/Button';


export default function ProductDetails({navigation}){
    return ( 
        <ScrollView>
        <BackgroundLayout>
        <Text> List Down ProductDetails </Text>
        </BackgroundLayout>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    newReportButton :{

    },
})
