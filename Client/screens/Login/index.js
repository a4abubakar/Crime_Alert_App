import React from 'react';
import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Picker, AsyncStorage } from 'react-native';
import { TextInput, Appbar, Button, Card, List, Title, Avatar } from 'react-native-paper';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
// import { signup } from '../config/firebase'
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "", password: "", name: "", firstname: "", lastname: "", bloodGrp: ""
        }
    }
    async login() {
        // f, l, b;
        var arr = []
        const { email, password } = this.state;
        fetch('https://blood-bank-app-5262.herokuapp.com/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                res.json()
                    .then(res => {
                        if (res.token) {
                            this.props.navigation.navigate("Home")
                            var userid = res._id
                            var email = res.email
                            var firstname = res.firstname
                            var lastname = res.lastname
                            var bloodGrp = res.bloodGrp
                            AsyncStorage.setItem("userid", userid)
                            AsyncStorage.setItem("email", email)
                            AsyncStorage.setItem("firstname", firstname)
                            AsyncStorage.setItem("lastname", lastname)
                            AsyncStorage.setItem("bloodGrp", bloodGrp)
                        }
                        // console.log(firstname, lastname, bloodGrp)
                        // arr.push(firstname, lastname, bloodGrp)

                        // if (res.result == "Registered Successfully!") {
                        //     this.props.navigation.navigate("Login")
                        // }
                        // else {
                        //     Alert.alert('Same username exists')
                        // }
                    })
            }
            )
        // console.log(arr)
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground source={require('../../assets/b1.png')} style={styles.image}>
                <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
                    {/* <View style={styles.container}> */}
                    <Avatar.Image size={110} source={require('../../assets/b2.png')} />
                    <Text style={styles.heading}>Blood Donation System</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            label='Email'
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                        />
                        <TextInput
                            style={styles.input}
                            label='Password'
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                        />
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }} onPress={() => navigate("Registration")} >Create an Account</Text>
                        <Button mode="contained" style={{ marginLeft: 85, width: 150, backgroundColor: "#0084ff" }} onPress={() => this.login()}>
                            Sign In
                    </Button>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%', height: '100%'
    },
    input: {
        width: 300,
        height: 55,
        // backgroundColor: 'red',
        // color: "white",
        margin: 10,
        fontSize: 18,
    },
    heading: {
        fontSize: 30,
        marginBottom: 30,
        color: "white"
    },
})