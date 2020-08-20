import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from 'react-redux'
import * as actions from './actions'
import ClientApi from './WeatherApi';


function App() {
  const dispatch = useDispatch();
  const location = useSelector(state => state.location);
  const typingLocation = useSelector(state => state.typingLocation);

  if (typingLocation + location.length === 0 && location.length > 0) {
    let client = new ClientApi();
    let headers = client.getHeaders();
    let url = client.getCheckWeatherUrl(location)

    fetch(url, {headers,})
      .then(response => {
        if (response.status !== 200) {
          return []
        } else {
          return response.json()
        }
      })
      .then(data => 
        dispatch(actions.fiveDaysForecastRequested(data))
      );

  }

  if (location.length === 0) {
    dispatch(actions.fiveDaysForecastRequested([]))
    dispatch(actions.typingLocationReset())
  }

  const onChangeLocation = (e) => {
    let newLocation = e.target.value;
    dispatch(actions.typingLocation(1));
    dispatch(actions.locationChanged(newLocation));

    setTimeout(() => {
      dispatch(actions.typingLocation(-2));
    }, 1000);
  }

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
// export default connect(mapStateToProps)(App);