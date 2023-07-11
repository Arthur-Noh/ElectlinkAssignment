// NOTE: styled-components 의 @types 를 제대로 따라가지 않는 문제 해결
import baseStyled, { ThemedStyledInterface } from '../node_modules/@types/styled-components/index';
import Bright from './styles/bright';

export const theme = Bright;
export type Theme = typeof theme;
// NOTE : 그래서 종종 복잡한 구조체라는 오류메시지가 뜨는데 무시해도 가능함
export const styled = baseStyled as ThemedStyledInterface<Theme>;