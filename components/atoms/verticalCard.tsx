import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';
import FastImage from 'react-native-fast-image';
import { Typography } from '../../theme/styles/typography';

const Layout = styled.Pressable`
flex-direction: row;
padding: ${Base.mediumPadding}px;
background-color: ${Palette.gray[100]};
border-radius: ${Base.mediumRadius}px;
`;

const ImageView = styled.View`
margin-right: ${scaler(12)}px;
`;

const EmptyImage = styled.View`
width: ${scaler(150)}px;
height: ${scaler(150)}px;
background-color: ${Palette.white.base};
border-radius: ${Base.mediumRadius}px;
`;

const ContentView = styled.View`
flex: 1;
`;

const TitleView = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: baseline;
margin-bottom: ${scaler(16)}px;
`;

const Title = styled.Text`
font-size: ${Typography.size.l1}px;
font-weight: ${Typography.weight.bold};
color: ${Palette.black.base};
`;

const SubTitle = styled.Text`
font-size: ${Typography.size.m2}px;
font-weight: ${Typography.weight.medium};
color: ${Palette.gray.base};
`;

const Description = styled.Text`
font-size: ${Typography.size.m1}px;
color: ${Palette.gray[200]};
`;

interface IListCard {
    title: number; // 카드 제목
    subTitle: number; // 카드 부제목
    description?: string; // 카드 설명
    imageUrl?: string; // 카드 이미지 url
    onPress?: () => void; // 카드를 눌렀을 때의 콜백 (만약 있다면)
}

const VerticalCard: React.FC<IListCard> = observer((props) => {
    return (
        <Layout onPress={props.onPress}>
            {/* 만약 이미지가 없다면 미리 준비한 빈 여백을 표기 */}
            <ImageView>
                { props.imageUrl ? (
                    <FastImage
                        source={{ uri: props.imageUrl }}
                        style={{
                            width: scaler(150),
                            height: scaler(150),
                            borderRadius: Base.mediumRadius,
                        }}
                    />
                ) : (
                    <EmptyImage />
                )}
            </ImageView>
            <ContentView>
                <TitleView>
                    <Title>{`아이디 : ${props.title}`}</Title>
                    <SubTitle>{`앨범 ${props.subTitle}.`}</SubTitle>
                </TitleView>
                <Description>{props.description}</Description>
            </ContentView>
        </Layout>
    );
});

export default VerticalCard;