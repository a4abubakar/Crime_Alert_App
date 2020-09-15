import React from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { ScrollView } from 'react-native'
import { Appbar } from 'react-native-paper';
import Styles from './Styles'
import { YellowBox, AsyncStorage } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
export default class Home extends React.Component {
    constructor() {
        super()
        // this.showBloodPosts = this.showBloodPosts.bind(this)
        this.state = {
            userData: "",
            firstname: "",
            lastname: ""
        }
    }
    async componentDidMount() {
        const firstname = await AsyncStorage.getItem("firstname")
        const lastname = await AsyncStorage.getItem("lastname")

        fetch(`https://blood-bank-app-5262.herokuapp.com/postBlood/getBloodUsers`)
            .then(res => res.json())
            .then(data => {
                this.setState({ userData: data, firstname, lastname })
                // console.log(data.result)
            })

    }
    static navigationOptions = {
        drawerLabel: "Home",
    };
    render() {
        // console.log(this.state.userData)
        const { navigate } = this.props.navigation
        return (
            // this.showBloodPosts()
            <ScrollView>
                {/* <Appbar.Header>
                    <Appbar.Action icon="archive" onPress={() => navigate("MyDrawerNavigator")} />
                    <Appbar.Content
                        style={{ alignItems: "center" }}
                        title="Feed"
                    />
                </Appbar.Header> */}
                <Content>
                    {
                        !!this.state.userData.result && this.state.userData.result.map((data) => {
                            return (
                                <Card key={data._id}>
                                    <CardItem header>
                                        <Text>{data.name}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>
                                                {data.units} units of {data.bloodGrp} blood required at {data.hospital} for my {data.relation}
                                            </Text>
                                            <Text>Urgency: {data.urgency}</Text>
                                            <Text>Contact At {data.number}</Text>
                                            <Text>Additional Information</Text>
                                            <Text>{data.info}</Text>
                                            <Text>Volunteer Uptlill Now: {data.volunteers}</Text>
                                            <Text>Current Requirment: {data.units}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Text style={Styles.buttonContainer}>Volunteer</Text>
                                        <Text style={Styles.buttonContainer}>Comment</Text>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }
                </Content>
            </ScrollView>
        )
    }
}