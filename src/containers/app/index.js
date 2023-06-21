import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes';
import { GlobalStyle } from '../../global-styles';

import {Forecast} from '../forecast';

export const App = () => (
    <ThemeProvider theme={theme}>
        <>
            <GlobalStyle />

            <Forecast />
        </>
    </ThemeProvider>
);

