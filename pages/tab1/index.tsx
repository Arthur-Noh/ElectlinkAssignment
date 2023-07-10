import React from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';

const Layout = styled.View`
flex: 1;
`;

const Tab1 = () => {
    return (
        <Layout>
            <Text>Tab 1</Text>
        </Layout>
    );
};

export default Tab1;