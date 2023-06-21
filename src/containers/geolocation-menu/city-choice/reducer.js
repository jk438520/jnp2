import {createSlice} from '@reduxjs/toolkit';

export const CITY_CHOICE = 'cityChoice';

const SET_SEARCH = 'setSearch';
export const ACTION_SET_SEARCH = `${CITY_CHOICE}/${SET_SEARCH}`;
const CLEAR_SEARCH = 'clearSearch';
export const ACTION_CLEAR_SEARCH = `${CITY_CHOICE}/${CLEAR_SEARCH}`;
const SET_CHOICE = 'setChoice';
export const ACTION_SET_CHOICE = `${CITY_CHOICE}/${SET_CHOICE}`;
const CLEAR_CHOICE = 'clearChoice';
export const ACTION_CLEAR_CHOICE = `${CITY_CHOICE}/${CLEAR_CHOICE}`;
const SET_SUGGESTIONS = 'setSuggestions';
export const ACTION_SET_SUGGESTIONS = `${CITY_CHOICE}/${SET_SUGGESTIONS}`;


const initialState = {
    search: "",
    suggestions: [],
    choice: null,
}

const cityChoiceSlice = createSlice({
    name: CITY_CHOICE,
    initialState,
    reducers: {
        [SET_SEARCH]: (state, action) => {
            state.search = action.payload.search;
        },
        [CLEAR_SEARCH]: (state, action)=> {
            state.search = '';
            state.suggestions = [];
        },
        [SET_CHOICE]: (state, action)=> {
            state.choice = action.payload.choice;
            if(state.choice === null)
                state.search = '';
            else
                state.search = action.payload.choice.name;
        },
        [CLEAR_CHOICE]: (state, action)=> {
            state.choice = null;
            state.search = '';
        },
        [SET_SUGGESTIONS]:(state, action)=> {
            state.suggestions = action.payload.suggestions;
        },
    }
});

export default cityChoiceSlice.reducer;
export const {setSearch, clearSearch, clearChoice, setChoice, setSuggestions} = cityChoiceSlice.actions;