import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as actions from '../../actions'
import ClientApi from '../../WeatherApi';
import {
  Link
} from "react-router-dom";

function ForecastsDemo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.userToken);
  const location = useSelector(state => state.location);
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  const typingLocationTimeout = useSelector(state => state.typingLocationTimeout);
  const client = new ClientApi(userToken);

  if (isUserAuthenticated) {
    history.push("/dashboard");
  }

  if (location.length === 0) {
    dispatch(actions.fiveDaysForecastRequested([]))
    dispatch(actions.typingLocationReset())
  }

  const onChangeLocation = (e) => {
    let value = e.target.value;
    dispatch(actions.locationChanged(value));
    clearTimeout(typingLocationTimeout);
    const requestForecast = setTimeout(() => {
      client.getDemoForecasts(value)
        .then(response => {
            if (response.status !== 200) {
              console.log('Getting Forecasts Failed!');
              return [];
            } else {
              return response.json();
            }
          })
        .then(data => {
            dispatch(actions.fiveDaysForecastRequested(data));
          });
    }, 700);
    dispatch(actions.setTypingLocationTimeout(requestForecast));
  };

  return (
    <section className="jumbotron text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-lg-10 offset-lg-1">
            <h1>Check for Umbrella weather</h1>
              <p className="lead text-muted">Wanna check if you need an Umbrella for this week? Type your location bellow</p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-group">
              <input onChange={onChangeLocation} className="form-control" placeholder="Location"></input>
              <br />
              <Link className="btn btn-warning" to="/plans">Go beyond. Go Premium</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForecastsDemo;