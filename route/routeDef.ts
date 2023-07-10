import Home from '../pages/home';
import Tab1 from '../pages/tab1';
import Tab2 from '../pages/tab2';

// Home
const HomeScreens = {
    Home: {
        initialParams: {},
        component: Home,
    },
};

// Tab1
const Tab1Screens = {
    Tab1: {
        initialParams: {},
        component: Tab1,
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
    Home: defaultParam,

    Tab1: defaultParam,

    Tab2: defaultParam,
};

export const AppTabDef = {
    ...HomeScreens,
    ...Tab1Screens,
    ...Tab2Screens,
};