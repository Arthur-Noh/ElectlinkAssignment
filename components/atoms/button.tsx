import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { Typography } from '../../theme/styles/typography';
import { ImageSourcePropType } from 'react-native';
import { scaler } from '../../helpers/scaler';

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

const ButtonImage = styled.Image<{ imageSize?: number }>`
width: ${({ imageSize }) => imageSize ? scaler(imageSize) : scaler(40)}px;
height: ${({ imageSize }) => imageSize ? scaler(imageSize) : scaler(40)}px;
`;

interface IButton {
    title?: string;
    imageSource?: ImageSourcePropType;
    imageSize?: number;
    onPress?: () => void;
}

const Button: React.FC<IButton> = observer((props) => {
    return (
        <Layout onPress={props.onPress}>
            { props.title !== undefined && (
                <Title>{props.title}</Title>
            )}
            { props.imageSource !== undefined && (
                <ButtonImage source={props.imageSource} imageSize={props.imageSize}/>
            )}
        </Layout>
    );
});

export default Button;