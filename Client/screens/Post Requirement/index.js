import React from 'react';
import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Picker, ScrollView, AsyncStorage } from 'react-native';
import { TextInput, Appbar, Button, Card, List, Title, Avatar } from 'react-native-paper';
import { Container, Header, Content, Textarea, Form } from "native-base";
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
export default class PostRequirement extends React.Component {
    static navigationOptions = {
        drawerLabel: "Post Requirement",
    };
    constructor(props) {
        super(props);
        this.state = {
            bloodGrp: "A Positive", units: null, urgency: "Urgent", country: "Pakistan", state: "Sindh", city: "Karachi", hospital: "Indus Hospital", relation: "Father", number: null, info: ""
        }
    }
    // componentDidMount() {
    //   const urgencys = []
    //   fetch("https://blood-bank-app-5262.herokuapp.com/staticData/getUrgencys")
    //     .then(res => res.json())
    //     .then(data => {
    //       data.result.map((e) => {
    //         // console.log("data==>", e.urgency)
    //         urgencys.push(e.urgency)
    //         this.setState({ urgencyApi: urgencys })
    //       })
    //     })
    // }
    //   register() {
    //     const { email, password, firstname, lastname, bloodGrp } = this.state;
    //     fetch('https://blood-bank-app-5262.herokuapp.com/users/register', {
    //       method: 'POST',
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body: JSON.stringify({ firstname, lastname, email, password, bloodGrp })
    //     })
    //       .then((res) => {
    //         res.json()
    //           .then(res => {
    //             if (res.result == "Registered Successfully!") {
    //               this.props.navigation.navigate("Login")
    //             }
    //             else {
    //               Alert.alert('Same username exists')
    //             }
    //           })
    //       }
    //       )
    //     // await AsyncStorage.setItem("User", name)
    //     this.setState({ firstname: "", lastname: "", email: "", password: "", bloodGrp: "" })
    //   }
    async postBlood() {
        const userid = await AsyncStorage.getItem("userid")
        const email = await AsyncStorage.getItem("email")
        const firstname = await AsyncStorage.getItem("firstname")
        const lastname = await AsyncStorage.getItem("lastname")
        const name = firstname + " " + lastname
        const volunteers = 0
        const { bloodGrp, units, urgency, country, city, state, hospital, relation, number, info } = this.state;
        console.log(userid, bloodGrp, units, urgency, country, city, state, hospital, relation, number, info)
        fetch('https://blood-bank-app-5262.herokuapp.com/postBlood/postBloodUsers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userid, name, email, bloodGrp, units, urgency, country, state, city, volunteers, hospital, relation, number, info })
        })
            .then((res) => {
                res.json()
                    .then(res => {
                        if (res.message == "Blood added successfully") {
                            Alert.alert('Requirement Posted Successfully')
                        }
                    })
            }
            )
        // // await AsyncStorage.setItem("User", name)
        this.setState({ bloodGrp: "", units: null, urgency: "", country: "", city: "", state: "", hospital: "", relation: "", number: null, info: "" })
    }

    render() {
        // console.log("Urgencys==>", this.state.urgencyApi)
        // this.state.urgencyApi.map((e) => {
        //   console.log(e)
        // })
        const { navigate } = this.props.navigation
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container} >
                <ScrollView>
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.bloodGrp}
                        onValueChange={(text) => { this.setState({ bloodGrp: text }) }}>
                        <Picker.Item label="A Positive" value="A Positive" />
                        <Picker.Item label="B Positive" value="B Positive" />
                        <Picker.Item label="O Positive" value="O Positive" />
                        <Picker.Item label="A Negative" value="A Negative" />
                        <Picker.Item label="B Negative" value="B Negative" />
                        <Picker.Item label="O Negative" value="O Negative" />
                    </Picker>
                    <TextInput
                        style={styles.input}
                        label='No. of Units Required'
                        onChangeText={(text) => this.setState({ units: text })}
                        value={this.state.units
                        }
                    />
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.urgency}
                        onValueChange={(text) => { this.setState({ urgency: text }) }}>
                        <Picker.Item label="Urgent" value="Urgent" />
                        <Picker.Item label="Within 5 hours" value="Within 5 hours" />
                        <Picker.Item label="Within 12 hours" value="Within 12 hours" />
                        <Picker.Item label="Within 24 hours" value="Within 24 hours" />
                        <Picker.Item label="Within 2 days" value="Within 2 days" />
                        <Picker.Item label="Within week" value="Within week" />
                    </Picker>
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.country}
                        onValueChange={(text) => { this.setState({ country: text }) }}>
                        <Picker.Item label="Pakistan" value="Pakistan" />
                    </Picker>
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.state}
                        onValueChange={(text) => { this.setState({ state: text }) }}>
                        <Picker.Item label="Sindh" value="Sindh" />
                        <Picker.Item label="Punjab" value="Punjab" />
                        <Picker.Item label="Balochistan" value="Balochistan" />
                        <Picker.Item label="KPK" value="KPK" />
                    </Picker>
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.city}
                        onValueChange={(text) => { this.setState({ city: text }) }}>
                        <Picker.Item label="Karachi" value="Karachi" />
                        <Picker.Item label="Lahore" value="Lahore" />
                        <Picker.Item label="Islamabad" value="Islamabad" />
                        <Picker.Item label="Quetta" value="Quetta" />
                        <Picker.Item label="Peshawar" value="Peshawar" />
                    </Picker>
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.hospital}
                        onValueChange={(text) => { this.setState({ hospital: text }) }}>
                        <Picker.Item label="Indus Hospital" value="Indus Hospital" />
                        <Picker.Item label="Ziauddin Hospital" value=" Ziauddin Hospital" />
                        <Picker.Item label="Agha Khan Hospital" value="Agha Khan Hospital" />
                        <Picker.Item label="Liaquat National Hospital" value="Liaquat National Hospital" />
                        <Picker.Item label="OMI" value="OMI" />
                        <Picker.Item label="Jinnah Hospital" value="Jinnah Hospital" />
                        <Picker.Item label="Holy Family Hospital" value="Holy Family Hospital" />
                    </Picker>
                    <Picker
                        style={{ backgroundColor: "#ededed", width: 302, margin: 10 }}
                        selectedValue={this.state.relation}
                        onValueChange={(text) => { this.setState({ relation: text }) }}>
                        <Picker.Item label="Father" value="Father" />
                        <Picker.Item label="Mother" value="Mother" />
                        <Picker.Item label="Son" value="Son" />
                        <Picker.Item label="Daughter" value="Daughter" />
                        <Picker.Item label="Aunt" value="Aunt" />
                        <Picker.Item label="Uncle" value="Uncle" />
                        <Picker.Item label="Nephew" value="Nephew" />
                        <Picker.Item label="Niece" value="Niece" />
                        <Picker.Item label="Friend" value="Friend" />
                        <Picker.Item label="Neighbour" value="Neighbour" />
                        <Picker.Item label="None" value="None" />
                    </Picker>
                    <TextInput
                        style={styles.input}
                        label='Contact Number'
                        onChangeText={(text) => this.setState({ number: text })}
                        value={this.state.number}
                    />
                    <Textarea
                        rowSpan={4}
                        bordered
                        placeholder="Additional Instructions"
                        style={styles.input}
                        onChangeText={(text) => this.setState({ info: text })}
                        value={this.state.info}
                    />
                    <Button mode="contained" style={{ marginLeft: 85, width: 150, backgroundColor: "#0084ff" }} onPress={() => this.postBlood()}>
                        Post
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
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
    textarea: {
        width: 300,
        height: 70,
        margin: 10,
        fontSize: 18,
        backgroundColor: "#ededed"
    },
    heading: {
        fontSize: 30,
        marginBottom: 30,
        color: "white"
    },
})