import {createSlice} from '@reduxjs/toolkit';
import {FORECAST_TYPES, RESOURCE_STATUS} from "./const";

export const WEATHER = 'weather';
const SET_CURRENT_TYPE = 'setCurrentType';
export const WEATHER_ACTION_SET_CURRENT_TYPE = `${WEATHER}/${SET_CURRENT_TYPE}`;
const SET_CACHED_FORECAST = 'setCachedForecasts';
export const WEATHER_ACTION_SET_CACHED_FORECASTS = `${WEATHER}/${SET_CACHED_FORECAST}`;
const SET_STATUS = 'setStatus';
export const WEATHER_ACTION_SET_STATUS = `${WEATHER}/${SET_STATUS}`;
export const weatherSlice = createSlice({
    name: WEATHER,
    initialState: {
        currentType: FORECAST_TYPES[0],
        cachedForecasts: {
        },
        status: RESOURCE_STATUS.NONE,
    },
    reducers: {
        [SET_CURRENT_TYPE]: (state, action) => {
            state.currentType = action.payload.currentType;
        },
        [SET_CACHED_FORECAST]: (state, action) => {
            for(const key in action.payload.forecasts) {
                state.cachedForecasts[key] = action.payload.forecasts[key];
            }
            state.status = RESOURCE_STATUS.READY;
        },
        [SET_STATUS]: (state, action) => {
            state.status = action.payload.status;
        }
    }
})

export const {setCurrentType} = weatherSlice.actions;

export default weatherSlice.reducer;