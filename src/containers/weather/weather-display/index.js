import React from "react";
import {DotLoader} from "react-spinners";
import {useSelector} from "react-redux";
import {RESOURCE_STATUS} from "../const";
import {stringifyCoords} from "./logic";
import {WeatherDay} from "./weather-day";
import {WeatherDisplayWrapper} from "./WeatherDisplayWrapper";

const R = require('ramda');

const timestampWithinDay = (timestamp) => {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const date = new Date(timestamp * 1000);
    return date >= now && date <= nextDay;
}

export const WeatherDisplay = () => {
    const status = useSelector(state => state.weather.status);
    const currentQuery = useSelector(state => stringifyCoords(state.geolocation.current));
    const currentType = useSelector(state => state.weather.currentType);
    const currentForecast = useSelector(state => state.weather.cachedForecasts[currentQuery]);

    switch (status) {
        case RESOURCE_STATUS.LOADING:
            return (<>
                <DotLoader/>
            </>);
        case RESOURCE_STATUS.ERROR:
            return (<>
                There was an error loading the forecast.
            </>);
        case RESOURCE_STATUS.READY:
            switch (currentType.value) {
                case 'current':
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
        case RESOURCE_STATUS.NONE:
        default:
            return (<></>)
    }
}