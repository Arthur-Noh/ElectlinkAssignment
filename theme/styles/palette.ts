export interface IWhite {
    base: string;
}

export interface IBlack {
    base: string;
}

export interface IGray {
    base: string;
    100: string;
    200: string;
}

export interface IPrimary {
    base: string;
    100: string;
}

export const white: IWhite = {
    base: '#ffffff',
};

export const black: IBlack = {
    base: '#0E0D0F',
};

export const gray: IGray = {
    base: '#8D8F91',
    200: '#C1C3C9',
    100: '#F1F2F3',
};

export const primary: IPrimary = {
    base: '#564F97',
    100: '#EFE9F3',
};