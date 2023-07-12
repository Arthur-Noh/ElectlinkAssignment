<h1 align='center'>Styled Component</h1>
페이지 랜더링 시 필요한 CSS 만 랜더링 하고, 동적 스타일링의 편의를 위해 styled-component 를 사용했습니다.

### 사용예시
```bash
// button.tsx
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { Typography } from '../../theme/styles/typography';
import { ImageSourcePropType } from 'react-native';
import { scaler } from '../../helpers/scaler';

// 이 부분
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
```
실제 버튼 컴포넌트를 가져와 사용 예시를 보겠습니다.</br>
각각의 CSS 파일을 생성할 필요 없이 해당 페이지에 필요한 CSS 의 경우 상단에 작성하여 개발시 편의를 도모했습니다.</br>
또한 ButtonImage 스타일에서도 보듯이 imageSize 를 불러와서 편하게 동적 스타일링을 할 수 있습니다.

다른 파일들에도 마찬가지로 상단에 styled-component 를 작성하여 개발했습니다.