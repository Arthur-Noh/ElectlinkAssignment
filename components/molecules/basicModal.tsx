import { observer } from 'mobx-react';
import React from 'react';
import Dialogue from '../atoms/dialogue';
import styled from 'styled-components/native';
import { Typography } from '../../theme/styles/typography';
import { scaler } from '../../helpers/scaler';
import { Palette } from '../../theme/styles/palette';

const Layout = styled.View`
margin-top: ${scaler(16)}px;
`;

const TitleView = styled.View`
align-items: center;
`;

const Title = styled.Text`
font-size: ${Typography.size.l3}px;
font-weight: ${Typography.weight.bold};
color: ${Palette.black.base};
margin-bottom: ${scaler(12)}px;
`;

const ContentView = styled.View`
margin-bottom: ${scaler(20)}px;
`;

const Content = styled.Text`
font-size: ${Typography.size.m2}px;
color: ${Palette.black.base};
`;

interface IBasicModal {
    visible: boolean;
    title: string;
    content: string;
    onPressConfirm: () => void;
    onPressBlur?: () => void;
}

const BasicModal: React.FC<IBasicModal> = observer((props) => {
    return (
        <Dialogue
            visible={props.visible}
            onPressConfirm={props.onPressConfirm}
            onPressBlur={props.onPressBlur}
        >
            <Layout>
                <TitleView>
                    <Title>{props.title}</Title>
                </TitleView>
                <ContentView>
                    <Content>{props.content}</Content>
                </ContentView>
            </Layout>
        </Dialogue>
    );
});

export default BasicModal;