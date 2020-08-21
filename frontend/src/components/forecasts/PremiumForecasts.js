import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';
import ClientApi from '../../WeatherApi';
import Forecasts from './Forecasts';

function PremiumForecasts() {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.userToken);
  const location = useSelector(state => state.location);
  const typingLocationTimeout = useSelector(state => state.typingLocationTimeout);
  const client = new ClientApi(userToken);

  const onChangeLocation = (e) => {
    let value = e.target.value;
    dispatch(actions.locationChanged(value));
    clearTimeout(typingLocationTimeout);
    const requestForecast = setTimeout(() => {
      client.getForecasts(value)
        .then(response => {
            if (response.status !== 200) {
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

  const refreshLocations = () => {
    client.getLocations()
      .then(response => {
          if (response.status !== 200) {
            console.log('Getting Locations Failed');
            return [];
          } else {
            return response.json();
          }
        })
      .then(data => {
          console.log('Getting Locations Worked!');
          dispatch(actions.updateUserSavedLocations(data));
        });
  }

  const isFormValid = () => {
    return location.length > 0;
  }

  const onClickSaveLocation = (e) => {
    if (isFormValid()) {
      client.newLocation(location)
        .then(response => {
            if (response.status !== 201) {
              console.log('Saving New Location Failed!');
              throw Error(response);
            } else {
              return response.json();
            }
          })
        .then(data => {
          console.log('Saving New Location Worked!');
          refreshLocations()
          })
        .catch(error => {
            console.log(error);
          });
    } else {
      alert('Cannot save blank as location');
    }
  }

  return (
    <div className="container">
      <br/>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="form-group">
            <input onChange={onChangeLocation} className="form-control" placeholder="Location" value={location}></input>
            <br />
          </div>
        </div>
      </div>
      <Forecasts />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <button onClick={onClickSaveLocation} className="btn btn-block btn-success">Save Location</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumForecasts;