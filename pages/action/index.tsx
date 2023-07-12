import React, { useRef } from 'react';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import Button from '../../components/atoms/button';

const Layout = styled.View`
flex: 1;

`;

const Action = () => {
    const lottieRef = useRef<Lottie>(null);

    return (
        <Layout>
            <Lottie
                ref={lottieRef}
                source={require('../../assets/animation/Lottie.json')}
                loop={false}
            />
            <Button
                title='버튼'
                onPress={() => {
                    lottieRef.current?.play();
                }}
            />
        </Layout>
    );
};

export default Action;