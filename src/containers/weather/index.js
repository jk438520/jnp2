import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {FORECAST_TYPES} from "./const";
import {setCurrentType} from "./reducer";
import {WeatherDisplay} from "./weather-display";
import {WeatherDescription} from "./weather-description";

export const Weather = () => {
    const dispatch = useDispatch();
    const currentType = useSelector(state => state.weather.currentType);
    const gifurl = useSelector(state => state.image.image);
    return (
        <div>
            <h2>Weather</h2>
            <WeatherDescription/>
            <Select
                value={currentType}
                options={FORECAST_TYPES}
                onChange={(e) => dispatch(setCurrentType({currentType: e}))}
            />
            <WeatherDisplay/>
            <img src={gifurl} alt="gif"/>
        </div>
    );
}