import React from 'react';
import { SafeAreaView } from 'react-native';
import AppBottomTab from './appBottomTab';
import loaderStore from '../stores/modalStore/loaderStore';
import Loader from '../components/atoms/loader';
import { observer } from 'mobx-react';

// 만약 로그인이 있어 토큰을 받는다고 하면 이 스크린 페이지에 붙여주면 좋습니다.
const AppScreen: React.FC = observer(() => {1
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* 네비게이션 로직과 혼용을 막기 위해서 한번 AppScreen 으로 감싸주는 것도 있습니다. */}
            <AppBottomTab />

            {/* 전역 API 로딩바 */}
            { loaderStore.loading && <Loader/> }
        </SafeAreaView>
    );
});

export default AppScreen;