import React from "react";
import {useSelector} from "react-redux";
import {stringifyCoords} from "../weather-display/logic";
import {scoreWeather} from "./logic";

export const WeatherDescription = () => {
    const status = useSelector(state => state.weather.status);
    const currentQuery = useSelector(state => stringifyCoords(state.geolocation.current));
    const currentForecast = useSelector(state => state.weather.cachedForecasts[currentQuery]);
    switch (status) {
        case "ready":
            return (<>
                Weather is {scoreWeather(currentForecast)}.
            </>);
        default:
            return;
    }
}