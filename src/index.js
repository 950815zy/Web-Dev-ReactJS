import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import authReducer from './Store/reducers/auth';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Authorization'] = null;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const logger = createLogger();
const rootReducer = combineReducers({
    auth: authReducer
});
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>    
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();