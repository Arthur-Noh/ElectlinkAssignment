import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import testApiService from '../../services/testApiService';
import publicStore from '../../stores/publicStore';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { Palette } from '../../theme/styles/palette';
import VerticalCard from '../../components/atoms/verticalCard';
import { Typography } from '../../theme/styles/typography';
import { scaler } from '../../helpers/scaler';
import { PhotoDataDTO } from '../../interfaces/testDTO';
import loaderStore from '../../stores/modalStore/loaderStore';
import Lottie from 'lottie-react-native';

const Layout = styled.View`
flex: 1;
background-color: ${Palette.white.base};
padding: ${scaler(12)}px ${scaler(12)}px 0 ${scaler(12)}px;
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

// 카드 뷰
const CardView = styled.View`
margin-bottom: ${scaler(12)}px;
`;

// 하단 도달시 로딩 화면 뷰
const BottomLoading = styled.View`
background-color: ${Palette.white.base};
padding: ${scaler(24)}px;
`;

const Vertical = observer(() => {
    const [ topLoading, setTopLoading ] = useState<boolean>(false);
    const [ bottomLoading, setBottomLoading ] = useState<boolean>(false);

    const initialize = async (initLoading?: boolean) => {
        try {
            if (initLoading) { // 초기 화면 로드시
                loaderStore.setLoading(true);
            } else {  // 새로고침 시
                setTopLoading(true);
            }
            const response = await testApiService.getPhoto({ _start: 0, _limit: 10 });
            if (response) {
                // console.log('response =>', response);
                publicStore.setPhotoList(response);
            }
            loaderStore.setLoading(false);
            setTopLoading(false);
        } catch (error: any) {
            loaderStore.setLoading(false);
            setTopLoading(false);
            console.log('[Error] Home initialize,', error);
        }
    };

    const getNextData = async (start: number) => {
        try {
            setBottomLoading(true);
            const response = await testApiService.getPhoto({ _start: start, _limit: 10 });
            if (response) {
                publicStore.addPhotoList(response);
            }
            setBottomLoading(false);
        } catch (error: any) {
            setBottomLoading(false);
            console.log('[Error] Home getNextData,', error);
        }
    }

    const renderList = (data: { item: PhotoDataDTO, index: number }) => {
        const { item, index } = data;

        return (
            <CardView>
                <VerticalCard
                    title={item.id}
                    subTitle={item.albumId}
                    description={item.title}
                    imageUrl={item.thumbnailUrl}
                    onPress={() => console.log('카드가 눌렸소')}
                />
            </CardView>
        )
    };

    const renderFooter = () => {
        if (!bottomLoading) {
            return undefined;
        }
        return (
            <BottomLoading>
                <ActivityIndicator/>
            </BottomLoading>
        );
    };

    useEffect(() => {
        initialize(true);
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
                // 상단 당겨서 새로고침
                refreshing={topLoading}
                onRefresh={async () => await initialize()}
                // 무한 스크롤 부분
                onEndReached={async () => await getNextData(publicStore.photoList.length)}
                onEndReachedThreshold={0} // 보일 수 있게 편의상 0으로 설정, 자연스러운건 0.2~0.3 이 적절함
                ListFooterComponent={renderFooter()}
            />
        </Layout>
    );
});

export default Vertical;