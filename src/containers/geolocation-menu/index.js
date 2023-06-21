import React from "react";
import Select from "react-select";
import {GeolocationType} from "./geolocation-type";
import {CityChoice} from "./city-choice";


export const GeolocationMenu = () => {
    return (
        <div>
            <h2>Geolocation Menu</h2>
            <GeolocationType/>
            <CityChoice/>
        </div>
    );
}