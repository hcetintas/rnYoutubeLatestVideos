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
import { useReducer } from 'react';
const Tab = createBottomTabNavigator();

export const PositionContext = React.createContext();


//initial state for videos and map
const initialState = {
    lat: 41.09976790255183,
    long: 28.244213797152042,
    code: 'TR',
    name: 'Türkiye',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
        default:
            break;
    }
};


// create a component
const App = () => {
    const [position, dispatch] = useReducer(reducer, initialState);
    return (
        <PositionContext.Provider value={{ positionState: position, positionDispacth: dispatch }}>
            <ThemeProvider theme={Theme}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName="Videos" tabBar={props => <TabBar {...props} />}>
                        <Tab.Screen name="Map" component={MapScreen} />
                        <Tab.Screen name="Videos" component={VideosScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </PositionContext.Provider>
    );
};

// define your styles


//make this component available to the app
export default App;
