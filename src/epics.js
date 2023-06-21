import {combineEpics} from 'redux-observable';

import {cityChoiceEpic} from './containers/geolocation-menu/city-choice/epics';
import {geolocationEpic} from './containers/geolocation-menu/epics';
export const rootEpic = combineEpics(
    cityChoiceEpic,
    geolocationEpic,
);