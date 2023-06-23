import {createSlice} from '@reduxjs/toolkit';
import {FORECAST_TYPES, FORECAST_STATUS} from "./const";

export const WEATHER = 'weather';
const SET_CURRENT_TYPE = 'setCurrentType';
export const ACTION_SET_CURRENT_TYPE = `${WEATHER}/${SET_CURRENT_TYPE}`;
const SET_CURRENT_FORECAST = 'setCurrentForecast';
export const ACTION_SET_CURRENT_FORECAST = `${WEATHER}/${SET_CURRENT_FORECAST}`;
const SET_CACHED_FORECAST = 'setCachedForecasts';
export const ACTION_SET_CACHED_FORECASTS = `${WEATHER}/${SET_CACHED_FORECAST}`;
const SET_STATUS = 'setStatus';
export const ACTION_SET_STATUS = `${WEATHER}/${SET_STATUS}`;
export const weatherSlice = createSlice({
    name: WEATHER,
    initialState: {
        currentType: FORECAST_TYPES[0],
        cachedForecasts: {
        },
        status: 'none',
    },
    reducers: {
        [SET_CURRENT_TYPE]: (state, action) => {
            state.currentType = action.payload.currentType;
        },
        [SET_CACHED_FORECAST]: (state, action) => {
            for(const key in action.payload.forecasts) {
                state.cachedForecasts[key] = action.payload.forecasts[key];
            }
            state.status = FORECAST_STATUS.READY;
        },
        [SET_STATUS]: (state, action) => {
            state.status = action.payload.status;
        }
    }
})

export const {setCurrentType} = weatherSlice.actions;

export default weatherSlice.reducer;