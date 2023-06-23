import React from "react";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {clearChoice, setChoice, setSearch} from "./reducer";
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
                    if(e)
                        dispatch(setChoice({choice: e}));
                    else
                        dispatch(clearChoice());
                }}
                onInputChange={(e) => {
                    dispatch(setSearch({search: e}));
                }}
                isOptionSelected={(option) => {
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

