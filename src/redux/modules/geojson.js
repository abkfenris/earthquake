import fetch from 'isomorphic-fetch'

// -----------------
// Constants
// -----------------
export const LOAD_GEOJSON = 'LOAD_GEOJSON'
export const LOADING_GEOJSON = 'LOADING_GEOJSON'
export const RECIEVE_GEOJSON = 'RECIEVE_GEOJSON'
export const FAILED_GEOJSON = 'FAILED_GEOJSON'
export const FILTER_GEOJSON = 'FILTER_GEOJSON'
export const JSON_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson' //eslint-disable-line

// -----------------
// Actions
// -----------------
export function loadingGeojson () {
  return {
    type: LOADING_GEOJSON
  }
}

export function recieveGeojson (json) {
  return {
    type: RECIEVE_GEOJSON,
    json
  }
}

export function failedGeojson (exception) {
  return {
    type: FAILED_GEOJSON,
    exception
  }
}

export function filterGeojson (min, max) {
  return {
    type: FILTER_GEOJSON,
    min,
    max
  }
}

export function loadGeojson () {
  return function (dispatch) {
    // inform app that we are attempting to load
    dispatch(loadingGeojson())
    return fetch(JSON_URL)
      .then((response) => response.json())
      .then((json) =>
        // update state with new geojson
        dispatch(recieveGeojson(json))
      ).catch((exception) =>
        dispatch(failedGeojson(exception))
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
const geojsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_GEOJSON:
      return {...state, loading: true}
    case RECIEVE_GEOJSON:
      return {...action.json, min: 5, max: 6}
    case FILTER_GEOJSON:
      return {...state, min: action.min, max: action.max}
    default:
      return state
  }
}

export default geojsonReducer
