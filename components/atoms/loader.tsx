import React from 'react';
import { observer } from 'mobx-react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Layout = styled.View`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
z-index: ${Number.MAX_SAFE_INTEGER};
justify-content: center;
align-items: center;
background-color: ${'#00000050'};
`;

// 전역 로딩 모달
// 페이지 최초 진입이나 api 를 요청하고 대기하는 동안 호출하는 전역 모달입니다.
// 이 프로젝트에서는 무한 스크롤 맨 처음 페이지 첫 진입에만 적용했습니다.
// 그 이유는 나머지는 스크롤 하면서 로딩시에 하단에 로딩을 뜨도록 개발했기 때문입니다.
const Loader: React.FC = observer(() => {
    return (
        <Layout>
            <ActivityIndicator
                size='large'
                color='white'
            />
        </Layout>
    );
});

export default Loader;