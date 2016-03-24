import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import geojson from './modules/geojson'
import event from './modules/event'

export default combineReducers({
  counter,
  geojson,
  event,
  router
})
