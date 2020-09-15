import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { View, StyleSheet, ScrollView, Image, AsyncStorage } from "react-native";
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Container, Content, Icon, Header, Body, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import * as Routes from '../screens/index'

const RegisterNavigator = createSwitchNavigator({
    Registration: Routes.Registration,
})
const LoginNavigator = createSwitchNavigator({
    Login: Routes.Login
})
const HomeNavigator = createSwitchNavigator({
    Home: Routes.Home
})
console.log(AsyncStorage.getItem("firstname"))
// const CustomDrawerContentComponent = (props) => (
class CustomDrawerContentComponent extends Component {
    state = {
        firstname: "",
        lastname: "",
        bloodGrp: ""
    }
    async componentDidMount() {
        const firstname = await AsyncStorage.getItem("firstname")
        const lastname = await AsyncStorage.getItem("lastname")
        const bloodGrp = await AsyncStorage.getItem("bloodGrp")
        this.setState({ firstname, lastname, bloodGrp })
    }
    render() {
        return (
            <Container>
                <Header style={styles.drawerHeader}>
                    <Body>
                        <Text>{this.state.firstname + " " + this.state.lastname}</Text>
                        <Text>Blood Group : {this.state.bloodGrp}</Text>
                    </Body>
                </Header>
                <Content>
                    <DrawerItems {...this.props} />
                </Content>

            </Container>
        )
    }
}


// );
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 50,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }

})


const MyDrawerNavigator = createDrawerNavigator({
    Home: Routes.Home,
    PostRequirements: Routes.PostRequirements,
    Notifications: Routes.Notifications
},
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
)
const MyStackNavigator = createStackNavigator({
    defaulthome: MyDrawerNavigator
},
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                title: "Blood Bank",
                headerLeft: <Ionicons style={{ marginLeft: 10 }} name="md-menu" size={32} color="white" onPress={() => navigation.toggleDrawer()} />,
                headerStyle: {
                    backgroundColor: "#f4511e"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }
        }
    }
)

const MainNavigator = createSwitchNavigator({
    Registration: RegisterNavigator,
    Login: LoginNavigator,
    Home: MyStackNavigator,
})

export default createAppContainer(MainNavigator)