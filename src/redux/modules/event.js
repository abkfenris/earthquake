import fetch from 'isomorphic-fetch'

// -----------------
// Constants
// -----------------
export const LOAD_EVENT = 'LOAD_EVENT'
export const LOADING_EVENT = 'LOADING_EVENT'
export const RECIEVE_EVENT = 'RECIEVE_EVENT'
export const FAILED_EVENT = 'FAILED_EVENT'
export const BASE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/'

// -----------------
// Actions
// -----------------
export function loadingEvent (event_id) {
  return {
    type: LOADING_EVENT,
    event_id
  }
}

export function recieveEvent (event_id, json) {
  return {
    type: RECIEVE_EVENT,
    event_id,
    json
  }
}

export function failedEvent (event_id, exception) {
  return {
    type: FAILED_EVENT,
    event_id,
    exception
  }
}

export function loadEvent (event_id) {
  return function (dispatch) {
    dispatch(loadingEvent(event_id))
    let url = BASE_URL + event_id + '.geojson'
    return fetch(url)
      .then((response) => response.json())
      .then((json) =>
        // update the event info with new json
        dispatch(recieveEvent(event_id, json))
      ).catch((exception) =>
        dispatch(failedEvent(event_id, exception))
    )
  }
}

// -----------------
// Action Handlers
// -----------------

// -----------------
// Reducer
// -----------------
const initialState = {}
const eventReducer = (state = initialState, action) => {
  let next_state = {}
  switch (action.type) {
    case LOADING_EVENT:
      next_state = {...state}
      next_state[action.event_id] = {loading: true}
      return next_state
    case FAILED_EVENT:
      next_state = {...state}
      next_state[action.event_id] = {failed: true}
      return next_state
    case RECIEVE_EVENT:
      next_state = {...state}
      next_state[action.event_id] = {...action.json}
      return next_state
    default:
      return state
  }
}

export default eventReducer
