import 'styled-components';
import { ITypography } from './styles/typography';
import { IWhite, IBlack, IGray, IPrimary } from './styles/palette';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            white: IWhite,
            black: IBlack,
            gray: IGray,
            primary: IPrimary,
        };
        base: {
            smallPadding: number,
            mediumPadding: number,
            largePadding: number,
            smallRadius: number,
            mediumRadius: number,
            largeRadius: number,
        };
        typography: ITypography;
    }
}
