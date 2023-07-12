import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { PhotoDataDTO } from '../interfaces/testDTO';

interface IPublicStore { // store가 어떤 값을 가지고 있을지 타입 정의
    hostUrl: string;
    photoList: Array<PhotoDataDTO>;
}

const initialState: IPublicStore = { // state의 기본값
    hostUrl: 'https://jsonplaceholder.typicode.com/photos',
    photoList: [],
};

class PublicStore {
    hostUrl = initialState.hostUrl; // Api 를 요청할 host url
    photoList = initialState.photoList; // 불러올 데이터 상태가 저장될 값

    constructor() {
        makeObservable(this, {
            hostUrl: observable,
            photoList: observable,

            setHostUrl: action.bound, // action을 통해서 상태 값을 변경하도록 개발했습니다.
            setPhotoList: action.bound,
            addPhotoList: action.bound,

            photoLength: computed, // computed 는 참조값이 변경될 때 값이 같이 변하는 값입니다.
                                   // 여기서는 불러와진 photoList의 길이를 저장하고 있습니다.

            clear: action.bound,
        });
    };

    setHostUrl(url: string) {
        runInAction(() => {
            this.hostUrl = url;
        });
    }

    setPhotoList(data: Array<PhotoDataDTO>) {
        runInAction(() => {
            this.photoList = data;
        });
    }

    // 무한 스크롤시 데이터 불러왔을때 어떻게 지정할 것인지에 대한 함수
    addPhotoList(data: Array<PhotoDataDTO>) {
        runInAction(() => {
            this.photoList = [
                ...this.photoList,
                ...data,
            ];
        });
    }
    
    get photoLength() {
        return this.photoList.length;
    }

    clear() {
        runInAction(() => {
            this.hostUrl = initialState.hostUrl;
            this.photoList = initialState.photoList;
        });
    }
}

const publicStore = new PublicStore();
export default publicStore;