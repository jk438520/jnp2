import React from "react";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {setChoice, setSearch} from "./reducer";
import {BY_CITY_NAME} from "../reducer";

export const CityChoice = () => {
    const dispatch = useDispatch();
    const choice = useSelector(state => state.cityChoice.choice);
    const suggestions = useSelector(state => state.cityChoice.suggestions);
    const currentMethod = useSelector(state => state.geolocation.currentMethod)
    return (
        <>
            <h3>City Choice</h3>
            <Select
                name={"cityChoice"}
                value={choice}
                isClearable={true}
                isDisabled={currentMethod.localeCompare(BY_CITY_NAME)}
                onChange={(e) => {
                    console.log("onChange e: ", e);
                    dispatch(setChoice({choice: e}));
                }}
                onInputChange={(e) => {
                    console.log("onInputChange e: ", e);
                    dispatch(setSearch({search: e}));
                }}
                isOptionSelected={(option) => {
                    console.log("isOptionSelected option: ", option);
                    if (choice === null)
                        return false;
                    else {
                        return choice.name === option.name;
                    }
                }}
                options={suggestions}
                getOptionLabel={(option) => option.name}
            />
        </>
    )
}

