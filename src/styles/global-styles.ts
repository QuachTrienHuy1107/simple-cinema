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
  background-color: #131720;
}

li{
  list-style-type: none;
}

a{
  color: #fff;
}

`;

export default GlobalStyle;
