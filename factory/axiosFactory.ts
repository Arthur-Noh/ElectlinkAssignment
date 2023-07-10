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
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response) => {
			return response;
		},
		(error) => {
			return Promise.reject(error);
		},
    );

	return instance;
};

let Instance = createInstance();

const initInstance = () => {
    Instance = createInstance();
};

export {
    Instance,
    initInstance,
};