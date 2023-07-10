import React from 'react';
import { SafeAreaView } from 'react-native';
import AppBottomTab from './appBottomTab';

const AppScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppBottomTab />
        </SafeAreaView>
    );
};

export default AppScreen;