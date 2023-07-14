import {combineReducers} from 'redux';
import cityChoiceReducer from './containers/geolocation-menu/city-choice/reducer';
import {CITY_CHOICE} from "./containers/geolocation-menu/city-choice/reducer";
import geolocationReducer from './containers/geolocation-menu/reducer';
import {GEOLOCATION} from "./containers/geolocation-menu/reducer";
import weatherReducer from './containers/weather/reducer';
import {WEATHER} from "./containers/weather/reducer";
import imageReducer from './containers/weather/weather-description/weather-gif/reducer';
import {IMAGE} from "./containers/weather/weather-description/weather-gif/reducer";
import themeReducer from './themes/reducer';
import {THEME} from "./themes/reducer";
export const rootReducer = combineReducers({
    [CITY_CHOICE]: cityChoiceReducer,
    [GEOLOCATION]: geolocationReducer,
    [WEATHER]: weatherReducer,
    [IMAGE]: imageReducer,
    [THEME]: themeReducer
});