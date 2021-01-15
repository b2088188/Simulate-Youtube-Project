import { createGlobalStyle } from 'styled-components';
import {media} from './utils';

const GlobalStyle = createGlobalStyle`
html {
    font-size: 62.5%;
     font-family: 'Open Sans', sans-serif;
     ${media.tabland(`
        font-size: 56.25%;
      `)}
     ${media.tabport(`
        font-size: 50%;
      `)}
}
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: inherit;
}

 
body {
    box-sizing: border-box;
    font-weight: 400;
    line-height: 1.6;
    min-height: 100vh;
      color: var(--color-grey-dark-2);
    background-color: var(--color-grey-light-1);  
}


//////////////////////
// Base
:root {
  --color-primary: #eb2f64;
  --color-primary-light: #FF3366;
  --color-primary-dark: #BA265D;

--color-grey-light-1: #faf9f9;
--color-grey-light-2: #f4f2f2;
--color-grey-light-3: #f0eeee;
--color-grey-light-4: #ccc;

--color-grey-dark-1: #333;
--color-grey-dark-2: #777;
--color-grey-dark-3: #999;

--shadow-dark:0 2rem 6rem rgba(0,0,0, .3);
--shadow-dark-shallow:0 1rem 2rem rgba(0,0,0, .3);
--shadow-light: 0 2rem 5rem rgba(0,0,0, .06);
--line: solid .1rem var(--color-grey-light-2);
}

//1200px
$bp-largest: 75em;
//1100px
$bp-large: 68.75em;
//900px
$bp-medium: 56.25em;
//600px
$bp-small: 37.5em;
//500px
$bp-tiny: 31.5em;
`;

export default GlobalStyle;
