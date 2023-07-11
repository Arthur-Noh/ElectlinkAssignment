import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import { Palette } from '../../theme/styles/palette';
import { scaler } from '../../helpers/scaler';
import HorizonCard from '../../components/atoms/horizonCard';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import publicStore from '../../stores/publicStore';
import { PhotoDataDTO } from '../../interfaces/testDTO';
import useDebounce from '../../hooks/useDebounce';

const Layout = styled.View`
flex: 1;
background-color: ${Palette.white.base};
padding: ${scaler(12)}px ${scaler(12)}px 0 ${scaler(12)}px;
`;

const Horizon = () => {
    const flatListRef = useRef<FlatList>(null);

    const Animation = () => {
        return (
            <Lottie
                source={require('../../assets/animation/Lottie.json')}
                autoPlay
                // loop
            />
        );
    }

    const renderList = (data: {item: PhotoDataDTO, index: number }) => {
        const { item, index } = data;

        return (
            <HorizonCard
                title={item.id}
                subTitle={item.albumId}
                imageUrl={item.url}
                onPress={() => console.log('카드가 눌렷삼')}
            />
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

        // 다음 페이지로 이동
        if (publicStore.photoList.length > pageNumber + 1) {
            scrollToItem(pageNumber + 1);
        }
    };

    useEffect(() => {
        scrollToItem(1);
    }, []);

    return (
        <Layout>
            <FlatList
                ref={flatListRef}
                data={publicStore.photoList}
                keyExtractor={(item, index) => `${item.albumId}-${item.id}-${index}`}
                renderItem={renderList}
                pagingEnabled
                horizontal
                onMomentumScrollEnd={onScrollEnd}
            />
        </Layout>
    );
};

export default Horizon;