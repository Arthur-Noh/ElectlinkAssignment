import Vertical from '../pages/vertical';
import Horizon from '../pages/horizon';
import Action from '../pages/action';

// 세로 무한 스크롤 페이지
const VerticalScreens = {
    Vertical: {
        initialParams: {},
        component: Vertical,
    },
};

// 가로 무한 스크롤 페이지
const HorizonScreens = {
    Horizon: {
        initialParams: {},
        component: Horizon,
    },
};

// 애니메이션 페이지
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