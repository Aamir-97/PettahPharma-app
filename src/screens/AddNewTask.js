import React from 'react'
import { Text, ScrollView, Picker , View, StyleSheet, TextInput, Button} from 'react-native'
import BackgroundLayout from '../components/BackgroundLayout'
import DatePicker from 'react-native-datepicker'
import NumericInput from 'react-native-numeric-input'
import { theme } from '../core/theme'


export default function AddNewTask({navigation}){
    return (
        <ScrollView>
            <BackgroundLayout>
            <View style={styles.visitSummaryForm}>
            <Text style={styles.header}>Add new Shedule</Text> 

            <TextInput style={styles.InputField} placeholder="Title" />

            <TextInput style={styles.InputField} placeholder="Location" />

            <DatePicker
                style={styles.InputField}
                // date={this.state.date}
                mode="date"
                placeholder="Date"
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
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />

            <Picker>
            <Picker.Item label="Session" value="" />
            <Picker.Item label="Morning" value="Ragular" />
            <Picker.Item label="Evening" value="Promotion Visit" />
            <Picker.Item label="Fullday" value="Appoinment" />
            </Picker>

            <TextInput style={styles.CommentField} placeholder="Discription" />

            <View style={styles.sameRow}>
                <Button title="Cancel" 
                color = {theme.colors.primary}
                />
                <Button title="Submit"      
                color = {theme.colors.primary}           
                />


            </View>
    



            





            </View>
            </BackgroundLayout>  
        </ScrollView>
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
    visitSummaryForm : {
        alignSelf : 'stretch',
        padding : 20,
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
    },
    CommentField : {
        height : 100,
        borderColor : '#0A6466',
        borderWidth : 1,
        marginBottom : 30,
        padding : 20
    }

})