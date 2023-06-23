import {combineEpics, ofType} from "redux-observable";
import {ACTION_SET_CACHED_FORECASTS, ACTION_SET_CURRENT_TYPE, ACTION_SET_STATUS} from "./reducer";
import {mergeMap} from "rxjs/operators";
import {EMPTY, filter, map, Observable} from "rxjs";
import {stringifyCoords} from "./weather-display/logic";
import {API_KEY, WEATHER_API} from "../../config";
import {ACTION_CLEAR_CURRENT, ACTION_SET_CURRENT} from "../geolocation-menu/reducer";
import {FORECAST_STATUS} from "./const";

const loadingWeatherForecastEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_CURRENT),
    map(action => {
            const query = stringifyCoords(action.payload.current);
            const cachedForecast = state$.value.weather.cachedForecasts[query];
            if (!cachedForecast) {
                return {
                    type: ACTION_SET_STATUS,
                    payload: {status: FORECAST_STATUS.LOADING}
                }
            } else {
                return {
                    type: ACTION_SET_STATUS,
                    payload: {status: FORECAST_STATUS.READY}
                };
            }
        }
    )
);

const noGeolocationEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_CURRENT, ACTION_CLEAR_CURRENT),
    filter(() => !state$.value.geolocation.current),
    map(() => {
            return {
                type: ACTION_SET_STATUS,
                payload: {status: FORECAST_STATUS.NONE}
            }
        }
    )
);

const fetchWeatherForecastEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_CURRENT_TYPE, ACTION_SET_CURRENT),
    filter(() => state$.value.geolocation.current),
    filter(() => {
        const query = stringifyCoords(state$.value.geolocation.current);
        const cachedForecast = state$.value.weather.cachedForecasts[query];
        console.log("cachedForecast", cachedForecast);
        const currTime = new Date().getTime();
        console.log("currTime", currTime);
        if(cachedForecast) {
            console.log("cachedForecast.current.last_updated_epoch", cachedForecast.current.last_updated_epoch);
        } else {
            console.log("cachedForecast.current.last_updated_epoch", "undefined");
        }
        const cacheIs15Min = cachedForecast && ((cachedForecast.current.last_updated_epoch + 15 * 60) * 1000 < currTime)
        console.log("cacheIs15Min", cacheIs15Min);
        console.log("!cachedForecast || cacheIs15Min", !cachedForecast || cacheIs15Min);
        return !cachedForecast || cacheIs15Min;
    }),
    mergeMap(
        action => {
            console.log("fetch weather forecast");
            const query = stringifyCoords(state$.value.geolocation.current);
            return fetch(`${WEATHER_API}/forecast.json?key=${API_KEY}&q=${query}&days=3`)
                .then(response => response.json())
                .then(data => {
                        return {
                            type: ACTION_SET_CACHED_FORECASTS,
                            payload: {
                                forecasts: {
                                    [query]: data
                                }
                            },
                        }
                    }
                )
        }
    )
)


export const weatherEpic = combineEpics(
    loadingWeatherForecastEpic,
    noGeolocationEpic,
    fetchWeatherForecastEpic,
);