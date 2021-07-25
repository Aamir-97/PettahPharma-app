import React from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '../core/theme'
// import MenuIcon from '@material-ui/icons/Menu'



export default function TopNav(){
    return (
        <View>
            <View style={styles.TopNavigationBar}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TopNavigationBar :{
        backgroundColor : theme.colors.primary,
        height : 50,
        width : "100%",

    }
})