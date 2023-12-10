// src/globalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    --background-container: ${({ theme }) => theme.backgroundContainer};
    --link-color: ${({ theme }) => theme.linkColor};
    --button-color: ${({ theme }) => theme.button};
    --button-text: ${({ theme }) => theme.buttonText};
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    --img-shadow: ${({ theme }) => theme.boxShadowImg};
    --container-shadow: ${({ theme }) => theme.boxShadowContainers};
    --image-container-colour: ${({ theme }) => theme.imageContainerColour};
    --image-container-colour-secondary: ${({ theme }) => theme.imageContainerColourSecondary};
    transition: all 0.25s linear;
  }
`;

export default GlobalStyles;
