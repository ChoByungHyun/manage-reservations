# Manage-Reservation

## 테이블 예약을 관리할 수 있는 서비스입니다.

### 편하게 테이블을 예약하고 관리해보세요.

## 목차

- [Manage-Reservation](#Manage-Reservation)
- [목차](#목차)
  - [🛠️ 기술 스택](#️-기술-스택)
  - [🚀 패키지](#-패키지)
  - [🖥️ 실행 화면](#-실행-화면)
  - [⚙️ 실행 방법](#️-실행-방법)
  - [🔗 배포 링크](#-배포-링크)
  - [🧰 기능 정리](#-기능-정리)
  - [📂 폴더 구조](#-폴더-구조)
  - [ 기타](#-기타)

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=square"/> 
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> 
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/git-F05032?style=flat&logo=git&logoColor=white">

## 패키지

```
{
  "name": "manage-reservations",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/node": "^16.18.60",
    "@types/react": "^18.2.36",
    "@types/react-dom": "^18.2.14",
    "date-fns": "^2.30.0", // date format 라이브러리
    "react": "^18.2.0",
    "react-datepicker": "^4.21.0", // 달력 생성 라이브러리
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0", // router 관리
    "react-scripts": "^5.0.1",
    "styled-components": "^6.1.0", // css 관리
    "styled-reset": "^4.5.1",
    "typescript": "^4.9.5",
    "uuid": "^9.0.1" // 예약 카드 id 생성 라이브러리
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/react-datepicker": "^4.19.2"
  }
}
```

## <span id="screen">🖥️ 실행 화면</span>

![검색어 저장](https://github.com/ChoByungHyun/clinical-trial-search/assets/102468625/94d80711-181e-4aa7-a919-aa759e854f61)

## ⚙️ 실행 방법

#### 로컬실행

```
git clone https://github.com/ChoByungHyun/manage-reservations.git
npm install
npm run start
```

## 🔗[배포링크](http://manage-reservations.vercel.app)

## 커밋 컨벤션

| 타입     | 설명                                                      |
| -------- | --------------------------------------------------------- |
| feat     | 새로운 기능 추가                                          |
| fix      | 버그 수정                                                 |
| style    | 코드 자체의 변경이 없는 경우, formatting, semicolon 등    |
| refactor | 코드 리팩토링 (더 효율적인 코드로 변경 등)                |
| docs     | 내부 문서 추가/수정                                       |
| init     | 빌드, 패키지 매니저 수정, 그 외 기타 수정 (.gitignore 등) |

## 🧰 기능

### 예약을 등록하는 기능

#### - 이름과 전화번호, 날짜와 시간을 필수로 등록하면 예약 등록이 가능합니다.

- 이름은 최대 15글자까지 입력이 가능해요.
- 날짜와 시간은 현재보다 앞의 시간을 예약할 수 있어요. 30분 단위로 예약가능합니다.

#### - 인원선택이 가능합니다.

- 10명까지 선택 가능합니다.

#### - 테이블 선택이 가능합니다. 원하는 층의 테이블을 예약하세요.

- 날짜를 먼저 선택해야 테이블 선택이 가능합니다.
- 3개까지 가능하며 다른 사람이 같은 시간의 테이블을 예약했다면 해당 테이블은 예약이 불가능합니다.

#### - 메모를 남기실 수 있습니다.

### 예약을 관리하는 기능

#### - 예약 카드의 순서는 가장 빠른 시간 순으로 정렬됩니다.

- 예약카드는 예약시간이 지났다면 사라져요.

#### - 예약자가 도착했다면 Seated를 클릭해 예약카드를 지울 수 있습니다.

- Seated를 통해 카드를 지운다면 예약내역은 따로 관리됩니다.

#### - 예약이 취소되었다면 휴지통 버튼을 눌러 예약카드를 삭제할 수 있습니다.

#### - 예약이 변경되었다면 예약카드를 클릭해 예약내용을 변경할 수 있습니다.

- 편집창에서도 Seated와 삭제가 가능해요. 만약 내용을 수정했다면 Seated버튼이 Save버튼으로 바뀌어 저장도 가능해져요.

#### 예약 내역은 로컬 스토리지를 통해 관리됩니다.

## <span id="folder">폴더구조</span>

```
📦Manage-Reservation
 📂src
 ┃ ┣ 📂assets // 아이콘 이미지 파일
 ┃ ┣ 📂components // 재사용성을 위한 컴포넌트들과 로직분리를 위한 컴포넌트들
 ┃ ┃ ┣ 📂common // 공통으로 쓰이는 컴포넌트
 ┃ ┃ ┣ 📂domain // 메인 도메인에 사용되는 컴포넌트
 ┃ ┃ ┣ ┣ 📂form // form을 구성하는 컴포넌트
 ┃ ┃ ┣ ┣ ┣📂modal // modal창을 구성하는 컴포넌트
 ┃ ┃ ┣ ┣ ┣📂table // table을 구성하는 컴포넌트
 ┃ ┣ 📂hook // hook을 관리하는 폴더
 ┃ ┣ 📂constant // 추상화 및 편리한 유지보수를 위한 상수
 ┃ ┣ 📂types // 예약정보의 타입 지정 및 custom type들
 ┃ ┣ 📂util // 공통적으로 사용되는 함수를 분리
 ┃ ┣ 📂page // router에 따른 페이지들
 ┃ ┣ 📂router // router 설정
 ┃ ┣ 📂styles // 공통스타일 정의
 ┃ ┣ App.ts
 ┃ ┗ index.ts
 ┣ tsconfig.json
 ┣ package-lock.json
 ┣ package.json
```

## 기타

- 폴더명: 소문자
- 함수이름: camel
- 컴포넌트: pascal
- 훅,로직파일: camel
- 상수변수: 대문자
