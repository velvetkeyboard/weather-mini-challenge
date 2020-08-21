import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import {
  Link,
} from "react-router-dom";

function Navigation() {
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  const onClickSignout = (e) => {
    dispatch(actions.signUserOut())
  };

  return (
    <header>
      <div className="collapse bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4 className="text-white">About</h4>
              <p className="text-muted">Check the forecast of your city in just a second.</p>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
              <h4 className="text-white">Contact</h4>
              <ul className="list-unstyled">
                <li><a href={'http://google.com'} className="text-white">@TheRealWeather</a></li>
              </ul>
              {
                isUserAuthenticated ? (
                  <button onClick={onClickSignout} className="btn btn-sm btn-danger">Sign Out</button>
                ) : (
                  <Link to="/signin" className="btn btn-sm btn-primary">Sign In</Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <strong>Weather</strong>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navigation;