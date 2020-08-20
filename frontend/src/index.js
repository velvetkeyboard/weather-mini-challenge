import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Forecasts from './Forecasts';
import * as serviceWorker from './serviceWorker';
import store from  './store';
import { Provider } from 'react-redux';

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Forecasts />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
