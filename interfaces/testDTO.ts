// 임의로 지정한 서버에 요청시의 DTO
export interface SearchPhotoDTO {
    _start: number;
    _limit: number;
}

// 서버로부터 응답 받을 데이터의 DTO
export interface PhotoDataDTO {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}