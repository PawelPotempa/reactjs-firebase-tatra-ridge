import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
a,
a:visited,
a:active {
  text-decoration: none;
  color: #c3c3c3;
  display: block;
  width: 100%;
  height: 100%;
}
`;

export default GlobalStyle;
