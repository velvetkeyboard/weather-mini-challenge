import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';
import ClientApi from '../../WeatherApi';

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const email = useSelector(state => state.signUpEmail);
  const password = useSelector(state => state.signUpPassword);
  const signUpWaitingRequest = useSelector(state => state.signUpWaitingRequest);
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  const client = new ClientApi();

  const isFormValid = () => {
    return email.length > 0 && password.length > 0;
  }

  const onClickSubmit = (e) => {
    if (isFormValid()) {
      dispatch(actions.signUpRequestWasDispatched());
      client.signUp(
        email,
        password,
        ).then(response => {
            if (response.status !== 201) {
              dispatch(actions.signUpRequestWasReceived());

              if (response.status === 401 ){
                throw Error("Application is not authorized");
              }
              else if (response.status === 400 ) {
                throw Error("email and password are not valid");
              } else {
                throw Error("Cannot perform this action now");
              }

            } else {
              return response.json();
            }
          })
        .then(data => {
            console.log('SignUp data: ' + data);
            client.signIn(data.username, password)
              .then(response => {
                  if (response.status === 200) {
                    return response.json();
                  } else {
                    dispatch(actions.signUpRequestWasReceived());
                    throw Error("Cannot perform this action now");
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
                history.push("/signin");
                });
          })
        .catch(error => {
          alert(error);
          });
    } else {
      alert('Email and Password cannot be blank');
    }
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
            <small id="emailHelp" className="form-text text-muted">We'll never "share" your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input onChange={onChangePassword} type="password" className="form-control" id="exampleInputPassword1" disabled={signUpWaitingRequest}/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" disabled={signUpWaitingRequest} />
            <label className="form-check-label">Send me Annoying Newsletter</label>
          </div>
          <button onClick={onClickSubmit} disabled={signUpWaitingRequest} className="btn btn-block btn-primary">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;