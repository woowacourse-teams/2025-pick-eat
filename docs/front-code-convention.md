# 🚀 Frontend Code Convention Guide

우리 팀의 프론트엔드 프로젝트에서 일관되고 효율적인 협업을 위한 코드 컨벤션 가이드입니다.  
아래 규칙을 모두가 함께 지켜주세요! 🙌

---

## 1. 네이밍 규칙 ✍️

- **변수/함수:** `camelCase`
    - 일반 함수, 컴포넌트 내부에서만 사용되는 함수 : 동사 prefix
    - 이벤트 핸들러 : handle- prefix, -event postfix (ex: handleButtonClick)
    - 이벤트 트리거 : on prefix
- **컴포넌트 파일:** `PascalCase`
- **페이지 파일:** `PascalCase + Page` 접미사 (예: `LoginPage.tsx`)
- **스타일 파일:** 컴포넌트명과 동일하게 (예: `Button.tsx` / `Button.styles.ts`)
- **상수:** `UPPER_SNAKE_CASE` (예: `PRICE_NUMBER`)

## 2. 코드 스타일 🎨

- **들여쓰기:** space 2칸
- **세미콜론:** 항상 사용
- **따옴표:** 홑따옴표 (`'`)
- **주석:** 필요한 부분에만 간결하게, 미구현(TODO) 명시
- **Lint 도구:** ESLint, Prettier 도입
- **함수 선언**: 컴포넌트 선언은 function, 그 이외 함수는 화살표함수

## 3. 파일 및 폴더 구조 🗂️

colocation 방식으로 폴더를 구성하되, FSD 아키텍처의 “단방향 파일 참조” 를 지켜 순환 참조를 방지할 수 있도록 파일을 나누면서 필요에 따라 조금씩 FSD 아키텍처를 적용해간다.

```md
 // 아래 폴더만 참조할 수 있습니다.
📦src
┣ 📂pages # 라우트별 페이지 컴포넌트
┣ 📂domains
┃ ┗ 📂{domain명}
┃ ┃ ┗ 📂components
┃ ┃ ┗ 📂hooks
┃ ┃ ┗ 📂utils
┃ ┃ ┗ 📂types
┣ 📂apis
┃ ┗ 📂{domain명}
┣ 📂shared # 공통 유틸리티, 타입, 라이브러리, UI 컴포넌트 등
┃ ┗ 📂components # 공용 컴포넌트 안에 분류 폴더
┃ ┗ ┣ 📂assets. # 로딩 스피너같은 assets 폴더
┃ ┗ ┃ ┗ 📜Loading.tsx
┃ ┗ ┣ 📂inputs
┃ ┗ ┣ 📂layout
┃ ┗ 📂hooks
┃ ┗ 📂styles
┃ ┃ ┗ 📜reset.ts
┃ ┃ ┗ 📜global.ts
┃ ┗ 📂types
┣ 📜App.tsx
┣ 📜main.tsx
```

## 4. CSS/스타일 컨벤션 💅

- **스타일 라이브러리:** `@emotion/styled` 사용
- **전역 테마/글로벌 스타일:** emotion의 ThemeProvider, Global 활용
- **컬러/타이포:** 전역 시스템에서 일괄 관리
- **색상 표기:** HEX 코드, 소문자, full로 작성 (예: `#ffffff`)
- **속성 순서:** display, position, box-model, color 등 논리적 순서로 작성
- **단위마다 줄바꿈**

```css
/* example */
{
/* 레이아웃 */
display: flex;
position: relative;

/* 박스 */
width: 100%;
height: 40px;
margin: 0;
padding: 0;

/* 배경 */
background: #fff;

/* 폰트 */
color: #222;
letter-spacing: 0.1em;

/* 동작 */
animation: fadeIn 0.2s;
}
```

### 속성 그룹 순서

1. 레이아웃:
   display, visibility, overflow, float, clear, position, top, right, bottom, left, z-index
2. 박스:
   width, height, margin, padding, border
3. 배경: background
4. 폰트:
   color, letter-spacing, text-align, text-decoration, text-indent, vertical-align, white-space
5. 동작: animation
6. 기타

## 5. Import & Export 컨벤션 📦

- **import 순서:**
    1. 컴포넌트
    2. 도메인 포함 컴포넌트
    3. 공통 컴포넌트
    4. React 내장 훅
    5. Custom 훅
    6. 일반 함수
    7. 상수
    8. 라이브러리
    9. 스타일
- **export 방식:**
    - 컴포넌트: default export
    - Hook: named export
    - 함수: named export
    - 상수: named export

## 6. JavaScript/TypeScript 컨벤션 🧑‍💻

- 함수형 프로그래밍(map, filter 등 내장 함수) 적극 활용
- 불필요한 전역 변수 지양
- 상수 정의는 모두 UPPER_SNAKE_CASE
- 타입 선언은 모두 type을 우선시한다
- props 타입 네이밍은 Props (외부에 꺼낼 일 없이 해당 컴포넌트 상단에 위치)
- 이외 type 네이밍은 ~Type postfix

```jsx
export const PRICE_NUMBER = {
    FIRST: 10000,
};
```

## 7. React 컨벤션 🧑‍💻

- `useCallback` : Hook, props로 넘겨주는 함수인 경우 감싸기
- `Suspense` : loading fallback UI 처리
- `ErrorBoundary` : error fallback UI 처리
- `try-catch` : 코드 실행 중 오류

## 8. 접근성 📡

- 시맨틱 태그 잘 사용하기
- 이미지에 `alt` 속성 잘 넣기
    - ex: `alt="상품 이미지"` ❌ → `alt="상품"`

## 9. 코드 리뷰 프로세스 ✍🏻

- merge 시 모든 리뷰어의 승인 필요
- 24시간 안에 리뷰
- 존댓말 사용

### 추가 협의 사항

- [ ] test 도입
- [ ] 환경 변수 관리
- [ ] 상태관리 방식
