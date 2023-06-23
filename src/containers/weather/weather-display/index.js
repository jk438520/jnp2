import React from "react";
import {DotLoader} from "react-spinners";
import {useSelector} from "react-redux";
import {FORECAST_STATUS} from "../const";
import {stringifyCoords} from "./logic";
import {WeatherDay} from "./weather-day";
import {WeatherDisplayWrapper} from "./WeatherDisplayWrapper";

const R = require('ramda');

const timestampWithinDay = (timestamp) => {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const date = new Date(timestamp * 1000);
    console.log("timestamp within day", now, date, nextDay);
    return date >= now && date <= nextDay;
}

export const WeatherDisplay = () => {
    const status = useSelector(state => state.weather.status);
    const currentQuery = useSelector(state => stringifyCoords(state.geolocation.current));
    const currentType = useSelector(state => state.weather.currentType);
    const currentForecast = useSelector(state => state.weather.cachedForecasts[currentQuery]);
    console.log("rerender of weather display", status, currentQuery, currentForecast);

    switch (status) {
        case FORECAST_STATUS.LOADING:
            return (<>
                <DotLoader/>
            </>);
        case FORECAST_STATUS.ERROR:
            return (<>
                There was an error loading the forecast.
            </>);
        case FORECAST_STATUS.READY:
            switch (currentType.value) {
                case 'current':
                    console.log("current forecast", currentForecast.current)
                    return (
                        <WeatherDisplayWrapper>
                            <WeatherDay data={currentForecast.current} time={currentForecast.current.last_updated}/>
                        </WeatherDisplayWrapper>
                    )
                case 'hourly':
                    const forecasts =
                        R.pipe(
                            R.map((forecast) => forecast.hour),
                            R.flatten,
                            R.filter((forecast) => timestampWithinDay(forecast.time_epoch)),
                        )(currentForecast.forecast.forecastday);
                    console.log("hourly forecasts", forecasts);
                    return (<WeatherDisplayWrapper>
                        {R.map((forecast) => <WeatherDay data={forecast} time={forecast.time}/>, forecasts)}
                    </WeatherDisplayWrapper>)
                case 'daily':
                    return (<WeatherDisplayWrapper>
                        {R.map((forecastday) => <WeatherDay data={forecastday.day}
                                                            time={forecastday.date}/>, currentForecast.forecast.forecastday)}
                    </WeatherDisplayWrapper>)
                default:
                    return (<>
                        PLACEHOLDER
                    </>)
            }
        case FORECAST_STATUS.NONE:
        default:
            return (<></>)
    }
}