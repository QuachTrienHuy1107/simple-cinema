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

body{
  transition: all 0.2s;
  scroll-behavior: smooth;
}

p{
  margin-bottom: 0;
}

li{
  list-style-type: none;
}

*{
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: 0 0 6px 0 rgba(0, 0, 0,0.3);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
}


`;

export default GlobalStyle;
