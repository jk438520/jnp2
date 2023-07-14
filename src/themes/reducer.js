import {createSlice} from '@reduxjs/toolkit';

export const THEME = 'theme';
export const TOGGLE_THEME = 'toggleTheme';
export const THEME_ACTION_TOGGLE_THEME = `${THEME}/${TOGGLE_THEME}`;

export const themeSlice = createSlice({
    name: THEME,
    initialState: {
        darkTheme: false,
    },
    reducers: {
        [TOGGLE_THEME]: (state, action) => {
            state.darkTheme = !state.darkTheme;
            console.log('in reducer', state.darkTheme);
        }
    }
})

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;