import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import Button from '../components/Button';


export default function VisitSummaryReport({navigation}){
    return ( 
        <ScrollView>
        <BackgroundLayout>
        <Button
        mode='contained'
        onPress={() => navigation.push('VSRForm')} 
        style={styles.newReportButton}
        > New Report </Button>
        <Text> This is Visit Summary Report Page</Text>
        </BackgroundLayout>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    newReportButton :{

    },
})

