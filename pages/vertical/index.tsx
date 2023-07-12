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
import BasicModal from '../../components/molecules/basicModal';

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
    const [ visibleNotice, setVisibleNotice ] = useState<boolean>(true); // 맨 처음 앱 방문 모달
    const [ topLoading, setTopLoading ] = useState<boolean>(false); // 상단 새로고침 로딩바
    const [ bottomLoading, setBottomLoading ] = useState<boolean>(false); // 하단 로딩바

    // 처음 페이지 방문시 데이터를 로드합니다.
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
    }

    // 하단의 스크롤 할 리스트를 랜더링합니다.
    const renderList = (data: { item: PhotoDataDTO, index: number }) => {
        const { item, index } = data;

        return (
            <CardView>
                <VerticalCard
                    title={item.id}
                    subTitle={item.albumId}
                    description={item.title}
                    imageUrl={item.thumbnailUrl}
                    onPress={() => console.log('카드 눌렸을 때 기능을 붙여보세요.')}
                />
            </CardView>
        )
    };

    // 무한 스크롤 시 최하단의 로딩바를 표시합니다.
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

    // 페이지 첫 진입시 수행됩니다.
    useEffect(() => {
        initialize(true);
    }, []);

    return (
        <Layout>
            <BasicModal
                visible={visibleNotice}
                title='Welcome!'
                content={
                    `제가 만든 앱을 작동시켜 주셔서 대단히 감사합니다\n` +
                    `이 앱은 SK일렉링크 괴제용 어플리케이션입니다.\n\n` +

                    `이 앱은 3가지 기능이 구현되어 있습니다.\n` +
                    `1. 세로 무한 스크롤\n` +
                    `2. 가로 무한 스크롤\n` +
                    `3. lottie 애니메이션 적용\n\n` +

                    `각 기능의 자세한 사항은 첨부된 Readme.md 문서를 참고해주세요.\n` +
                    `이 모달은 앱을 구동 했을때만 출력됩니다.\n\n` +

                    `다시 한번 제가 만든 앱을 실행시켜주셔서 정말 감사합니다.`
                }
                onPressConfirm={() => {
                    setVisibleNotice(false);
                }}
                onPressBlur={() => {
                    setVisibleNotice(false);
                }}
            />
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
                onEndReached={async () => await getNextData(publicStore.photoList.length)} // 최하단에 도달하면 호출
                onEndReachedThreshold={0} // 로딩바가 보일 수 있게 편의상 0으로 설정, 자연스러운건 0.2 ~ 0.3 이 적절함
                ListFooterComponent={renderFooter()} // 최하단 로딩바
            />
        </Layout>
    );
});

export default Vertical;