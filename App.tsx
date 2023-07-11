import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppScreen from './route/appScreen';
import useLaunchingScreen from './hooks/useLaunchingScreen';
import { observer } from 'mobx-react';

const App = observer(() => {
    useLaunchingScreen();

    return (
        <NavigationContainer>
            <AppScreen />
        </NavigationContainer>
    );
});

export default App;
