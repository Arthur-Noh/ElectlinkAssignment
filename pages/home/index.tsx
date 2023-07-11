import React, { useEffect } from 'react';
import { Text } from 'react-native';
import testApiService from '../../services/testApiService';
import publicStore from '../../stores/publicStore';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

const Layout = styled.View`
flex: 1;
`;



const Home = observer(() => {
    
    const initialize = async () => {
        const response = await testApiService.getPhoto({ _start: 0, _limit: 5 });
        if (response) {
            console.log('response =>', response);
            publicStore.addPhotoList(response);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Layout>
            <Text>홈 페이지</Text>
            
            { publicStore.photoList[0]?.url && (
                <FastImage
                    source={{ uri: publicStore.photoList[0]?.url }}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                />
            )}
        </Layout>
    );
});

export default Home;