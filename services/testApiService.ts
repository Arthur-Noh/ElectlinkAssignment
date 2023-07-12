import { Instance } from '../factory/axiosFactory';
import { PhotoDataDTO, SearchPhotoDTO } from '../interfaces/testDTO';

// 비즈니스 로직의 성격에 맞게 파일로 만들어 뷰 로직과의 혼용을 방지합니다.
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