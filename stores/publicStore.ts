import { action, makeObservable, observable, runInAction } from 'mobx';
import { PhotoDataDTO } from '../interfaces/testDTO';

interface IPublicStore {
    hostUrl: string;
    photoList: Array<PhotoDataDTO>;
    carouselList: Array<PhotoDataDTO>;
}

const initialState: IPublicStore = {
    hostUrl: 'https://jsonplaceholder.typicode.com/photos',
    photoList: [],
    carouselList: [],
};

class PublicStore {
    hostUrl = initialState.hostUrl;
    photoList = initialState.photoList;
    carouselList = initialState.carouselList;

    constructor() {
        makeObservable(this, {
            hostUrl: observable,
            photoList: observable,
            carouselList: observable,

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

    setCarouselList(data: Array<PhotoDataDTO>) {
        runInAction(() => {
            this.carouselList = data;
        });
    }

    addPhotoList(data: Array<PhotoDataDTO>) {
        runInAction(() => {
            this.photoList.push(...data);
        });
    }

    clear() {
        runInAction(() => {
            this.hostUrl = initialState.hostUrl;
            this.photoList = initialState.photoList;
            this.carouselList = initialState.carouselList;
        });
    }
}

const publicStore = new PublicStore();
export default publicStore;