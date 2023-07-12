import axios from 'axios';
import publicStore from '../stores/publicStore';

const createInstance = () => {
    console.log(`[AxiosFactory] Server host : "${publicStore.hostUrl}"`);

    const instance = axios.create({
        baseURL: publicStore.hostUrl,
        headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        },
    });

    instance.interceptors.request.use(
        async (config) => {
            // 토큰이 있다면 삽입하세요.
            // config.headers = {
            //     Authorization: `Bearer ${token}`,
            //     'Content-Type': 'application/json',
            // };
            return config;
        },
        (error) => { // 에러의 경우 확인하는 페이지에서 핸들링 할 수 있도록 바로 전달
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response) => {
			return response;
		},
		(error) => { // 에러의 경우 확인하는 페이지에서 핸들링 할 수 있도록 바로 전달
			return Promise.reject(error);
		},
    );

	return instance;
};

let Instance = createInstance();

const initInstance = () => {
    Instance = createInstance(); // 원래는 api url 을 인자로 넣어줘서 생성하면 더 좋습니다.
};

export {
    Instance,
    initInstance,
};