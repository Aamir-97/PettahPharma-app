import React, { Component } from 'react';
import { StyleSheet, Text, Image, View,
    TouchableOpacity, Vibration, TextInput,    
} from 'react-native';

class TestHome extends Component {

    constructor(){
        super();
        this.state={
            name :'',
            email : ''
        }
    }

    updateValue(text,field){
        // console.warn(text);
        if (field == 'name'){
            this.setState ( {
                name:text,
            })
        }
        else if (field == 'email'){
            this.setState({
                email : text,
            })
        }
    }

        submit(){
            let collection = {}
            collection.name = this.state.name,
            collection.email = this.state.email,
            

            console.log(collection.name);
        }



    render() {
        return (
            <View style={style.container}>
                <TextInput placeholder='Name' 
                style={style.input}
                onChangeText= {(text) => this.updateValue(text, 'name')}
                
                />
                <TextInput placeholder='Email' 
                style={style.input}
                onChangeText= {(text) => this.updateValue(text, 'email')}
                
                />
                <TouchableOpacity
                onPress= {() => this.submit()}
                >
                    <Text style={style.button}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const style= StyleSheet.create({
    container : {
        backgroundColor: '#f5fcff',
        flex : 1,
        justifyContent : 'center',
        padding: 20
    },
    input : {
        borderBottomColor : "#000",
        borderBottomWidth : 2,
        marginBottom : 12

    },
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        textAlign : 'center',
        backgroundColor: 'skyblue',
        height : 40,


    }
})


export default TestHome;