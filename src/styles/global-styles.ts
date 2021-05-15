import { createGlobalStyle } from "styled-components";
import Regular from "./assets/Roboto-Regular.ttf";
import Light from "./assets/Roboto-Light.ttf";
import Thin from "./assets/Roboto-Thin.ttf";
import Bold from "./assets/Roboto-Bold.ttf";
import Black from "./assets/Roboto-Black.ttf";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: Regular;
  src: url(${Regular});
}
@font-face {
  font-family: Thin;
  src: url(${Thin});
}
@font-face {
  font-family: Black;
  src: url(${Black});
}
@font-face {
  font-family: Bold;
  src: url(${Bold});
}
@font-face {
  font-family: Light;
  src: url(${Light});
}


  html,
  body,
  div,
  span,
  object,
  iframe,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  code,
  em,
  img,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  b,
  u,
  i,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  main,
  canvas,
  embed,
  footer,
  header,
  nav,
  section,
  video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;



      /* @media screen and (max-width: 576px) {
          font-size: 10px;
      } */
  }

  footer,
  header,
  nav,
  section,
  main {
      display: block;
  }

  body {
    font-family: Regular !important;
    transition: all 0.3s;
  }

  ol,
  ul {
      list-style: none;
  }

  blockquote,
  q {
      quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
      content: "";
      content: none;
  }

  table {
      border-collapse: collapse;
      border-spacing: 0;
  }

  input {
      -webkit-appearance: none;
      border-radius: 0;
  }
`;

export default GlobalStyle;
