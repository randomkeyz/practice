import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    /* Box sizing rules */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Remove default margin */
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin: 0;
    }

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    ul[role='list'],
    ol[role='list'] {
        list-style: none;
    }

    /* Set core root defaults */
    html:focus-within {
        scroll-behavior: smooth;
    }

    /* Set core body defaults */
    body {
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
    }

    /* A elements that don't have a class get default styles */
    a:not([class]) {
        text-decoration-skip-ink: auto;
    }

    /* Make images easier to work with */
    img,
    picture {
        max-width: 100%;
        display: block;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
        html:focus-within {
        scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }

    @font-face {
        font-family: 'Open Sans';
        src:    url('./../assets/fonts/OpenSans-Regular.woff2') format('woff2'),
                url('./../assets/fonts/OpenSans-Regular.woff') format('woff'),
                url('./../assets/fonts/OpenSans-Regular.ttf') format('truetype');
    }
    
    body{
        /*background: ${({ theme }) => theme.colors.body}*/
        font: normal 16px 'Open Sans', serif;
    }

    button {
        background: #3FA2F7;
        border: none;
        color: #fff;
        font-weight: bold;
        width: 5.8125em;
        height: 2.1875em;
        border-radius: 0.3em;
    }

    input {
        padding: 0.4em 0.7em;
        border-radius: 0.4em;
        border: 1px solid ${props => props.theme.colors.lightGray};
        height: 2.5em;
        margin: 0.3em 0;
        width: 100%;
    }
`;

export default GlobalStyles;