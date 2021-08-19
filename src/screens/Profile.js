import React, { Component } from 'react'
import { View, Text } from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout';
import BackButton from '../components/BackButton'


export default function Profile({navigation}) {
    return(
        <BackgroundLayout>
            <BackButton goBack={navigation.goBack} />
        <View>
            <Text>Profile Page</Text>
        </View>
        </BackgroundLayout>

    )
}


    

