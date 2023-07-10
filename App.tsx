import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/home';
import AppScreen from './route/appScreen';

const App = () => {
    return (
        <NavigationContainer>
            <AppScreen />
        </NavigationContainer>
    );
};

export default App;
