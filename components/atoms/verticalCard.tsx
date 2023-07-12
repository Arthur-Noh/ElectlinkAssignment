import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';
import FastImage from 'react-native-fast-image';
import { Typography } from '../../theme/styles/typography';

const Layout = styled.View`
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
    title: number;
    subTitle: number;
    description?: string;
    imageUrl?: string;
    onPress?: () => void;
}

const VerticalCard: React.FC<IListCard> = observer((props) => {
    return (
        <Layout>
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