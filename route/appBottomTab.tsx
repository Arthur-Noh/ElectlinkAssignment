import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabDef, AppTabParamList } from './routeDef';

const BottomTab = createBottomTabNavigator<AppTabParamList>(); 

const AppBottomTab = () => {
    return (
        <BottomTab.Navigator initialRouteName='Home'>
            { Object.entries({ ...AppTabDef }).map(([ name, { initialParams, component } ]) => (
                <BottomTab.Screen
                    key={name}
                    // @ts-ignore
                    name={name}
                    component={component}
                    initialParams={initialParams}
                />
            ))}
        </BottomTab.Navigator>
    );
};

export default AppBottomTab;