/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from 'react';
import Button from '../components/button';
import Box from '../components/box';
import Colors from '../materials/colors';
import { Youtube, Map } from '../components/icons';

function TabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <Box flexDirection="row" justifyContent="center" alignItems="center" bg={Colors.white}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return label === 'Map' ? (
                        <Button
                            key={index}
                            alignItems="center"
                            flex={1}
                            size={56}
                            bg={Colors.white}
                            onPress={onPress} >
                            <Map color={isFocused ? Colors.red : Colors.gray} />
                        </Button>
                    ) : (
                            < Button
                                alignItems="center"
                                key={index}
                                height={56}
                                flex={1}
                                onPress={onPress} >
                                <Youtube color={isFocused ? Colors.red : Colors.gray} />
                            </Button>
                        );
                })
            }
        </Box >
    );
}
export default TabBar;