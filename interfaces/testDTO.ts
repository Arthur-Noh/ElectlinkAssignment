export interface SearchPhotoDTO {
    _start: number;
    _limit: number;
}

export interface PhotoDataDTO {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}