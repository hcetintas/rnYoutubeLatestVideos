/* eslint-disable prettier/prettier */
//import liraries
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components';
import Theme from './materials/theme';
import TabBar from './components/tab-bar';
import MapScreen from './views/map';
import VideosScreen from './views/videos';
const Tab = createBottomTabNavigator();

// create a component
const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Videos" tabBar={props => <TabBar {...props} />}>
                    <Tab.Screen name="Map" component={MapScreen} />
                    <Tab.Screen name="Videos" component={VideosScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

// define your styles


//make this component available to the app
export default App;
