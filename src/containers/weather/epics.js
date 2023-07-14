import {combineEpics, ofType} from "redux-observable";
import {
    forecastIsOld,
    selectCurrentForecast,
    WEATHER_ACTION_SET_CACHED_FORECASTS,
    WEATHER_ACTION_SET_CURRENT_TYPE,
    WEATHER_ACTION_SET_STATUS
} from "./reducer";
import {mergeMap} from "rxjs/operators";
import {EMPTY, filter, map, Observable} from "rxjs";
import {stringifyCoords} from "./weather-display/logic";
import {WEATHER_API_KEY, WEATHER_API} from "../../config";
import {
    ACTION_CLEAR_CURRENT,
    ACTION_SET_CURRENT,
    geolocationIsChosen,
    selectCurrentGeolocation
} from "../geolocation-menu/reducer";
import {RESOURCE_STATUS} from "./const";

const loadingWeatherForecastEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_CURRENT),
    map(action => {
            const query = stringifyCoords(action.payload.current);
            const cachedForecast = selectCurrentForecast(state$.value.weather, query)
            return {
                type: WEATHER_ACTION_SET_STATUS,
                payload: {
                    status: cachedForecast ? RESOURCE_STATUS.READY : RESOURCE_STATUS.LOADING
                }
            }
        }
    )
);

const noGeolocationEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_CURRENT, ACTION_CLEAR_CURRENT),
    filter(() => !geolocationIsChosen(state$.value.geolocation)),
    map(() => {
            return {
                type: WEATHER_ACTION_SET_STATUS,
                payload: {status: RESOURCE_STATUS.NONE}
            }
        }
    )
);

const fetchWeatherForecastEpic = (action$, state$) => action$.pipe(
    ofType(WEATHER_ACTION_SET_CURRENT_TYPE, ACTION_SET_CURRENT),
    filter(() => geolocationIsChosen(state$.value.geolocation)),
    filter(() => {
        const query = stringifyCoords(selectCurrentGeolocation(state$.value.geolocation));
        return forecastIsOld(state$.value.weather, query);
    }),
    mergeMap(
        action => {
            const query = stringifyCoords(selectCurrentGeolocation(state$.value.geolocation));
            return fetch(`${WEATHER_API}/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=3`)
                .then(response => response.json())
                .then(data => ({
                        type: WEATHER_ACTION_SET_CACHED_FORECASTS,
                        payload: {
                            forecasts: {
                                [query]: data
                            }
                        }
                    })
                ).catch(error => ({
                            type: WEATHER_ACTION_SET_STATUS,
                            payload: {
                                status: RESOURCE_STATUS.ERROR
                            }
                        }
                    )
                )
        }
    )
)


export const weatherEpic = combineEpics(
    loadingWeatherForecastEpic,
    noGeolocationEpic,
    fetchWeatherForecastEpic,
);