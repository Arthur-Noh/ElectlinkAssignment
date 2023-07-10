import React from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';

const Layout = styled.View`
flex: 1;
`;

const Home = () => {
    return (
        <Layout>
            <Text>홈 페이지</Text>
        </Layout>
    );
};

export default Home;