import {combineEpics, ofType} from "redux-observable";
import {ACTION_SET_CACHED_FORECASTS, ACTION_SET_CURRENT_TYPE} from "./reducer";
import {mergeMap} from "rxjs/operators";
import {filter, Observable} from "rxjs";
import {stringifyCoords} from "./weather-display/logic";
import {API_KEY, WEATHER_API} from "../../config";
import {ACTION_SET_CURRENT} from "../geolocation-menu/reducer";

const fetchWeatherForecastEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_CURRENT_TYPE, ACTION_SET_CURRENT),
    filter(() => state$.value.geolocation.current !== null),
    mergeMap(
        action => {
            console.log("fetch weather forecast");
            const query = stringifyCoords(state$.value.geolocation.current);
            const cachedForecast = state$.value.weather.cachedForecasts[query];
            const cacheIs15Min = cachedForecast && cachedForecast.current.last_updated_epoch + 15 * 60 * 1000 > Date.now();
            console.log("cachedForecast", cachedForecast);

            if (!cachedForecast || cacheIs15Min) {
                return fetch(`${WEATHER_API}/forecast.json?key=${API_KEY}&q=${query}&days=3`)
                    .then(response => response.json())
                    .then(data => {
                            console.log(data);
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
            } else {
                return new Observable(observer => {
                    console.log("caching is working");
                    observer.next({
                        type: ACTION_SET_CACHED_FORECASTS,
                        payload: {
                            forecasts: {
                                [query]: cachedForecast
                            }
                        },
                    });
                    observer.complete();
                })
            }

        }
    )
)

export const weatherEpic = combineEpics(
    fetchWeatherForecastEpic,
);