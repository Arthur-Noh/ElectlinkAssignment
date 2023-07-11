import { action, makeObservable, observable, runInAction } from 'mobx';
import { PhotoDataDTO } from '../interfaces/testDTO';

interface IPublicStore {
    hostUrl: string;
    photoList: Array<PhotoDataDTO>;
}

const initialState: IPublicStore = {
    hostUrl: 'https://jsonplaceholder.typicode.com/photos',
    photoList: [],
};

class PublicStore {
    hostUrl = initialState.hostUrl;
    photoList = initialState.photoList;

    constructor() {
        makeObservable(this, {
            hostUrl: observable,
            photoList: observable,

            setHostUrl: action.bound,
            setPhotoList: action.bound,

            addPhotoList: action.bound,

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

    addPhotoList(data: Array<PhotoDataDTO>) {
        runInAction(() => {
            this.photoList.push(...data);
        });
    }

    clear() {
        runInAction(() => {
            this.photoList = initialState.photoList;
        });
    }
}

const publicStore = new PublicStore();
export default publicStore;