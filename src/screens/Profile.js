import { bold } from 'ansi-colors';
import React from 'react';
import {Text, ScrollView, StyleSheet, View, TouchableHighlight, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import BackgroundLayout from '../components/BackgroundLayout';
import Button from '../components/Button';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../core/theme'


export default function Profile({navigation}){
    return ( 
        <SafeAreaView>
        <ScrollView>
        <BackgroundLayout>
        <Button mode='contained' onPress={() => navigation.navigate('EditProfile')} style={styles.editProfileButton} > Edit Profile </Button>

        <View style={{padding:10, width:'100%',height:150, backgroundColor:'#f0ead5', alignItems:'center'}}>
            <TouchableOpacity>
                <Image source ={require('../assets/cover.jpg')} style = {{width:160, height: 160, marginTop:70, borderRadius: 100}}></Image>
            </TouchableOpacity>
            </View>
        <View style={{alignItems:'center'}}>
            <Image source ={require('../assets/aamirDp.jpeg')} style = {{width:150, height: 150, marginTop:-65, borderRadius: 100}}></Image> 
            <Text style={{fontSize:25, fontWeight:'bold', padding:10}}>Fred Wright</Text>
            <Text style={{fontSize:15, fontWeight:'bold', color:'grey', padding:10}}>25, Male</Text>
            <View style = {styles.sameRow}>
                <FontAwesome5Icon name="briefcase" color={theme.colors.primary} size={30}></FontAwesome5Icon>
                <Text style={{fontSize:15, padding:10}}>Medical representative</Text>
            </View>
            <View style = {styles.sameRow}>
                <FontAwesome5Icon name="phone" color={theme.colors.primary} size={30}></FontAwesome5Icon>
                <Text style={{fontSize:15, padding:10}}>077 727727</Text>
            </View>
            <View style = {styles.sameRow}>
                <FontAwesome5Icon name="map-marker-alt" color={theme.colors.primary} size={30}></FontAwesome5Icon>
                <Text style={{fontSize:15, padding:10}}>Surrey</Text>
            </View>
            <View style = {styles.sameRow}>
                <FontAwesome5Icon name="envelope" color={theme.colors.primary} size={30}></FontAwesome5Icon>
                <Text style={{fontSize:15, padding:10}}>medrep@hotmail.com</Text>
            </View>
        </View>
        
        </BackgroundLayout>
        </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create ({
    sameRow : {
      flexDirection : 'row',
      justifyContent: 'space-between',
      marginBottom : 5,
      marginTop : 5,
      width : '50%'
    },
    editProfileButton :{
        flexDirection : 'row',
        marginBottom : 10
    },
    sameColumn : {
      flexDirection : 'column',
      height : '9%',
      marginTop : 5,
      marginBottom : 5,
    }
  })
