import {combineEpics} from 'redux-observable';

import {cityChoiceEpic} from './containers/geolocation-menu/city-choice/epics';
import {geolocationEpic} from './containers/geolocation-menu/epics';
import {weatherEpic} from './containers/weather/epics';
import {imageEpic} from './containers/weather/weather-description/weather-gif/epics';
export const rootEpic = combineEpics(
    cityChoiceEpic,
    geolocationEpic,
    weatherEpic,
    imageEpic
);