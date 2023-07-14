import {createSlice, current} from "@reduxjs/toolkit";

export const GEOLOCATION = 'geolocation';
export const BY_CITY_NAME = 'byCityName';
export const BY_COORDINATES = 'byCoordinates';

export const STATUS_AVAILABLE = 'available';
export const STATUS_UNAVAILABLE = 'unavailable';
export const STATUS_LOADING = 'loading';

const SET_CURRENT = 'setCurrent';
export const ACTION_SET_CURRENT = `${GEOLOCATION}/${SET_CURRENT}`;
const SET_STATUS = 'setStatus';
export const ACTION_SET_STATUS = `${GEOLOCATION}/${SET_STATUS}`;
const SET_CURRENT_METHOD = 'setCurrentMethod';
export const ACTION_SET_CURRENT_METHOD = `${GEOLOCATION}/${SET_CURRENT_METHOD}`;
const CLEAR_CURRENT = 'clearCurrent';
export const ACTION_CLEAR_CURRENT = `${GEOLOCATION}/${CLEAR_CURRENT}`;

const geolocationSlice = createSlice({
    name: GEOLOCATION,
    initialState: {
        current: null,
        status: STATUS_UNAVAILABLE,
        currentMethod: BY_CITY_NAME,
        availableGeolocationMethods: [
            {value: BY_CITY_NAME, label: 'By City Name'},
            {value: BY_COORDINATES, label: 'By Coordinates'},
        ],
    },
    reducers: {
        [SET_CURRENT]: (state, action) => {
            state.current = action.payload.current;
            state.status = STATUS_AVAILABLE;
        },
        [SET_STATUS]: (state, action) => {
            state.status = action.payload.status;
        },
        [SET_CURRENT_METHOD]: (state, action) => {
            state.currentMethod = action.payload.currentMethod;
        },
        [CLEAR_CURRENT]: (state, action) => {
            state.current = null;
            state.status = STATUS_UNAVAILABLE;
        }
    }
})

export const geolocationIsChosen = (state) => state.current !== null
export const selectCurrentGeolocation = (state) => state.current
export const {setCurrent, setStatus, setCurrentMethod, clearCurrent} = geolocationSlice.actions;

export default geolocationSlice.reducer;
