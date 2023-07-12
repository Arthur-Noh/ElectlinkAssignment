
### 전체 파일 구조
```bash
root
├── @types
├── App.tsx
├── Gemfile
├── Gemfile.lock
├── README.md
├── __tests__
├── android
├── app.json
├── assets
├── babel.config.js
├── components
├── documentation
├── factory
├── helpers
├── hooks
├── index.js
├── interfaces
├── ios
├── jest.config.js
├── metro.config.js
├── node_modules
├── package.json
├── pages
├── route
├── services
├── stores
├── theme
├── tsconfig.json
├── vendor
└── yarn.lock
```

### @types
```bash
@types
└── global
    └── index.d.ts
```
타입스크립트 내부에 이미지를 첨부하기 위해서 예외처리 파일을 작성했습니다.

### App.tsx
최 상단의 화면 파일입니다. 네비게이션을 위해 종속성을 주입했습니다.<br/>
네비게이션의 전체 구조는 route 폴더와 연계됩니다.

### route
```bash
route
├── appBottomTab.tsx
├── appScreen.tsx
└── routeDef.ts
```
화면의 네비게이션을 위한 경로 폴더는 모두 해당 파일에 포함되어 있습니다.<br/>
App.tsx > appScreen > appBottomTab 형식으로 파일이 감싸져 있습니다.<br/>
이렇게 구성한 이유는 스크린을 하나를 두어 로직상 로그인이 먼저 되어야 한다던지, 토큰 같은걸 다루는 훅을 appScreen에 두어 좀 더 깔끔하게 볼 수 있으며, 네비게이션 라이브러리에서 사용하는 로직이랑 혼용되었을때 보기 어려운 점이 많기 때문에 파일을 분리했습니다.<br/>
또한 각 bottomTab 에 보여질 모든 경로 화면은 routeDef 에 타이핑하여 일일히 정의해 나중에 네비게이션 타입을 사용할 때를 대비했습니다.

### assets
```
assets
├── animation
│   └── Lottie.json
├── bottomTab
│   ├── animation.png
│   ├── boldAnimation.png
│   ├── boldHorizon.png
│   ├── boldVertical.png
│   ├── horizon.png
│   └── vertical.png
├── common
│   ├── pause.png
│   ├── play.png
│   ├── reset.png
│   └── stop.png
├── logo
│   └── logo.png
└── video
    ├── animation.gif
    ├── horizon.gif
    └── vertical.gif
```
말 그대로 앱에서 보여질 이미지, 애니메이션 등 을 저장해둔 폴더입니다.<br/>
이 프로젝트에서는 설명 파일(md)에 들어갈 이미지까지 한번에 포함되어 있습니다.<br/>
나중에 재사용 할 공통 이미지는 common 폴더에, 어떤 컴포넌트에만 특별히 사용되는 경우 그 명칭을 붙여 구분했습니다.

### components
```
components
├── atoms
│   ├── button.tsx
│   ├── horizonCard.tsx
│   ├── loader.tsx
│   └── verticalCard.tsx
└── molecules
    ├── basicModal.tsx
    └── dialogue.tsx
```
Atomic design pattern 을 도입하여 컴포넌트간 재사용성을 극대화 했습니다.<br/>
더 자세한 사항은 [이 곳을 눌러주세요.](./designPattern.md)

### documentation
```
documentation
├── RESULT.md
├── animation.md
├── designPattern.md
├── excludeBusiness.md
├── fileTree.md
├── horizon.md
├── howToStart.md
├── mobx.md
├── responsive.md
├── styleComponent.md
└── vertical.md
```
명칭 그대로 설명서가 집합되어있는 폴더입니다.

### factory
```
factory
└── axiosFactory.ts
```
axios factory design 을 도입했습니다.<br/>
원래는 api url 마다 생성받아서 적용시키면 무척 좋지만, 해당 프로젝트에서는 하나의 url 만 사용했기에 특별히 수행하지는 않았습니다.<br/>
토큰이 필요할 경우 interceptors 부분에 삽입하여 같이 서버로 전송해주도록 개발했습니다.

### helper
```
helpers
└── scaler.ts
```
helpers 에서는 공통적인 수학적 연산이나 날짜 연산, 타입 변형(예: 20230101 -> 2023-01-01 등) 등의 기능을 모아두는 폴더로 만들었습니다.<br/>
해당 프로젝트에서는 그렇게까지 고도로 사용할 필요가 없었기에 자주 사용되는 반응형 앱을 위한 scaler.ts 파일만 개발했습니다.<br/>
동적 어플리케이션 뷰에 대해서는 [이 곳을 눌러주세요](./responsive.md).

### interfaces
```
interfaces
└── testDTO.ts
```
이 프로젝트는 typescript 를 사용하기 때문에 서버에 송수신할 데이터의 명세를 미리 작성해둔 타입 혹은 인터페이스 파일이 필요합니다.<br/>
그래야 어떤 데이터를 보내야하고, 어떤 데이터를 받을지 예측할 수 있기 때문입니다.<br/>
이 프로젝트에서는 제가 임의로 testDTO 를 작성했습니다.

### pages
```
pages
├── action
│   └── index.tsx
├── horizon
│   └── index.tsx
└── vertical
    └── index.tsx
```
모든 페이지들은 해당 파일에 작성하도록 개발했습니다.<br/>
해당 폴더에 페이지 파일을 생성하여 만들고, 만들어진 페이지들을 routeDef 에 정의해주면 자동으로 네비게이션에 연결되도록 개발했습니다.

### services
```
services
└── testApiService.ts
```
비즈니스 로직만 모인 폴더를 services로 정의했습니다.<br/>
이 프로젝트는 비즈니스 로직과 뷰 로직의 엄격하게 분리했습니다.<br/>
비즈니스 로직 분리에 대해서는 [이 곳을 눌러주세요](./excludeBusiness.md).

### stores
```
stores
├── modalStore
│   └── loaderStore.ts
└── publicStore.ts
```
이 프로젝트에서는 전역 상태관리를 담당하는 store들을 모아둔 stores 파일을 만들어 한 곳에 관리했습니다.<br/>
제가 사용한 라이브러리는 mobx이므로 mobx는 redux와 다르게 여러개의 스토어를 가질 수 있습니다.<br/>
제가 전역 로딩 모달 예시를 하나 만들어서 그 모달의 상태를 담당하는 loaderStore를 하나를 생성한 것이고,<br/>
이 프로젝트 전체의 데이터를 다루는 publicStore를 하나 만들어서 핸들링 할 수 있게 개발했습니다.<br/>
mobx에 대해서는 [ 이곳을 눌러주세요](./mobx.md).

### theme
```
theme
└── styles
    ├── palette.ts
    ├── themeBase.ts
    └── typography.ts
```
이 프로젝트에서는 전역으로 동일한 스타일을 사용하기 위해서 theme 폴더를 만들어 관리합니다.<br/>
색상, 폰트 등에 대해서는 특별한 지시사항이 없었기 때문에 일렉링크의 색상을 추출하여 색상, 크기 를 임의로 작성했습니다.<br/>
palette는 공통으로 사용할 색상에 대해 정의합니다.<br/>
themeBase는 공통으로 사용할 크기, 길이, 테두리 등에 대해 정의합니다.<br/>
typography는 공통으로 사용할 폰트, 폰트크기 등에 대해서 정의합니다.