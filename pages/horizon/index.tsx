import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';
import HorizonCard from '../../components/atoms/horizonCard';
import { ActivityIndicator, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import publicStore from '../../stores/publicStore';
import { PhotoDataDTO } from '../../interfaces/testDTO';
import useDebounce from '../../hooks/useDebounce';
import testApiService from '../../services/testApiService';
import { Typography } from '../../theme/styles/typography';

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
`;

// 하단 도달시 로딩 화면 뷰
const BottomLoading = styled.View`
background-color: ${Palette.white.base};
padding: ${scaler(24)}px;
`;

const Horizon = () => {
    const [ bottomLoading, setBottomLoading ] = useState<boolean>(false);
    const flatListRef = useRef<FlatList>(null);

    const renderList = (data: {item: PhotoDataDTO, index: number }) => {
        const { item, index } = data;

        return (
            <CardView>
                <HorizonCard
                    title={item.id}
                    subTitle={item.albumId}
                    description={item.title}
                    imageUrl={item.url}
                    onPress={() => console.log('카드가 눌렷삼')}
                />
            </CardView>
        );
    };

    const scrollToItem = useCallback(
        useDebounce((index: number) => {
            flatListRef.current?.scrollToIndex({ animated: true, index });
        }, 3000), []
    );

    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = e.nativeEvent.contentOffset;
        const viewSize = e.nativeEvent.layoutMeasurement;
        const pageNumber = Math.ceil(contentOffset.x / viewSize.width);

        // 길이를 제한할 필요가 있을 때
        // if (publicStore.photoList.length > pageNumber + 1) {
        //     scrollToItem(pageNumber + 1);
        // }
        scrollToItem(pageNumber + 1);
    };

    const renderFooter = () => {
        if (!bottomLoading) {
            return undefined;
        }
        return (
            <BottomLoading>
                <ActivityIndicator />
            </BottomLoading>
        );
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

    useEffect(() => {
        scrollToItem(1);
    }, []);

    return (
        <Layout>
            <TitleView>
                <Title>가로형 무한 스크롤 구현</Title>
            </TitleView>
            <FlatList
                ref={flatListRef}
                data={publicStore.photoList}
                keyExtractor={(item, index) => `${item.albumId}-${item.id}-${index}`}
                renderItem={renderList}
                pagingEnabled
                horizontal
                onMomentumScrollEnd={onScrollEnd}
                // 무한 스크롤 부분
                onEndReached={async () => await getNextData(publicStore.photoLength)}
                onEndReachedThreshold={0} // 보일 수 있게 편의상 0으로 설정, 자연스러운건 0.2~0.3 이 적절함
                ListFooterComponent={renderFooter()}
                // 스크롤 실패시
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: false })
                    });
                }}
            />
        </Layout>
    );
};

export default Horizon;