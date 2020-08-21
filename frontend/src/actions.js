import * as actions from './actionTypes';

export function locationChanged (location) {
    return {
      type: actions.LOCATION_CHANGED,
      payload: location,
    }
}

export function typingLocation (len) {
    return {
      type: actions.TYPING_LOCATION,
      payload: len,
    }
}

export function typingLocationReset () {
    return {
      type: actions.TYPING_LOCATION_RESET,
      payload: 0,
    }
}

export function setTypingLocationTimeout (timeout) {
  return {
    type: actions.SET_TYPING_LOCATION_TIMEOUT,
    payload: timeout
  }
}

export function fiveDaysForecastRequested (forecast) {
    return {
      type: actions.FIVE_DAYS_FORECAST_REQUESTED,
      payload: forecast,
    }
}

export function changeSignUpEmail (email) {
  return {
    type: actions.CHANGE_SIGNUP_EMAIL,
    payload: email,
  }
}

export function changeSignUpPassword (password) {
  return {
    type: actions.CHANGE_SIGNUP_PASSWORD,
    payload: password,
  }
}

export function setUserAsAuthenticated () {
  return {
    type: actions.SET_USER_AS_AUTHENTICATED,
    payload: true
  }
}

export function signUpRequestWasDispatched () {
  return {
    type: actions.SIGNUP_WAITING_REQUEST,
    payload: true
  }
}

export function signUpRequestWasReceived () {
  return {
    type: actions.SIGNUP_WAITING_REQUEST,
    payload: false
  }
}

export function cleanUpSignUpData() {
  return {
    type: actions.SIGNUP_CLEAN_UP_DATA,
    payload: ''
  }
}

export function setUserToken (token) {
  return {
    type: actions.SET_USER_TOKEN,
    payload: token
  }
}

export function signUserOut () {
  return {
    type: actions.USER_SIGN_OUT,
    payload: null,
  }
}

export function updateUserSavedLocations (locations) {
  return {
    type: actions.UPDATE_USER_SAVED_LOCATIONS,
    payload: locations
  }  
}
