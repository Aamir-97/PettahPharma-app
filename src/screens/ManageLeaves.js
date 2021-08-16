import React from 'react'
import Background from '../components/Background'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, Button} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card} from 'react-native-paper';


export default function ManageLeaves({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

      <View style = {styles.sameRow}>
        <View style={{alignItems: 'center'}}>
          <Text>27</Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          <Text> Requested </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>26</Text>
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ApprovedLeaves')}></FontAwesome5Icon>
          <Text> Approved </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text> </Text>
          <FontAwesome5Icon name= "plus-circle" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <View>
      <Card style={ styles.card }>
        <Card.Title title="Request for Time Off" subtitle="7 days July 21-28 2021" />
        <Card.Content >
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "tired" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          <View style = {styles.sameColumn}>
          <Text>John Smith</Text>
          <Text>ID-MR2987</Text>
          </View>
          <View style = {styles.sameColumn}>
          <Text>Leaves left</Text>
          <Text>9/10</Text>
          </View>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}></View>
      <Card style={ styles.card }>
        <Card.Title title="Sick Leave" subtitle="2 days July 11-12 2021" />
        <Card.Content >
          <View style = {styles.sameRow} >
          <FontAwesome5Icon name= "frown" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          <View style = {styles.sameColumn}>
          <Text>John Smith</Text>
          <Text>ID-MR2987</Text>
          </View>
          <View style = {styles.sameColumn}>
          <Text>Leaves left</Text>
          <Text>9/10</Text>
          </View>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}></View>
      <Card style={ styles.card }>
        <Card.Title title="Paid Vacation" subtitle="7 days July 21-28 2021" />
        <Card.Content>
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "hand-holding-usd" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          <View style = {styles.sameColumn}>
          <Text>John Smith</Text>
          <Text>ID-MR2987</Text>
          </View>
          <View style = {styles.sameColumn}>
          <Text>Leaves left</Text>
          <Text>9/10</Text>
          </View>
          </View>
        </Card.Content>
      </Card>
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
    width : '100%'
  },
  card: {
    backgroundColor :"#D2F7F7",
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  }
})
