import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Base } from '../../theme/styles/themeBase';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const Layout = styled.View`
flex-direction: row;
padding: ${Base.mediumPadding}px;
background-color: ${Palette.gray[100]};
border-radius: ${Base.mediumRadius}px;
`;

const EmptyImage = styled.View`
width: ${Dimensions.get('screen').width * 0.9}px;
height: ${Dimensions.get('screen').width * 0.9}px;
background-color: ${Palette.white.base};
border-radius: ${Base.mediumRadius}px;
`;

interface IHorizonCard {
    title: number;
    subTitle: number;
    imageUrl?: string;
    onPress: () => void;
}

const HorizonCard: React.FC<IHorizonCard> = observer((props) => {
    return (
        <Layout>
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
        </Layout>
    );
});

export default HorizonCard;