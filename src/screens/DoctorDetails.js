import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import Button from '../components/Button';


export default function DoctorDetails({navigation}){
    return ( 
        <ScrollView>
        <BackgroundLayout>
        <Button
        mode='contained'
        onPress={() => navigation.navigate('AddNewDoctor')} 
        style={styles.newReportButton}
        > Add New Doctor </Button>
        <Text> List Down of Doctors </Text>
        </BackgroundLayout>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    newReportButton :{

    },
})
