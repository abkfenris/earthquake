import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import geojson from './modules/geojson'

export default combineReducers({
  counter,
  geojson,
  router
})
