import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 50px;
        font-family: ${props => props.theme.fonts.main};
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
      
    }
    `;