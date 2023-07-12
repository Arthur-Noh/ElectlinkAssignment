import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabDef, AppTabParamList } from './routeDef';
import { observer } from 'mobx-react';
// 바텀 탭 이미지
import BoldVerticalImage from '../assets/bottomTab/boldVertical.png';
import BoldHorizonImage from '../assets/bottomTab/boldHorizon.png';
import BoldAnimationImage from '../assets/bottomTab/boldAnimation.png';
import VerticalImage from '../assets/bottomTab/vertical.png';
import HorizonImage from '../assets/bottomTab/horizon.png';
import AnimationImage from '../assets/bottomTab/animation.png';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';
import { scaler } from '../helpers/scaler';
import { Palette } from '../theme/styles/palette';

const BottomIcon = styled.Image`
width: ${scaler(30)}px;
height: ${scaler(30)}px;
`;

const BottomTab = createBottomTabNavigator<AppTabParamList>(); 

const AppBottomTab = observer(() => {
    const tabName = useCallback((name: string) => {
        switch (name) {
            case 'Vertical':
                return '세로';
            case 'Horizon':
                return '가로';
            case 'Action':
                return '애니메이션';
            default:
                return name;
        }
    }, []);

    return (
        <BottomTab.Navigator
            initialRouteName='Vertical'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource: ImageSourcePropType = VerticalImage;
                    switch (route.name) {
                        // @ts-ignore
                        case '세로':
                            iconSource = focused ? BoldVerticalImage : VerticalImage;
                            break;
                        // @ts-ignore
                        case '가로':
                            iconSource = focused ? BoldHorizonImage : HorizonImage;
                            break;
                        // @ts-ignore
                        case '애니메이션':
                            iconSource = focused ? BoldAnimationImage : AnimationImage;
                            break;
                    }
                    return (
                        <BottomIcon source={iconSource} />
                    );
                },
                tabBarActiveTintColor: Palette.black[100],
                tabBarInactiveTintColor: Palette.gray[300],
            })}
        >
            { Object.entries({ ...AppTabDef }).map(([ name, { initialParams, component } ]) => (
                <BottomTab.Screen
                    key={name}
                    // @ts-ignore
                    name={tabName(name)}
                    component={component}
                    initialParams={initialParams}
                />
            ))}
        </BottomTab.Navigator>
    );
});

export default AppBottomTab;