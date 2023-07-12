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
    title?: string; // 버튼에 표시될 텍스트
    imageSource?: ImageSourcePropType; // 버튼에 이미지를 넣는다면 보일 이미지
    imageSize?: number; // 이미지의 특별히 사이즈를 삽입한다면 넣는 크기
    onPress?: () => void; // 버튼을 눌렀을때의 콜백
}

const Button: React.FC<IButton> = observer((props) => {
    return (
        <Layout onPress={props.onPress}>
            {/* 텍스트가 있던지, 이미지가 있던지 등 있을 때만 보이도록 개발 */}
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