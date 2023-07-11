import { action, makeObservable, observable, runInAction } from "mobx";

interface ILoaderStore {
    loading: boolean;
}

const initialState: ILoaderStore = {
    loading: false,
};

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