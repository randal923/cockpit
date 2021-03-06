import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    html,
    body {
		margin: 0;
		font-weight: 400;
        padding: 0;
        font-size: 62.5%;
        height: calc(100% - 70px);
        background: var(--border-color);
        -webkit-font-smoothing: antialiased !important;
				font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
				Helvetica Neue, sans-serif;
    }

    ul {
      list-style-type: none;
    }
    
    #__next {
        height: 100%;
    }
    * {
        box-sizing: border-box;
    }

    h2 {
        font-size: 1.6rem;
        margin-bottom: 5px;
        color: var(--h2-color);
    }

    a {
        text-decoration: none;
        color: white;
    }
    :root {
        --black: #000000;
        --brighter-black: #121212;
        --select-background: #222;
        --white: #ffffff;
        --dark-white: #f8f8f8;
        --darker-white: #e9e9e9;
        --border-color: #f0f0f0;
        --light-grey: #f4f4f4;
        --medium-grey: #ccc;
        --material-border: 1px solid #8b8b8b;

        --h2-color: #999999;

        --red: #ed1c24;
        --grey: #545454;
        --dark-grey: #121212;
        --darker-grey: #292929;
        --text-dark-grey: #414141;
        --text-grey: #8e8e8e;
        --blue:  #654edb;


        --box-shadow: 1px 0px 2px rgba(0,0,0,0.25);
        --border: solid 0.5px var(--border-color);
        --button-hover: #c80a2e;
    }
`
