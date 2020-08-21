import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ 
  currentLocation: state.location,
  forecasts: state.forecasts,
  userToken: state.userToken,
});

class Forecasts extends React.Component {

  isUmbrellaRecommended(umbrella) {
    if (umbrella) {
      return (<i>Umbrella <b>is recommended</b></i>);
    } else {
      return (<i><b>No Need For an </b>Umbrella</i>);
    }
  }

  render() {
    // render your component
    const forecastsColumns = this.props.forecasts.map((f) =>
      <div className="col-sm-8 col-md-6" key={f.dt}>
        <div className="card mb-4 shadow-sm" style={{margin: "10px"}}>
          {/* <img src="..." class="card-img-top" alt="..."> */}
          <div className="card-body">
            <h6 className="card-title text-center">
              {f.date}
            </h6>
            <h5 className="card-title text-center">
              {f.weekday}
            </h5>
            <p className="card-text text-center">
              <span className="badge badge-pill badge-light fas fa-sun">{f.sunrise_hour}</span>&nbsp;
              <span className="badge badge-pill badge-dark fas fa-moon">{f.sunset_hour}</span>&nbsp;
              <span className="badge badge-pill badge-warning fas fa-wind">{f.wind_speed}</span>&nbsp;
              <span className="badge badge-pill badge-info fas fa-umbrella">{f.humidity}</span>
            </p>
            <p className="text-center">
              <small>
                {this.isUmbrellaRecommended(f.umbrella)}
              </small>
            </p>
          </div>
        </div>
      </div>
      );
    return this.props.forecasts.length ? (
      <div className="container">
        <div className="row">
          {
            forecastsColumns.length ? (
              <div className="col-md">
                <h4 className="text-center">
                  Next { this.props.userToken.length > 0 ? 'Seven' : 'Five' } Days Forecast for {this.props.currentLocation}
                </h4>
              </div>
            ) : ''
          }
        </div>
        <div className="row">
          {forecastsColumns}
        </div>
      </div>
    ) : ('') ;
  }
}

export default connect(mapStateToProps)(Forecasts);

/*

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {
              forecastsColumns.length ? (
                <div className="col-md">
                  <h4 className="text-center">
                    Next Five Days Forecast for {this.props.currentLocation}
                  </h4>
                </div>
              ) : ''
            }
          </div>
          <div className="row">
            {forecastsColumns}
          </div>
        </div>
      </div>

*/ 
