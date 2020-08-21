import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from  './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import App from './components/forecasts/ForecastsDemo';
import Forecasts from './components/forecasts/Forecasts';
import Plans from './components/Plans';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Dashboard from './components/Dashboard';

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <main role="main">
              <App />
              <div className="py-5 bg-light">
                <Forecasts />
              </div>
            </main>
          </Route>
          <Route path="/plans">
            <Plans />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
