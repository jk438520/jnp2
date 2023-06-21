import {ofType, combineEpics} from 'redux-observable';
import {mergeMap} from 'rxjs';
import {getGeolocation} from "./logic";
import {
    ACTION_CLEAR_CURRENT,
    ACTION_SET_CURRENT,
    ACTION_SET_CURRENT_METHOD,
    BY_CITY_NAME,
    BY_COORDINATES
} from "./reducer";
import {EMPTY} from "rxjs";

const setCurrentEpic = (action$, state$) =>
    action$.pipe(
        ofType(ACTION_SET_CURRENT_METHOD),
        mergeMap(
            action => {
                const currentMethod = action.payload.currentMethod;
                console.log("setCurrentEpic: ", currentMethod)
                switch (currentMethod) {
                    case BY_CITY_NAME:
                        console.log("by city name");
                        const currentCity = state$.value.cityChoice.choice;
                        if (currentCity) {
                            return {
                                type: ACTION_SET_CURRENT,
                                payload: {current: currentCity}
                            }
                        } else {
                            return {type: ACTION_CLEAR_CURRENT}
                        }
                    case BY_COORDINATES:
                        console.log("by coords");
                        const coords = getGeolocation();
                        if (coords) {
                            return {
                                type: ACTION_SET_CURRENT,
                                payload: {current: coords}
                            }
                        } else {
                            console.log("i get here")
                            return {
                                type: ACTION_CLEAR_CURRENT,
                                payload: {}
                            }
                        }
                    default:
                        return {type: ACTION_CLEAR_CURRENT}
                }
                return EMPTY;
            }
        )
    );

export const geolocationEpic = combineEpics(
    setCurrentEpic,
);