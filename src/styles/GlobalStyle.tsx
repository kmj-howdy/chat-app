import { createGlobalStyle } from 'styled-components';
import './reset.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: inherit;
      text-decoration: inherit;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  ul, li {
    list-style: none;
  }
`;

export default GlobalStyle;
