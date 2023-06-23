import React from "react";
import {WeatherDayWrapper} from "./WeatherDayWrapper";

export const WeatherDay = ({data, time = null}) => {
    console.log("weather day", data, time);
    const dateStr = time ? time : data.date;
    const maxtemp_c = data.maxtemp_c;
    const mintemp_c = data.mintemp_c;
    const maxTemp = maxtemp_c ? <div>Max: {maxtemp_c} C</div> : null;
    const minTemp = mintemp_c ? <div>Min: {mintemp_c} C</div> : null;
    return (
        <WeatherDayWrapper>
            <img src={data.condition.icon} alt={data.condition.text}/>
            <div>{dateStr}</div>
            {maxTemp}
            <div>{data.temp_c | data.avgtemp_c} C</div>
            {minTemp}
        </WeatherDayWrapper>
    )
}