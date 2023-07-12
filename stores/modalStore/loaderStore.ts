import { action, makeObservable, observable, runInAction } from "mobx";

interface ILoaderStore {
    loading: boolean;
}

const initialState: ILoaderStore = {
    loading: false,
};

// 전역 모달 스토어입니다. AppScreen.tsx 파일에서 쓰임을 볼 수 있습니다.
class LoaderStore {
    loading = initialState.loading;

    constructor() {
        makeObservable(this, {
            loading: observable,
            setLoading: action.bound,
        });
    };

    setLoading(loading: boolean) {
        runInAction(() => {
            this.loading = loading;
        });
    }
}

const loaderStore = new LoaderStore();
export default loaderStore;