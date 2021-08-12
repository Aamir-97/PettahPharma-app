import React, {useState} from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Picker, Button} from 'react-native';
import DatePicker from 'react-native-datepicker'
import NumericInput from 'react-native-numeric-input'
import BackgroundLayout from '../components/BackgroundLayout';
import { theme } from '../core/theme';


export default function AddNewDoctor ({navigation}){

    return (
        <ScrollView>
            <BackgroundLayout>

            <Text style={styles.header}>Enter the Doctor Details</Text> 

            {/* VSRForm */}

            <View style={styles.visitSummaryForm}>
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
            <Picker.Item label="Aamir" value="Ragular" />
            <Picker.Item label="Madhu" value="Promotion Visit" />
            <Picker.Item label="Thulasi" value="Appoinment" />
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

            <View style={styles.sameRow}>
                <TextInput style={styles.InputField} placeholder="TimeIn" />
                <TextInput style={styles.InputField} placeholder="TimeOut" />
            </View>

            <View style={styles.InputField}>
            <Picker>
            <Picker.Item label="Sample Medicine" value="" />
            <Picker.Item label="Penadol" value="Ragular" />
            <Picker.Item label="Cough Syrup" value="Promotion Visit" />
            <Picker.Item label="Balm" value="Appoinment" />
            </Picker>
            </View>

            <View style ={styles.sameRow}> 
            <Text style = {{ fontSize : 16}}> No. Of Sample : </Text>


            <NumericInput 
            // value={this.state.value} 
            // onChange={value => this.setState({value})} 
            // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={150} 
            totalHeight={40} 
            iconSize={25}
            // step={1.5}
            minValue = {0}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'black' }}
            // rightButtonBackgroundColor='#EA3788' 
            // leftButtonBackgroundColor='#E56B70'
            />
            
            </View>

            <TextInput style={styles.CommentField} placeholder="Comments" />

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
        // margin : 20,
        padding : 20,
        borderColor : theme.colors.primary,
        borderWidth : 2,
        borderRadius : 5
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
        // alignSelf : 'center',
        justifyContent : 'space-between'
    },
    CommentField : {
        height : 100,
        borderColor : '#0A6466',
        borderWidth : 1,
        marginBottom : 30,
        marginTop : 30,
        padding : 20,
    }

})