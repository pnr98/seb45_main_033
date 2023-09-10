import { styled, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        //--main-width: 1264px;
        --main-width: 65.83vw;
        --main-height: calc(100vh);
        --orange : #EA862B;
        --grey: #636F7E;
        --light-grey: #A5B0BD;
        --font-size-12: 0.75rem; /* 12px */
        --font-size-14: 0.875rem; /* 14px */
        --font-size-16: 1rem;    /* 16px, base */
        --font-size-20: 1.25rem; /* 20px */
        --font-size-24: 1.5rem;  /* 24px */
        --font-size-28: 1.75rem; /* 28px */
        --font-size-32: 2rem;    /* 32px */
        --font-size-36: 2.25rem; /* 36px */
        --font-size-48: 3rem; /* 48px */
        --font-size-64: 4rem; /* 64px */
        --font-size-80: 5rem; /* 80px */

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