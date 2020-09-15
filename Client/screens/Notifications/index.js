import React from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base'; 4
import {ScrollView} from 'react-native'
import { Appbar } from 'react-native-paper';
import Styles from './Styles'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
export default class Home extends React.Component {
    static navigationOptions = {
        drawerLabel : "Notifications"
    };

    render() {
        return (
            <ScrollView>
                {/* <Appbar.Header>
                    <Appbar.Content
                        style={{ alignItems: "center" }}
                        title="Notifications"
                    />
                </Appbar.Header> */}
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Zeeshan Hanif</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    3 units of A positive blood required at indus  Hospital for my friend
                    </Text>
                                <Text>Urgency: Urngent</Text>
                                <Text>Contact At 0400000</Text>
                                <Text>Additional Information</Text>
                                <Text>Call me when you reach the hospital</Text>
                                <Text>Volunteer Uptlill Now: 5</Text>
                                <Text>Current Requirment: 2</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text style={Styles.buttonContainer}>Volunteer</Text>
                            <Text style={Styles.buttonContainer}>Comment</Text>
                        </CardItem>
                    </Card>
                </Content>
            </ScrollView>
        )
    }
}