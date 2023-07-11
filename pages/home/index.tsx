import React, { useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import testApiService from '../../services/testApiService';
import publicStore from '../../stores/publicStore';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { Palette } from '../../theme/styles/palette';
import ListCard from '../../components/atoms/listCard';
import { Typography } from '../../theme/styles/typography';
import Loader from '../../components/atoms/loader';
import { scaler } from '../../helpers/scaler';
import { PhotoDataDTO } from '../../interfaces/testDTO';
import loaderStore from '../../stores/modalStore/loaderStore';

const Layout = styled.View`
flex: 1;
background-color: ${Palette.white.base};
padding: 10px;
`;

const TitleView = styled.View`
align-items: center;
margin-bottom: ${scaler(16)}px;
`;

const Title = styled.Text`
font-size: ${Typography.size.l1}px;
font-weight: ${Typography.weight.bold};
color: ${Palette.black.base};
`;

const Home = observer(() => {
    
    const initialize = async () => {
        try {
            loaderStore.setLoading(true);
            const response = await testApiService.getPhoto({ _start: 0, _limit: 10 });
            if (response) {
                // console.log('response =>', response);
                publicStore.addPhotoList(response);
            }
            loaderStore.setLoading(false);
        } catch (error: any) {
            loaderStore.setLoading(false);
            console.log('[Error] Home,', error);
        }
    };

    const renderList = (data: { item: PhotoDataDTO, index: number }) => {
        const { item, index } = data;

        return (
            <ListCard
                title={item.id}
                subTitle={item.albumId}
                imageUrl={item.thumbnailUrl}
                onPress={() => console.log('카드가 눌렸소')}
            />
        )
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Layout>
            <TitleView>
                <Title>세로형 무한 스크롤 구현</Title>
            </TitleView>
            <FlatList
                data={publicStore.photoList}
                keyExtractor={(item, index) => `${item.albumId}-${item.id}-${index}`}
                renderItem={renderList}
                contentContainerStyle={{ backgroundColor: 'white' }}
            />
        </Layout>
    );
});

export default Home;