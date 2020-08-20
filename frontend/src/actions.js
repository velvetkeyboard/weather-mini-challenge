import * as actions from './actionTypes';

export function locationChanged (location) {
    return {
      type: actions.LOCATION_CHANGED,
      payload: location.trim(),
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

export function fiveDaysForecastRequested (forecast) {
    return {
      type: actions.FIVE_DAYS_FORECAST_REQUESTED,
      payload: forecast,
    }
}