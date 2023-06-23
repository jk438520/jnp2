import React from "react";
import {useSelector} from "react-redux";
import {stringifyCoords} from "../weather-display/logic";

const R = require('ramda');

const scoreWeather = (weather) => {
    let score = 0;
    const conditions = R.map((forcastday) => forcastday.day.condition.text.toLowerCase(), weather.forecast.forecastday);
    const keywords = ['rain', 'sleet', 'snow', 'thunderstorm', 'drizzle'];
    if (!R.any((keyword) => R.any((condition) => condition.indexOf(keyword) !== -1, conditions), keywords)) {
        console.log("no rain");
        score += 1;
    }
    const avgTemp = R.pipe(
        R.map((forcastday) => forcastday.day.avgtemp_c),
        R.mean,
    )(weather.forecast.forecastday);
    if (18 <= avgTemp && avgTemp <= 25) {
        console.log("avg temp");
        score += 1;
    }
    const minTemps = R.map((forcastday) => forcastday.day.mintemp_c, weather.forecast.forecastday);
    const maxTemps = R.map((forcastday) => forcastday.day.maxtemp_c, weather.forecast.forecastday);
    const minTemp = R.reduce(R.min, Infinity, minTemps);
    const maxTemp = R.reduce(R.max, -Infinity, maxTemps);
    if (15 <= minTemp && maxTemp <= 30) {
        console.log("min/max temp");
        score += 1;
    }
    switch (score) {
        case 0:
        case 1:
            return "not nice";
        case 2:
            return "passable";
        case 3:
            return "nice";
        default:
            return "out of scale";
    }
}

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