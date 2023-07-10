import { Instance } from '../factory/axiosFactory';
import { PhotoDataDTO, SearchPhotoDTO } from '../interfaces/testDTO';

class TestApiService {
    // 조회 범위에 해당하는 사진 목록을 조회합니다.
    public async getPhoto(searchDTO: SearchPhotoDTO): Promise<Array<PhotoDataDTO>> {
        const requestQuery = 
            `?_start=${searchDTO._start}` +
            `&_limit=${searchDTO._limit}`;
        const { data } = await Instance.get(requestQuery);
        return data;
    }
}

const testApiService = new TestApiService();
export default testApiService;