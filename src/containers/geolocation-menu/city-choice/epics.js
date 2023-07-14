import {ofType, combineEpics} from 'redux-observable';
import {mergeMap} from 'rxjs';
import {ACTION_SET_SEARCH, ACTION_SET_SUGGESTIONS} from "./reducer";
import {WEATHER_API, WEATHER_API_KEY} from "../../../config";

const fetchAutocompleteEpic = (action$, state$) => action$.pipe(
    ofType(ACTION_SET_SEARCH),
    mergeMap(
        action => {
            const search = action.payload.search;
            return fetch(`${WEATHER_API}/search.json?key=${WEATHER_API_KEY}&q=''${search}`)
                .then(response => response.json())
                .then(data => {
                        return {
                            type: ACTION_SET_SUGGESTIONS,
                            payload: {
                                suggestions: data
                            },
                        }
                    }
                ).catch(
                    () => {
                        return {
                            type: ACTION_SET_SUGGESTIONS,
                            payload: {
                                suggestions: []
                            },
                        }
                    }
                )
        }
    )
);


export const cityChoiceEpic = combineEpics(
    fetchAutocompleteEpic,
);