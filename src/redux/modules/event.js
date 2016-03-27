import fetch from 'isomorphic-fetch'

import {fdsnwsStationToObject} from 'utils/iris'
import {featuresWithDistance, compareFeatureDistances} from 'utils/geojson'

// -----------------
// Constants
// -----------------
export const LOAD_EVENT = 'LOAD_EVENT'
export const LOADING_EVENT = 'LOADING_EVENT'
export const RECIEVE_EVENT = 'RECIEVE_EVENT'
export const FAILED_EVENT = 'FAILED_EVENT'
export const LOAD_STATIONS = 'LOAD_STATIONS'
export const LOADING_STATIONS = 'LOADING_STATIONS'
export const RECIEVE_STATIONS = 'RECIEVE_STATIONS'
export const FAILED_STATIONS = 'FAILED_STATIONS'
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

export function loadingStations (event_id) {
  return {
    type: LOADING_STATIONS,
    event_id
  }
}

export function recieveStations (event_id, data) {
  return {
    type: RECIEVE_STATIONS,
    event_id,
    data
  }
}

export function failedStations (event_id, exception) {
  return {
    type: FAILED_STATIONS,
    event_id,
    exception
  }
}

export function loadStations (event_id) {
  return function (dispatch, getState) {
    let event = getState().event[event_id]
    if (!('stations' in event)) {
      dispatch(loadingStations(event_id))
      let starttime = new Date(event.properties.time)
      let endtime = new Date(event.properties.time)
      endtime.setUTCHours(endtime.getUTCHours() + 2)
      // http://service.iris.edu/fdsnws/station/1/query?latitude=-56.1&longitude=-26.7&maxradius=15&nodata=404
      let url = 'http://service.iris.edu/fdsnws/station/1/query?latitude=-56.1&longitude=-26.7&maxradius=50' // 'latitude=-56.1&longitude=-26.7&maxradius=15'
      url += '&startbefore=' + starttime.toISOString() // .split('T')[0]
      url += '&endafter=' + endtime.toISOString() // .split('T')[0]
      // console.log(url)

      return fetch(url)
        .then((response) => response.text())
        .then((text) => {
          let stations = fdsnwsStationToObject(text)
          stations = featuresWithDistance(event, stations)
          stations.sort(compareFeatureDistances)
          dispatch(recieveStations(event_id, stations))
        }

      ).catch((exception) =>
          dispatch(failedStations(event_id, exception))
      )
    }
  }
}

// -----------------
// Action Handlers
// -----------------

// -----------------
// Reducer
// -----------------
const stationInitialState = {}
const stations = (state = stationInitialState, action) => {
  switch (action.type) {
    case LOADING_STATIONS:
      return {loading: true}
    case RECIEVE_STATIONS:
      return {type: 'FeatureCollection', features: action.data}
    case FAILED_STATIONS:
      return {failed: true}
    default:
      return state
  }
}


const initialState = {}
const eventReducer = (state = initialState, action) => {
  let next_state = {}
  switch (action.type) {
    case LOADING_STATIONS:
    case RECIEVE_STATIONS:
    case FAILED_STATIONS:
      next_state = {...state}
      next_state[action.event_id].stations = stations(state[action.event_id].stations, action)
      return next_state
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
