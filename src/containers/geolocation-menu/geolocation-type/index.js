import React from "react";
import Select from "react-select";
import {setCurrentMethod} from "../reducer";
import {useDispatch, useSelector} from "react-redux";

export const GeolocationType = () => {
    const dispatch = useDispatch();
    const options = useSelector(state => state.geolocation.availableGeolocationMethods)
    return (
        <div>
            <h3>Geolocation Type</h3>
            <Select
                name={"geolocationType"}
                options={options}
                defaultValue={options[0]}
                onChange={
                    (e) =>
                        dispatch(setCurrentMethod({currentMethod: e.value}))
                }

            />
        </div>
    );
}