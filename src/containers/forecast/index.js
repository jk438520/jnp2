import React from "react";
import {CityChoice} from "../geolocation-menu/city-choice";
import {Weather} from "../weather";
import {GeolocationMenu} from "../geolocation-menu";


export const Forecast = () => {
    return (
        <div>
            <h1>Forecast</h1>
            <GeolocationMenu/>
            <Weather/>
        </div>
    );
}

