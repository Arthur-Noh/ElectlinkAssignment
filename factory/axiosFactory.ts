import axios from 'axios';

const createInstance = (hostUrl: string) => {
    console.log('[AxiosFactory] Factory is activated');
    if (hostUrl === '') {
        console.log(`[AxiosFactory] Instance is created, but host is not ready`);
    }

    const instance = axios.create({
        baseURL: hostUrl,
        headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        },
    });

    instance.interceptors.request.use(
        async (config) => {
            config.headers = {
                'Content-Type': 'application/json',
            };
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

let Instance = createInstance('');

const initInstance = (hostUrl: string) => {
    Instance = createInstance(hostUrl);
};

export {
    Instance,
    initInstance,
};