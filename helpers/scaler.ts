import { getStatusBarHeight, getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { Dimensions, Platform } from 'react-native';

/**
 * 화면 안전 영역 값 (상단)
 * safe iPhoneX : 44
 * unSafe iPhoneX : 30
 * other iPhones : 20
 * android : Statusbar.currentHeight
 */
const statusBarHeight = getStatusBarHeight();
/**
 * 하단 여백
 * iPhoneX : 34
 * other : 0
 */
const bottomSpace = getBottomSpace();

/**
 * 반응형 기준 화면 픽셀
 * 기종 : iPhone 5S
 * 마켓에서 지원하는 최소 화면 기종
 */
const basicDimensions = {
    width: 640,
    height: 1136,
};

/**
 * 최종 화면 픽셀
 */
const deviceDimensions = {
    width: Dimensions.get('screen').width,
    height: ( isIphoneX() || Platform.OS === 'android' ) ?
        Dimensions.get('screen').height - (statusBarHeight + bottomSpace) :
        Dimensions.get('screen').height,
};

// 반응형 사이즈
const scaler = (width: number) => {
    const scale = deviceDimensions.width / basicDimensions.width;
    return Math.round(width * scale);
};

// 반응형 폰트 사이즈
const fontScaler = (fontSize: number) => {
    const scale = Math.sqrt(deviceDimensions.height / basicDimensions.height);
    return Math.round(fontSize * scale);
};

export {
    scaler,
    fontScaler,
};
