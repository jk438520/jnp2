import React from "react";
import {CityChoice} from "../geolocation-menu/city-choice";
import {Weather} from "../weather";
import {GeolocationMenu} from "../geolocation-menu";
import {MainComponentsWrapper} from "./MainComponentsWrapper";


export const Forecast = () => {
    return (
        <>
            <h1>Forecast</h1>
            <MainComponentsWrapper>
                <GeolocationMenu/>
                <Weather/>
            </MainComponentsWrapper>
        </>
    );
}

