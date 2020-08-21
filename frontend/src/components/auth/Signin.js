import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';
import ClientApi from '../../WeatherApi';
import {
  Link
} from "react-router-dom";

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const email = useSelector(state => state.signUpEmail);
  const password = useSelector(state => state.signUpPassword);
  const signUpWaitingRequest = useSelector(state => state.signUpWaitingRequest);
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  const client = new ClientApi();

  const onClickSubmit = (e) => {
    console.log('submitting form ' + email + ' / ' + password)
    dispatch(actions.signUpRequestWasDispatched());
    client.signIn(email, password)
      .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            dispatch(actions.signUpRequestWasReceived());
            if (response.status === 401 ){
              throw Error("Application is not authorized");
            }
            else if (response.status === 400) {
              throw Error("Incorrect credentials");
            } else {
              throw Error("Cannot perform this action now");
            }
          }
        })
      .then(data => {
          dispatch(actions.setUserToken(data.token));
          dispatch(actions.setUserAsAuthenticated());
          dispatch(actions.cleanUpSignUpData());
          history.push("/dashboard");
        })
      .catch(error => {
          alert(error);
        });
  };

  const onChangeEmail = (e) => {
    const text = e.target.value;
    dispatch(actions.changeSignUpEmail(text));
  };

  const onChangePassword = (e) => {
    const text = e.target.value;
    dispatch(actions.changeSignUpPassword(text));
  };

  if (isUserAuthenticated) {
    history.push("/dashboard");
  }

  return (
    <div className="container">
      <br/>
      <br/>
      <div className="row">
        <div className="col-md-8 offset-md-2 text-left">
          <div className="form-group">
            <label>Email address</label>
            <input onChange={onChangeEmail} type="email" className="form-control" id="exampleInputEmail1" disabled={signUpWaitingRequest}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input onChange={onChangePassword} type="password" className="form-control" id="exampleInputPassword1" disabled={signUpWaitingRequest}/>
          </div>
          <button onClick={onClickSubmit} disabled={signUpWaitingRequest} className="btn btn-block btn-primary">Sign In</button>
          <Link to="/signup" disabled={signUpWaitingRequest} className="btn btn-block btn-success">Go Premium! Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;