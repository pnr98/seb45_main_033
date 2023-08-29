import { styled, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --main-width: 1264px;
        --main-height: calc(100vh);
        --orange : #EA862B;
    }

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font: inherit;
    font-family: 'Noto Sans KR', 'Roboto', sans-serif;
    vertical-align: baseline;
    text-decoration: none;
    color: var(--black);
    transition: 0.15s ease all;
    }

body {
    min-height : 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
}

ol, ul {
    list-style: none;
}

button {
    background: none;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
}
`;
