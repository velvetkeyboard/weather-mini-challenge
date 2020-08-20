import { combineReducers } from 'redux';
import * as actions from './actionTypes';

function locationReducer(state = '', action) {
    switch(action.type) {
        case (actions.LOCATION_CHANGED):
            return action.payload
        default:
            return state;
    }
}

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

function ForecastsReducer(state = [], action) {
    switch(action.type) {
        case (actions.FIVE_DAYS_FORECAST_REQUESTED):
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
  location: locationReducer,
  typingLocation: typingLocationReducer,
  forecasts: ForecastsReducer,
})