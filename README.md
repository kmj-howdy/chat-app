## 추가 된 라이브러리

```json
{
  "dependencies": {
    "react-router-dom": "^6.27.0",
    "styled-components": "^6.1.13"
  }
}
```

## 프로젝트(src) 구조

대략적인 `./src` 구조는 아래와 같습니다.

```
src
├── App.tsx
├── apis
├── components (채팅목록, 채팅화면)
│   ├── ChatList.tsx
│   ├── ExistChatScreen
│   ├── NewChatScreen
│   └── common
├── constants
├── main.tsx
├── mock
├── pages
│   └── Main.tsx
├── routes
│   ├── CustomRoutes.tsx
│   └── chatLoader.ts
├── styles
├── types
├── utils
└── vite-env.d.ts
```

- `apis`: API 요청 함수
- `components`: 채팅목록, 채팅화면과 같은 컴포넌트. 그 외, 공통으로 사용되는 컴포넌트
- `constants`: 상수
- `pages`: 페이지
- `routes`: react-router-dom을 활용한 라우트
- `styles`: 전역 CSS, 공통 CSS 선언
- `types`: 공통으로 사용되는 타입 선언
- `utils`: 유틸 함수

## 접근 방식

처음에는 router를 활용하지 않고, 페이지 단을 부모로 두고, 자식으로 채팅목록과 채팅화면을 구성하려고 했습니다.

그러나 새로운 채팅을 생성하는 과정에서, 채팅 화면 하나가 너무 많은 역할을 차지하고 있었고, 채팅목록과의 state 공유도 많이 해야하기 때문에 점점 넘겨줘야 하는 props들이 늘어났습니다.

컴포넌트의 역할도 여러 가지가 생겼고, 가독성도 좋지 않아 라우터를 사용해 바꾸기로 했습니다. ([관련 PR](https://github.com/kmj-howdy/chat-app/pull/14))

기존 하나의 컴포넌트였던 채팅화면을 새로운 채팅화면(`NewChatScreen`), 대화내역이 존재하는 채팅화면(`ExistChatScreen`) 두 가지로 분리한 후, 새로운 채팅이 생성될 경우 대화내역이 존재하는 채팅 화면으로 이동시켰습니다.

## 요구사항과 다르게 구현한 부분

채팅화면 라우트 loader에서 채팅 내역을 미리 불러오고 있기 때문에 로딩 처리는 하지 않았습니다.
