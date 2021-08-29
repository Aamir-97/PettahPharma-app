import React from 'react'
import { View, StyleSheet , Image , Text} from 'react-native'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'




export default function TopNav(){
    return (
        <View>
            <View style={styles.TopNavigationBar}>
            <Icon name={'menu'} size={32} color={'#ffffff'} style={styles.vectorIcons} />
            <Image source={require ("../assets/logoWithoutName.png")} style={styles.logo} />
            <Text style ={{color : "white"}}>Pettah Pharma App</Text>

            {/* <Image source={require ('../assets/avatar.jpg')} style ={styles.avatarImage} />   */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TopNavigationBar :{
        // flex : 1,
        flexDirection : 'row',
        backgroundColor : theme.colors.primary,
        height : 40,
        width : '100%',
        justifyContent : "center",
        paddingLeft : 10,
        paddingRight : 10,
    },

    vectorIcons :{
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    logo : {
        // flex : 1,
        alignSelf : "center" ,
        // justifyContent : "center",
        width : 40 ,
        height : 30 ,
    },
    avatarImage : {
        borderRadius : 50 ,
        width : 35 ,
        height : 35 ,
    },
})