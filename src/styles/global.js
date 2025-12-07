// 전역에 사용되는 스타일을 적용시키기위한 파일
// 폰트, 리셋
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  /* css 스타일 리셋 */
  ${reset}

  /*
    100 Thin
    200 Extra Light
    300 Light
    400 Regular
    500 Medium
    600 Semi Bold
    700 Bold
    800 Extra Bold
    900 Black 
  */

  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-Thin.woff2) format('woff2');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-ExtraLight.woff2) format('woff2');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-Light.woff2) format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-Regular.woff2) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-Medium.woff2) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-SemiBold.woff2) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-Bold.woff2) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-ExtraBold.woff2) format('woff2');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'pretendard';
    src: url(${process.env.PUBLIC_URL}/assets/font/pretendard/Pretendard-Black.woff2) format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'RomanticGumi';
    src: url(${process.env.PUBLIC_URL}/assets/font/RomanticGumi/Gumi-romance.otf) format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'RomanticGumi';
    src: url(${process.env.PUBLIC_URL}/assets/font/RomanticGumi/Gumi-Romance.otf) format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'pretendard';
    /* font-weight: 900; */
    box-sizing: border-box;
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }

  * {
    font-family: 'pretendard';
  }

  button {
    font-family: 'pretendard';
    cursor: pointer;
    border: none;
  }

`;
export default GlobalStyle;
