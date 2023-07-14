import React from "react";
import Select from "react-select";
import {GeolocationType} from "./geolocation-type";
import {CityChoice} from "./city-choice";
import {DarkModeToggle} from "./dark-mode-toggle"

export const GeolocationMenu = () => {
    return (
        <div>
            <h2>Menu</h2>
            <GeolocationType/>
            <CityChoice/>
            <DarkModeToggle/>
        </div>
    );
}