import Vertical from '../pages/vertical';
import Horizon from '../pages/horizon';
import Tab2 from '../pages/tab2';

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
const Tab2Screens = {
    Tab2: {
        initialParams: {},
        component: Tab2,
    },
};

type defaultParam = {
    defaultValue?: string,
};

export type AppTabParamList = {
    Vertical: defaultParam,

    Horizon: defaultParam,

    Tab2: defaultParam,
};

export const AppTabDef = {
    ...VerticalScreens,
    ...HorizonScreens,
    ...Tab2Screens,
};