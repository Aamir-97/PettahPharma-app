import React, {useState} from 'react'
import Calendar from 'react-calendar'
import { Text, View, Picker, SafeAreaView, ScrollView,TextInput, StyleSheet, Button} from 'react-native'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import BackgroundLayout from '../components/BackgroundLayout'
import ImagePicker from 'react-native-image-crop-picker';

export default function Profile({ navigation }) {
  // const [selectedValue, setSelectedValue] = useState("Sick Leave");
  const [name , setName] = React.useState('');
  const [gender , setGender] = React.useState('');
  const [area , setArea] = React.useState('');
  const [email , setEmail] = React.useState('');
  
  const saveDetails = () => { 
    axios.post("http://10.0.2.2:3001/claimexpenses", {
      name: name, 
      expense_Type: expense_Type,
      gender : gender, 
      area: area, 
      email: email, 
    }).then(()=>{
        console.log(expense_ID);
        console.log("Succesfully Inserted:!");
        Alert.alert(
            "Database",
            "  Edited the profile...!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancelled"),
                style: "cancel"
              },
              { text: "Submit", onPress: () => console.log("Submitted") }
            ]
          );
    })

};
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>

      <View style ={styles.profileContainer}>
      <Text style={styles.header}>Edit Profile</Text> 
      <TextInput style={styles.InputField} placeholder="Name" onChangeText={(val) => setName(val)} value={name} />
      
      <FontAwesome5Icon name="briefcase" color={theme.colors.primary} size={20} > Upload Picture</FontAwesome5Icon>
        <Picker>
            gender={gender}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}

            <Picker.Item label="Male" value="1" />
            <Picker.Item label="Female" value="2" />
            <Picker.Item label="Not-specified" value="3" />
        </Picker>
        <TextInput style={styles.InputField} placeholder="Email"  onChangeText={(val) => setEmail(val)}
                    value={email}/>
        <TextInput style={styles.InputField} placeholder="Area"  onChangeText={(val) => setArea(val)}
                    value={area}/>
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
