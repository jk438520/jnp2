import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {FORECAST_TYPES} from "./const";
import {setCurrentType} from "./reducer";
import {WeatherDisplay} from "./weather-display";

export const Weather = () => {
    const dispatch = useDispatch();
    const currentType = useSelector(state => state.weather.currentType);

    const currentInfo = useSelector(state => state.geolocation.current);
    return (
        <div>
            <h2>Weather</h2>
            <Select
                value={currentType}
                options={FORECAST_TYPES}
                onChange={(e) => dispatch(setCurrentType({currentType: e}))}
            />
            {JSON.stringify(currentInfo)}
            <WeatherDisplay/>
        </div>
    );
}