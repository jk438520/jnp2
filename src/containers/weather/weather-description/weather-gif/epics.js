import {filter, map, mergeMap} from "rxjs";
import {ofType, combineEpics} from "redux-observable";
import {WEATHER_ACTION_SET_CACHED_FORECASTS, WEATHER_ACTION_SET_STATUS} from "../../reducer";
import {RESOURCE_STATUS} from "../../const";


const initGifChangeEpic = (action$, state$) => action$.pipe(
    ofType(WEATHER_ACTION_SET_CACHED_FORECASTS, WEATHER_ACTION_SET_STATUS),
    filter(() => state$.value.weather.status === RESOURCE_STATUS.READY),
    map(() => {
            switch (state$.value.weather.status) {
                case RESOURCE_STATUS.READY:
                    return {
                        type: WEATHER_ACTION_SET_STATUS,
                        payload: {status: RESOURCE_STATUS.LOADING}
                    }
                default:
                    return {
                        type: WEATHER_ACTION_SET_STATUS,
                        payload: {status: RESOURCE_STATUS.NONE}
                    }
            }
        }
    )
);
