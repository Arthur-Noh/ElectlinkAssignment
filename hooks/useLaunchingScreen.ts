import { useEffect } from 'react';
import { initInstance } from '../factory/axiosFactory';
import publicStore from '../stores/publicStore';

const useLaunchingScreen = () => {
    useEffect(() => {
        // Active Instance
        publicStore.setHostUrl('https://jsonplaceholder.typicode.com/photos');
        initInstance();
    }, []);

    return ;
};

export default useLaunchingScreen;