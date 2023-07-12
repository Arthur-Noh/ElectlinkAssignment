
### 전체 파일 구조
```bash
.
├── @types
│   └── global
│       └── index.d.ts
├── assets
│   ├── animation
│   │   └── Lottie.json
│   ├── bottomTab
│   │   ├── animation.png
│   │   ├── boldAnimation.png
│   │   ├── boldHorizon.png
│   │   ├── boldVertical.png
│   │   ├── horizon.png
│   │   └── vertical.png
│   ├── common
│   │   ├── pause.png
│   │   ├── play.png
│   │   ├── reset.png
│   │   └── stop.png
│   ├── logo
│   │   └── logo.png
│   └── video
│       ├── animation.gif
│       ├── horizon.gif
│       └── vertical.gif
├── components
│   ├── atoms
│   │   ├── button.tsx
│   │   ├── horizonCard.tsx
│   │   ├── loader.tsx
│   │   └── verticalCard.tsx
│   └── molecules
│       ├── basicModal.tsx
│       └── dialogue.tsx
├── factory
│   └── axiosFactory.ts
├── helpers
│   └── scaler.ts
├── hooks
│   ├── useDebounce.ts
│   └── useLaunchingScreen.ts
├── interfaces
│   └── testDTO.ts
├── pages
│   ├── action
│   │   └── index.tsx
│   ├── horizon
│   │   └── index.tsx
│   └── vertical
│       └── index.tsx
├── route
│   ├── appBottomTab.tsx
│   ├── appScreen.tsx
│   └── routeDef.ts
├── services
│   └── testApiService.ts
├── stores
│   ├── modalStore
│   │   └── loaderStore.ts
│   └── publicStore.ts
├── theme
│   └── styles
│       ├── palette.ts
│       ├── themeBase.ts
│       └── typography.ts
├── tsconfig.json
├── vendor
│   └── bundle
│       └── ruby
└── yarn.lock
```