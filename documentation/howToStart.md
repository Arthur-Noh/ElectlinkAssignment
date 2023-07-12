<h1 align='center'>앱 실행 방법</h1>

### 1. 의존성 패키지 설치
```bash
// npm 으로 설치해도 무방합니다.
root > yarn install
```

#### - (iOS) podfile 을 설치합니다.
```bash
root > cd ios
root/ios > pod install
```

### 2. Metro 서버 구동
```bash
// 캐시 날리는 부분은 생략 가능
root > npx react-native start --reset-cache
```

### 3. 실행하기
#### For Android
```bash
# using Yarn
root > yarn android
```

#### For iOS
```bash
# using Yarn
root > yarn ios
```