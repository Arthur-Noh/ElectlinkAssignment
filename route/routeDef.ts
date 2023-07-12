import Vertical from '../pages/vertical';
import Horizon from '../pages/horizon';
import Action from '../pages/action';

// Home
const VerticalScreens = {
    Vertical: {
        initialParams: {},
        component: Vertical,
    },
};

// Tab1
const HorizonScreens = {
    Horizon: {
        initialParams: {},
        component: Horizon,
    },
};

// Tab2
const ActionScreens = {
    Action: {
        initialParams: {},
        component: Action,
    },
};

type defaultParam = {
    defaultValue?: string,
};

export type AppTabParamList = {
    Vertical: defaultParam,

    Horizon: defaultParam,

    Action: defaultParam,
};

export const AppTabDef = {
    ...VerticalScreens,
    ...HorizonScreens,
    ...ActionScreens,
};