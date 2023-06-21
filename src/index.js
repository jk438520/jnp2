import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './containers/app';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {createEpicMiddleware} from "redux-observable";
import {rootReducer} from "./reducer";
import {rootEpic} from "./epics";
import {setSearch} from "./containers/geolocation-menu/city-choice/reducer";

const DEBUG = true;

const epicMiddleware = createEpicMiddleware();


const confStore = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
    devTools: DEBUG
})

epicMiddleware.run(rootEpic);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={confStore}>
        <App/>
    </Provider>
);

confStore.dispatch(setSearch({search: ""}));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
