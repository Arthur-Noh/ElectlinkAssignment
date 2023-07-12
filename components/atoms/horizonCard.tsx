import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Typography } from '../../theme/styles/typography';
import { scaler } from '../../helpers/scaler';

const Layout = styled.Pressable`
padding: ${Base.mediumPadding}px;
background-color: ${Palette.gray[100]};
border-radius: ${Base.mediumRadius}px;
`;

const ImageView = styled.View`
margin-bottom: ${scaler(12)}px;
`;

const EmptyImage = styled.View`
width: ${Dimensions.get('screen').width * 0.9}px;
height: ${Dimensions.get('screen').width * 0.9}px;
background-color: ${Palette.white.base};
border-radius: ${Base.mediumRadius}px;
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

const DescriptionView = styled.View`
width: ${Dimensions.get('screen').width * 0.9}px;
`;

const Description = styled.Text`
font-size: ${Typography.size.m1}px;
color: ${Palette.gray[200]};
`;

interface IHorizonCard {
    title: number; // 카드 제목
    subTitle: number; // 카드 부제목
    description?: string; // 카드 설명
    imageUrl?: string; // 카드 이미지 url
    onPress?: () => void; // 카드를 눌렀을 때의 콜백 (만약 있다면)
}

const HorizonCard: React.FC<IHorizonCard> = observer((props) => {
    return (
        <Layout onPress={props.onPress}>
            {/* 이미지가 만약 없다면 이미 준비해둔 빈 여백을 표기 */}
            <ImageView>
                { props.imageUrl ? (
                    <FastImage
                        source={{ uri: props.imageUrl }}
                        style={{
                            width: Dimensions.get('screen').width * 0.9,
                            height: Dimensions.get('screen').width * 0.9,
                            borderRadius: Base.mediumRadius,
                        }}
                    />
                ) : (
                    <EmptyImage/>
                )}
            </ImageView>
            <TitleView>
                <Title>{`아이디 : ${props.title}`}</Title>
                <SubTitle>{`앨범 ${props.subTitle}.`}</SubTitle>
            </TitleView>
            <DescriptionView>
                <Description>{props.description}</Description>
            </DescriptionView>
        </Layout>
    );
});

export default HorizonCard;