import {combineReducers} from 'redux';
import cityChoiceReducer from './containers/geolocation-menu/city-choice/reducer';
import {CITY_CHOICE} from "./containers/geolocation-menu/city-choice/reducer";
import geolocationReducer from './containers/geolocation-menu/reducer';
import {GEOLOCATION} from "./containers/geolocation-menu/reducer";
export const rootReducer = combineReducers({
    [CITY_CHOICE]: cityChoiceReducer,
    [GEOLOCATION]: geolocationReducer,
});