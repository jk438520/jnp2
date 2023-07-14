import React from "react";
import Toggle from "react-toggle";
import {DarkModeToggleWrapper} from "./DarkModeToggleWrapper";
import {useDispatch, useSelector} from "react-redux";
import {setTheme, toggleTheme} from "../../../themes/reducer";

export const DarkModeToggle = () => {
    const clicked = useSelector(state => state.theme.darkTheme);
    const dispatch = useDispatch();
    return <DarkModeToggleWrapper>
        <h3>Dark Mode</h3>
        <Toggle
            checked={clicked}
            onChange={() => {
                dispatch(toggleTheme())
                }
            }
            icons={false}
        />
    </DarkModeToggleWrapper>
}