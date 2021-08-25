import React from 'react'
import Background from '../components/Background'
import { View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, Button} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card, Text, Paragraph } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

export default function AnnualLeaves({ navigation }) {
 
  // const [searchQuery, setSearchQuery] = React.useState('');
  // const onChangeSearch = query => { setSearchQuery(query) }
  // console.log(searchQuery);

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
        <View>
        <DataTable>
            <DataTable.Header>
              <DataTable.Title>Type of Leaves</DataTable.Title>
              <DataTable.Title numeric>Approved Leaves</DataTable.Title>
              <DataTable.Title numeric>Pending Leaves</DataTable.Title>
              <DataTable.Title numeric>Leaves Left</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Time off</DataTable.Cell>
              <DataTable.Cell numeric>15</DataTable.Cell>
              <DataTable.Cell numeric>6</DataTable.Cell>
              <DataTable.Cell numeric>7</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Sick Leaves</DataTable.Cell>
              <DataTable.Cell numeric>5</DataTable.Cell>
              <DataTable.Cell numeric>6</DataTable.Cell>
              <DataTable.Cell numeric>10</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Unpaid Leaves</DataTable.Cell>
              <DataTable.Cell numeric>2</DataTable.Cell>
              <DataTable.Cell numeric>1</DataTable.Cell>
              <DataTable.Cell numeric>-</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
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
    height : '9%',
    marginTop : 5,
    marginBottom : 5,
  }
})
