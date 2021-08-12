import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import Button from '../components/Button';


export default function DiscussionForum({navigation}){
    return ( 
        <ScrollView>
        <BackgroundLayout>
 
        <Text> Discussion Forum </Text>
        </BackgroundLayout>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    newReportButton :{

    },
})
