import React, {useState} from 'react'
import Calendar from 'react-calendar'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet, Button} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import ImagePicker from 'react-native-image-crop-picker';

export default function Profile({ navigation }) {
  // const [selectedValue, setSelectedValue] = useState("Sick Leave");
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

      <View style ={styles.profileContainer}>
      <Text style={styles.header}>Edit Profile</Text> 
      <TextInput style={styles.InputField} placeholder="Name"  />
      
      <FontAwesome5Icon name="briefcase" color={theme.colors.primary} size={20} > Upload Picture</FontAwesome5Icon>
        <Picker>
            {/* selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} */}

            <Picker.Item label="Male" value="1" />
            <Picker.Item label="Female" value="2" />
            <Picker.Item label="Not-specified" value="3" />
        </Picker>
        <TextInput style={styles.InputField} placeholder="Email" />
        <TextInput style={styles.InputField} placeholder="Area" />
        <View style = {styles.sameRow}>
            <Button color = '#0A6466' title = 'submit' onPress={() => { alert('Updated') }}>Apply</Button>
            <Button color = '#0A6466' title = 'cancel' onPress={() => { alert('Cancelled') }}>Cancel</Button>
        </View>
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
  profileContainer : {
    flex : 1,
    width : '100%',
    height : '100%',
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
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
  editProfileButton :{

},
})
