import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from '../../themes';
import {GlobalStyle} from '../../global-styles';
import {Forecast} from '../forecast';
import {useSelector} from "react-redux";

export const App = () => {
        const theme = useSelector(state => {
            if (state.theme.darkTheme) {
                return darkTheme;
            } else {
                return lightTheme;
            }
        });
        return (<ThemeProvider theme={theme}>
                    <GlobalStyle/>

                    <Forecast/>
            </ThemeProvider>
        )
    }
;

