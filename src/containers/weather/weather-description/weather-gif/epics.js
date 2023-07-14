import {filter, map, interval, switchMap, takeUntil} from "rxjs";
import {ofType, combineEpics} from "redux-observable";
import {WEATHER_ACTION_SET_CACHED_FORECASTS, WEATHER_ACTION_SET_STATUS} from "../../reducer";
import {RESOURCE_STATUS} from "../../const";
import {IMAGE_ACTION_SET_IMAGE, IMAGE_ACTION_SET_STATUS} from "./reducer";
import {TENOR_API, TENOR_API_KEY} from "../../../../config";
import {stringifyCoords} from "../../weather-display/logic";

const gifTimer = 30000

const initGifChangeEpic = (action$, state$) => action$.pipe(
    ofType(WEATHER_ACTION_SET_CACHED_FORECASTS, WEATHER_ACTION_SET_STATUS),
    filter(() => state$.value.weather.status === RESOURCE_STATUS.READY),
    map(() => {
            console.log('initGifChangeEpic')
            switch (state$.value.weather.status) {
                case RESOURCE_STATUS.READY:
                    return {
                        type: IMAGE_ACTION_SET_STATUS,
                        payload: {status: RESOURCE_STATUS.LOADING}
                    }
                default:
                    return {
                        type: IMAGE_ACTION_SET_STATUS,
                        payload: {status: RESOURCE_STATUS.NONE}
                    }
            }
        }
    )
);

const fetchGifEpic = (action$, state$) => action$.pipe(
    ofType(IMAGE_ACTION_SET_STATUS),
    filter(action => action.payload.status === RESOURCE_STATUS.LOADING),
    switchMap(() => interval(gifTimer).pipe(
        switchMap(()=> {
            const query = stringifyCoords(state$.value.geolocation.current);
            const cachedForecast = state$.value.weather.cachedForecasts[query];
            const weatherText = cachedForecast.current.condition.text;
            console.log("starting gif fetch")
            return fetch(`${TENOR_API}key=${TENOR_API_KEY}&q="${weatherText}"&limit=1&random=true&ContentFilter=high`)
                    .then(response => response.json())
                    .then(data => {
                            console.log('fetchGifEpic', data)
                            return {
                                type: IMAGE_ACTION_SET_IMAGE,
                                payload: {
                                    image: data.results[0].media_formats.gif.url
                                },
                            }
                        }
                    )
        }),
        takeUntil(action$.pipe(
            ofType(IMAGE_ACTION_SET_STATUS),
            filter(action => action.payload.status === RESOURCE_STATUS.LOADING || action.payload.status === RESOURCE_STATUS.LOADING)
        ))
    )
    )
)






export const imageEpic = combineEpics(
    initGifChangeEpic,
    fetchGifEpic
);