import React from 'react';
import { SafeAreaView } from 'react-native';
import AppBottomTab from './appBottomTab';
import loaderStore from '../stores/modalStore/loaderStore';
import Loader from '../components/atoms/loader';
import { observer } from 'mobx-react';

const AppScreen: React.FC = observer(() => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppBottomTab />

            {/* 전역 API 로딩바 */}
            { loaderStore.loading && <Loader/> }
        </SafeAreaView>
    );
});

export default AppScreen;