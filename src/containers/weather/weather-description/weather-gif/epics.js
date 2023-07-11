import {filter, map, mergeMap} from "rxjs";
import {ofType, combineEpics} from "redux-observable";
import {WEATHER_ACTION_SET_CACHED_FORECASTS, WEATHER_ACTION_SET_STATUS} from "../../reducer";
import {RESOURCE_STATUS} from "../../const";
import {IMAGE_ACTION_SET_IMAGE, IMAGE_ACTION_SET_STATUS} from "./reducer";
import {TENOR_API, TENOR_API_KEY} from "../../../../config";
import {stringifyCoords} from "../../weather-display/logic";


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
    mergeMap(() => {
            const query = stringifyCoords(state$.value.geolocation.current);
            console.log('fetchGifEpic', query)
            const cachedForecast = state$.value.weather.cachedForecasts[query];
            console.log('fetchGifEpic', cachedForecast)
            const weatherText = cachedForecast.current.condition.text;
            console.log('fetchGifEpic', weatherText)
            return fetch(`${TENOR_API}key=${TENOR_API_KEY}&q="${weatherText}"&limit=1&random=true`)
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
        }
    )
)

export const imageEpic = combineEpics(
    initGifChangeEpic,
    fetchGifEpic
);