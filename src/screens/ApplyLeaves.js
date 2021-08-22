import React, {useState} from 'react'
import Calendar from 'react-calendar'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet, Button} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'

export default function ApplyLeaves({ navigation }) {
  // const [selectedValue, setSelectedValue] = useState("Sick Leave");
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
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('AnnualLeaves')}></FontAwesome5Icon>
          <Text> Approved </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text> </Text>
          <FontAwesome5Icon name= "plus-circle" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <View style ={styles.leaveContainer}>
        {/* <Calendar/> */}
      <Text style={styles.header}>Leave Apply Form</Text> 
      <TextInput style={styles.InputField} placeholder="Med Rep ID" />

      <Picker>
        {/* selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} */}

            <Picker.Item label="Sick leave" value="1" />
            <Picker.Item label="Personal" value="2" />
            <Picker.Item label="Unpaid" value="3" />
            <Picker.Item label="Paid" value="4" />
      </Picker>

      {/* <DatePicker
                style={styles.InputField}
                // date={this.state.date}
                mode="date"
                placeholder="Start Date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    // position: 'absolute',
                    left: 50,
                    // right : 0,
                    // top: 4,
                    // marginLeft: 30,
                    // marginRight : 36,
                },
                dateInput: {
                    // marginLeft: 36
                    borderColor: "#B0B0B000",
                }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />
      <DatePicker
                style={styles.InputField}
                // date={this.state.date}
                mode="date"
                placeholder="End Date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    // position: 'absolute',
                    left: 50,
                    // right : 0,
                    // top: 4,
                    // marginLeft: 30,
                    // marginRight : 36,
                },
                dateInput: {
                    // marginLeft: 36
                    borderColor: "#B0B0B000",
                }
              }}
                onDateChange={(date) => {this.setState({date: date})}}
            /> */}

            
      <TextInput style={styles.description} placeholder="Description"/>
      {/* <TextInput style={styles.description} placeholder="Sales Manager's comments" /> */}
        <View style = {styles.sameRow}>
        <Button
          color = '#0A6466'
          title = 'submit'
          onPress={() => { alert('Applied') }}>Apply</Button>
        <Button
          color = '#0A6466'
          title = 'cancel'
          onPress={() => { alert('Cancelled') }}>Cancel</Button>

      </View>


      {/* <View style={{borderBottomColor : 'black', borderBottomWidth : 1,  marginBottom : 15, }}></View> */}
      </View>

      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  header : {
    fontSize : 20,
    fontWeight : 'bold',
    alignSelf : 'center',
    marginBottom : 30,
    color : theme.colors.primary
    
},
  leaveContainer : {
    flex : 1,
    width : '100%',
    minHeight : 300,
    // margin : 20,
    padding: 15,
    backgroundColor : '#E5E5E5',
    borderRadius : 5,

  },
  InputField : {
    alignSelf : 'stretch',
    height : 35,
    marginBottom : 25,
    borderBottomColor : '#009387',
    borderBottomWidth : 1,
    fontSize : 16,
    
},
  description : {
    height : 100,
    borderColor : '#0A6466',
    borderWidth : 1,
    marginBottom : 30,
    padding : 20
},
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
})