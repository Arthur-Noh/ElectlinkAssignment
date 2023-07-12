import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { Typography } from '../../theme/styles/typography';

const Layout = styled.TouchableOpacity`
padding: ${Base.mediumPadding}px;
border-radius: ${Base.mediumRadius}px;
background-color: ${Palette.primary[100]};
justify-content: center;
align-items: center;
`;

const Title = styled.Text`
font-size: ${Typography.size.l1}px;
font-weight: ${Typography.weight.bold};
color: ${Palette.primary.base};
`;

interface IButton {
    title: string;
    onPress?: () => void;
}

const Button: React.FC<IButton> = observer((props) => {
    return (
        <Layout onPress={props.onPress}>
            <Title>{props.title}</Title>
        </Layout>
    );
});

export default Button;