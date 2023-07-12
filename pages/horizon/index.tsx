import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';
import HorizonCard from '../../components/atoms/horizonCard';
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import publicStore from '../../stores/publicStore';
import { PhotoDataDTO } from '../../interfaces/testDTO';
import useDebounce from '../../hooks/useDebounce';
import testApiService from '../../services/testApiService';
import { Typography } from '../../theme/styles/typography';
import Button from '../../components/atoms/button';

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
justify-content: center;
align-items: center;
background-color: ${Palette.white.base};
padding: ${scaler(24)}px;
`;

const Horizon = () => {
    const [ currentIndex, setCurrentIndex ] = useState<number>(0); // 현재 스크롤 될 카드의 인덱스
    const [ pauseScroll, setPauseScroll ] = useState<boolean>(false); // 자동 스크롤 일시정지 여부
    const [ bottomLoading, setBottomLoading ] = useState<boolean>(false); // 우측 로딩바
    const flatListRef = useRef<FlatList>(null);

    // 우측의 스크롤 할 리스트를 랜더링합니다.
    const renderList = (data: {item: PhotoDataDTO, index: number }) => {
        const { item, index } = data;

        return (
            <CardView>
                <HorizonCard
                    title={item.id}
                    subTitle={item.albumId}
                    description={item.title}
                    imageUrl={item.url}
                    onPress={() => console.log('카드 눌렸을 때 기능을 붙여보세요.')}
                />
            </CardView>
        );
    };

    // 다음 스크롤 될 아이템으로 이동합니다.
    // 단 debounce 커스텀 훅을 걸어서 동일한 요청이 들어왔을 때 이전 요청을 무시하고 수행할 수 있도록 개발했습니다.
    const scrollToItem = useCallback(
        useDebounce((index: number) => {
            flatListRef.current?.scrollToIndex({ animated: true, index });
        }, 3000), []
    );

    // 스크롤이 완료 되었을때 호출하는 함수
    // 현재 카드의 인덱스 설정과 자동으로 넘기는 역할을 수행합니다.
    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = e.nativeEvent.contentOffset;
        const viewSize = e.nativeEvent.layoutMeasurement;
        const pageNumber = Math.ceil(contentOffset.x / viewSize.width);
        setCurrentIndex(pageNumber + 1);
        
        // 길이를 제한할 필요가 있을 때
        // if (publicStore.photoList.length > pageNumber + 1) {
        //     scrollToItem(pageNumber + 1);
        // }
        
        // 스크롤 정지 여부 확인
        if (pauseScroll) {
            return ;
        }

        scrollToItem(pageNumber + 1);
    };

    // 무한 스크롤 시 우측에 로딩바를 표시합니다.
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

    // 다음 데이터를 불러옵니다.
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
    };

    // 자동 넘기기가 불편할 경우 정지버튼을 눌러 언제든지 정지할 수 있습니다.
    const stopScroll = () => {
        if (pauseScroll) {
            setPauseScroll(false);
            scrollToItem(currentIndex);
            return ;
        }
        setPauseScroll(true);
        if (currentIndex !== 0) {
            flatListRef.current?.scrollToIndex({ animated: true, index: currentIndex - 1 });
        }
    };

    useEffect(() => {
        scrollToItem(1);
    }, []);

    return (
        <Layout>
            <TitleView>
                <Title>가로형 무한 스크롤 구현</Title>
            </TitleView>
            <View>
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
                    // 데이터가 없는데 스크롤을 시도하는 경우 오류가 발생할 수 있기에 방지합니다.
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: info.index, animated: false })
                        });
                    }}
                />
            </View>
            <Button
                title={pauseScroll ? '자동 스크롤 시작하기' : '자동 스크롤 정지하기'}
                onPress={stopScroll}
            />
        </Layout>
    );
};

export default Horizon;