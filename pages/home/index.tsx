import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';
import testApiService from '../../services/testApiService';
import publicStore from '../../stores/publicStore';

const Layout = styled.View`
flex: 1;
`;

const Home = () => {
    
    const initialize = async () => {
        const response = await testApiService.getPhoto({ _start: 0, _limit: 5 });
        if (response) {
            // console.log('response =>', response);
            publicStore.addPhotoList(response);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Layout>
            <Text>홈 페이지</Text>
        </Layout>
    );
};

export default Home;