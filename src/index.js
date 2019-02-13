import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import react router dom

import './index.css';
import App from './App';
// import AllReducers from './Reducers/AllReducers';
import AuthReducer from './Reducers/AuthReducer';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(AuthReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
