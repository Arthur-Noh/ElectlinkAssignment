import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppScreen from './route/appScreen';
import useLaunchingScreen from './hooks/useLaunchingScreen';

const App = () => {
    useLaunchingScreen();

    return (
        <NavigationContainer>
            <AppScreen />
        </NavigationContainer>
    );
};

export default App;
