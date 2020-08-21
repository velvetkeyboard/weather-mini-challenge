import { combineReducers } from 'redux';
import * as actions from './actionTypes';

function locationReducer(state = '', action) {
    switch(action.type) {
        case (actions.LOCATION_CHANGED):
            return action.payload
        case (actions.USER_SIGN_OUT):
            return '';
        default:
            return state;
    }
}

// TODO Remove Me
function typingLocationReducer(state = 0, action) { 
    switch(action.type) {
        case (actions.TYPING_LOCATION):
            return state + action.payload;
        case (actions.TYPING_LOCATION_RESET):
            return action.payload;
        default:
            return state;
    }
}

// TODO Remove Me
function typingLocationTimeoutReduce(state = null, action) {
    switch(action.type) {
        case (actions.SET_TYPING_LOCATION_TIMEOUT):
            return action.payload;
        default:
            return state;
    }
}

function ForecastsReducer(state = [], action) {
    switch(action.type) {
        case (actions.FIVE_DAYS_FORECAST_REQUESTED):
            return action.payload;
        case (actions.USER_SIGN_OUT):
            return [];
        default:
            return state;
    }
}

function signUpEmailReducer(state = '', action) {
    switch(action.type) {
        case (actions.CHANGE_SIGNUP_EMAIL):
            return action.payload;
        case (actions.SIGNUP_CLEAN_UP_DATA):
            return '';
        case (actions.USER_SIGN_OUT):
            return '';
        default:
            return state;
    }
}

function signUpPasswordReducer(state = '', action) {
    switch(action.type) {
        case (actions.CHANGE_SIGNUP_PASSWORD):
            return action.payload;
        case (actions.SIGNUP_CLEAN_UP_DATA):
            return '';
        case (actions.USER_SIGN_OUT):
            return '';
        default:
            return state;
    }
}

function isUserAuthenticatedReducer(state = false, action) {
    switch(action.type) {
        case (actions.SET_USER_AS_AUTHENTICATED):
            return action.payload;
        case (actions.USER_SIGN_OUT):
            return false;
        default:
            return state;
    }
}

function signUpWaitingRequestReducer (state = false, action) {
    switch(action.type) {
        case (actions.SIGNUP_WAITING_REQUEST):
            return action.payload
        case (actions.USER_SIGN_OUT):
            return false;
        default:
            return state;
    }
}

function setUserTokenReducer(state = '', action) {
    switch(action.type) {
        case (actions.SET_USER_TOKEN):
            return action.payload
        case (actions.USER_SIGN_OUT):
            return '';
        default:
            return state;
    }
}

function updateUserSavedLocationsReducer(state = null, action) {
    switch(action.type) {
        case (actions.UPDATE_USER_SAVED_LOCATIONS):
            return action.payload
        case (actions.USER_SIGN_OUT):
            return null;
        default:
            return state;
    }
}

export default combineReducers({
  location: locationReducer,
  typingLocation: typingLocationReducer,
  typingLocationTimeout: typingLocationTimeoutReduce,
  forecasts: ForecastsReducer,
  signUpEmail: signUpEmailReducer,
  signUpPassword: signUpPasswordReducer,
  isUserAuthenticated: isUserAuthenticatedReducer,
  signUpWaitingRequest: signUpWaitingRequestReducer,
  userToken: setUserTokenReducer,
  userLocations: updateUserSavedLocationsReducer,
})