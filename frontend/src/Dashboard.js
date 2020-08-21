import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Route,
  Switch,
} from "react-router-dom";
import ClientApi from './WeatherApi';
import * as actions from './actions';
import PremiumForecasts from './PremiumForecasts';
// import NewLocation from './NewLocation';

function Dashboard() {
  const history = useHistory();
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  if (!isUserAuthenticated) {
    history.push("/signin");
  }

  const dispatch = useDispatch();
  const userToken = useSelector(state => state.userToken);
  const location = useSelector(state => state.location);
  const userLocations = useSelector(state => state.userLocations);
  const client = new ClientApi(userToken);

  const onClickDeleteLocation = (locationId) => {
    client.deleteLocation(locationId)
      .then(response => {
          if (response.status == 204) {
            return {};
          } else {
            return {};
          }
        })
      .then(data => {
          dispatch(actions.locationChanged(''));
          client.getLocations()
            .then(response => {
                if (response.status === 200) {
                  return response.json();
                } else {
                  throw Error(response);
                }
              })
            .then(data => {
                dispatch(actions.updateUserSavedLocations(data));
              })
            .catch(error => {
                console.log(error);
              });

        });
  }

  const onClickSavedLocation = (locationName) => {
    console.log("onClickSavedLocation");
    dispatch(actions.locationChanged(locationName));
    client.getForecasts(locationName)
      .then(response => {
          if (response.status !== 200) {
            console.log('Getting Forecasts Failed');
          } else {
            return response.json();
          }
        })
      .then(data => {
          dispatch(actions.fiveDaysForecastRequested(data))
        });
  }

  let ulLocations;

  if (userLocations === null) {
    client.getLocations()
      .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw Error(response);
          }
        })
      .then(data => {
          dispatch(actions.updateUserSavedLocations(data));
        })
      .catch(error => {
          console.log(error);
        });
    ulLocations = [];
  } else {
    ulLocations = userLocations.map((l) =>
      <li key={l.id} className={"list-group-item " + (l.name === location ? 'active' : '')} 
        onClick={() => onClickSavedLocation(l.name) }>
        <button onClick={() => onClickDeleteLocation(l.id) } className="close">
          <span aria-hidden="true">
            <small>&times;</small>
          </span>
        </button> {l.name}
      </li>
    );
  }

  return (
    <div className="container">
      <br/>
      <div className="row">
        <div className="col-md-4">
          <ul className="list-group">
            { ulLocations }
          </ul>
        </div>
        <div className="col-md-8">
          <Switch>
            <Route path="/">
              <PremiumForecasts />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;