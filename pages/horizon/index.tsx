import React from 'react';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';

const Layout = styled.View`
flex: 1;
background-color: ${Palette.white.base};
padding: ${scaler(12)}px ${scaler(12)}px 0 ${scaler(12)}px;
`;

const Horizon = () => {

    const Animation = () => {
        return (
            <Lottie
                source={require('../../assets/animation/Lottie.json')}
                autoPlay
                // loop
            />
        );
    }

    return (
        <Layout>
            
        </Layout>
    );
};

export default Horizon;