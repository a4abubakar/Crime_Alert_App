import React from 'react';
import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Picker, ScrollView } from 'react-native';
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
      email: "", password: "", firstname: "", lastname: "", bloodGrp: "Select Blood Group", urgencyApi: []
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
  register() {
    const { email, password, firstname, lastname, bloodGrp } = this.state;
    fetch('https://blood-bank-app-5262.herokuapp.com/users/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ firstname, lastname, email, password, bloodGrp })
    })
      .then((res) => {
        res.json()
          .then(res => {
            if (res.result == "Registered Successfully!") {
              this.props.navigation.navigate("Login")
            }
            else {
              Alert.alert('Same username exists')
            }
          })
      }
      )
    // await AsyncStorage.setItem("User", name)
    this.setState({ firstname: "", lastname: "", email: "", password: "", bloodGrp: "" })
  }
  render() {
    // console.log("Urgencys==>", this.state.urgencyApi)
    this.state.urgencyApi.map((e) => {
      console.log(e)
    })
    const { navigate } = this.props.navigation
    return (
      <ImageBackground source={require('../../assets/b1.png')} style={styles.image}>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
          {/* <View style={styles.container}> */}
          <Avatar.Image size={110} source={require('../../assets/b2.png')} />
          <Text style={styles.heading}>Blood Donation System</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              label='Fistname'
              onChangeText={(text) => this.setState({ firstname: text })}
              value={this.state.firstname}
            />
            <TextInput
              style={styles.input}
              label='Lastname'
              onChangeText={(text) => this.setState({ lastname: text })}
              value={this.state.lastname}
            />
            <TextInput
              style={styles.input}
              label='Email'
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
            />
            <Picker
              style={{ backgroundColor: "white", width: 302, margin: 10 }}
              selectedValue={this.state.bloodGrp}
              onValueChange={(text) => { this.setState({ bloodGrp: text }) }}>
              {/* {
                this.state.urgencyApi.map((items) => {
                  <Picker.Item label={items} value={items} />
                })
              } */}
              <Picker.Item label="A Positive" value="A Positive" />
              <Picker.Item label="B Positive" value="B Positive" />
              <Picker.Item label="O Positive" value="O Positive" />
              <Picker.Item label="A Negative" value="A Negative" />
              <Picker.Item label="B Negative" value="B Negative" />
              <Picker.Item label="O Negative" value="O Negative" />
            </Picker>
            <TextInput
              style={styles.input}
              label='Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />
            <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }} onPress={() => navigate("Login")} >Already Have an Account</Text>
            <Button mode="contained" style={{ marginLeft: 85, width: 150, backgroundColor: "#0084ff" }} onPress={() => this.register()}>
              Sign Up
              </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground >
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