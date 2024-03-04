import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './../screens/Login.jsx';
import Signup from './../screens/Signup.jsx';
import Welcome from './../screens/Welcome.jsx';

import { Colors } from './../components/styles.js';

const Stack = createNativeStackNavigator();
const { primary, tertiary } = Colors;

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStlye: {
                        paddingLeft: 20
                    } 
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome}/>
            </Stack.Navigator>
        </NavigationContainer>
    )   
}

export default RootStack;