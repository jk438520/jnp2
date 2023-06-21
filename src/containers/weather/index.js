import React from "react";
import {useSelector} from "react-redux";

export const FORECAST_TYPES = {
    HOURLY: 'HOURLY',
    DAILY: 'DAILY',
    CURRENT: 'CURRENT',
}

export const Weather = () => {
    const cityInfo = useSelector(state => state.cityChoice.choice);
    return (
        <div>
            <h1>Weather</h1>
            {JSON.stringify(cityInfo)}
            {}
        </div>
    );
}