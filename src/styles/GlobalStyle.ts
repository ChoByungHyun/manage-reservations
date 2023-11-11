import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
  /* Font */
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Lighter';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }

  /* Reset */
  ${reset}



  :root {
    /* height */
    --vh: 100%;
    
    /* 컬러 변수 */
    --bg: #F2F2F2;
    --gray-200: #F2F2F2;
    --gray-400: #D2D2D2;
    --gray-600: #B4B4B4;
    --gray-700: #8F8F8F;
    --gray-800: #787878;
    --gray-1000:#4f4f4f;
    --primary:#ec551f;
    --primary-linear-dark:#d95221;
    --primary-linear-light:#e99070;

    --white: white;
    --black: black;

    /* box-shadow */
    --box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  }

  /* tag reset */

  body {
    box-sizing: border-box;
    font-family: 'Pretendard-Regular';
  }

  button {
    padding: 0;
    border: none;
    background-color: inherit;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
    border: none;
    padding: 0;
    box-sizing: border-box;
    }

  /* blind */
    .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    }
`;

export default GlobalStyle;
