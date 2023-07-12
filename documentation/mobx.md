<h1 align='center'>상태관리 라이브러리 Mobx</h1>
저는 보일러플레이트를 획기적으로 줄이고, 불변성의 상태를 기본으로 제공하는 mobx 상태관리 라이브러리를 사용했습니다.

Redux와 동일하게 값을 dispatch 로 action을 전달하고, 새로운 state 로 업데이트 하는 방식입니다.
약간 차이점은 action 이 직접 state를 바로 변경하고, 상태와 관련된 역할을 컴포넌트가 담당하는 것이 아닌 store에 책임을 부여하여 상태 변경의 로직을 분리할 수 있으며, 기본적으로 불변성을 제공해 타 라이브러리 도움 없이 사용할 수 있습니다.
모든 컴포넌트를 관측가능한 상태(Observable)로 두고 변경되는 컴포넌트의 값을 변경하여 과도한 랜더링을 방지할 수 있습니다.

이 프로젝트에서는 전역 모달의 상태를 다루는 [loaderStore.ts](../stores/modalStore/loaderStore.ts) 와 공용 상태를 다루는 [publicStore.ts](../stores/publicStore.ts) 두개를 구현하여 개발했습니다.