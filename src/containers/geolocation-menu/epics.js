import {ofType, combineEpics} from 'redux-observable';
import {filter, map, mergeMap} from 'rxjs';
import {getUserCoordinates} from "./logic";
import {
    ACTION_CLEAR_CURRENT,
    ACTION_SET_CURRENT,
    ACTION_SET_CURRENT_METHOD,
    BY_CITY_NAME,
    BY_COORDINATES
} from "./reducer";
import { ACTION_SET_CHOICE} from "./city-choice/reducer";

const setMethodToCityEpic = (action$, state$) =>
    action$.pipe(
        ofType(ACTION_SET_CURRENT_METHOD),
        filter(action => action.payload.currentMethod === BY_CITY_NAME),
        map(action => {
                const currentCity = state$.value.cityChoice.choice;
                if (currentCity) {
                    return {
                        type: ACTION_SET_CURRENT,
                        payload: {current: currentCity}
                    }
                } else {
                    return {
                        type: ACTION_CLEAR_CURRENT
                    }
                }
            }
        )
    )

const setMethodToGeoEpic = (action$, state$) =>
    action$.pipe(
        ofType(ACTION_SET_CURRENT_METHOD),
        filter(action => action.payload.currentMethod === BY_COORDINATES),
        mergeMap(action => {
                return getUserCoordinates().then(
                    coords => {
                        if(coords){
                            return {
                                type: ACTION_SET_CURRENT,
                                payload: {current: coords}
                            }
                        } else {
                            return {type: ACTION_CLEAR_CURRENT}
                        }
                    }
                )
            }
        )
    )
const catchCityChangeEpic = (action$, state$) =>
    action$.pipe(
        ofType(ACTION_SET_CHOICE),
        map(action => {
            const currentCity = action.payload.choice;
            console.log("catch city change")
            if (currentCity) {
                return {
                    type: ACTION_SET_CURRENT,
                    payload: {current: currentCity}
                }
            } else {
                return {type: ACTION_CLEAR_CURRENT}
            }
        })
    )

export const geolocationEpic = combineEpics(
    catchCityChangeEpic,
    setMethodToGeoEpic,
    setMethodToCityEpic
);