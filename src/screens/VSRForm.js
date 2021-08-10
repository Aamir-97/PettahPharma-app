import React, {useState} from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import DatePicker from 'react-native-datepicker'


export default function VSRForm ({navigation}){

    return (
        <ScrollView>
            <View style={styles.visitSummaryForm}>
            <Text style={styles.header}>This is the Report Form page</Text> 
            <Picker
                style={styles.InputField}
            >
            <Picker.Item label="Visit type" value="" />
            <Picker.Item label="Ragular" value="Ragular" />
            <Picker.Item label="Promotion Visit" value="Promotion Visit" />
            <Picker.Item label="Appoinment" value="Appoinment" />
            </Picker>

            <TextInput style={styles.InputField} placeholder="Location" />

            <Picker
                style={styles.InputField} 
            >
            <Picker.Item label="Name of the Doctor" value="" />
            <Picker.Item label="Ragular" value="Ragular" />
            <Picker.Item label="Promotion Visit" value="Promotion Visit" />
            <Picker.Item label="Appoinment" value="Appoinment" />
            </Picker>

            <DatePicker
                style={styles.InputField}
                // date={this.state.date}
                mode="date"
                placeholder="Date of visit"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />





            </View>
           
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    header : {
        fontSize : 20,
        fontWeight : 'bold',
        alignSelf : 'center',
        marginBottom : 30,
        
    },
    visitSummaryForm : {
        alignSelf : 'stretch',
        margin : 20,
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
})