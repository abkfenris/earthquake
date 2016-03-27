import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Mapbox from 'components/Mapbox/Mapbox'
import EventStationList from 'components/EventStationList/EventStationList'
import {loadEvent} from 'redux/modules/event'

type Props = {
  event: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  loadEvent: PropTypes.func.isRequired
};
export class EventView extends React.Component {
  props: Props;

  componentWillMount () {
    if (this.props.event[this.props.params.event_id] === undefined) {
      this.props.loadEvent(this.props.params.event_id)
    }
  }

  renderMain () {
    if ((this.props.event[this.props.params.event_id] === undefined) ||
      (this.props.event[this.props.params.event_id].properties === undefined)) {
      return (
        <h2>Loading Event: {this.props.params.event_id}</h2>
      )
    } else {
      let event = this.props.event[this.props.params.event_id]
      let geojson
      if ((event.stations === undefined) || (event.stations.features === undefined)) {
        geojson = event
      } else {
        geojson = Object.assign({}, event.stations, {features: [...event.stations.features]})
        geojson.features.unshift(event)
      }

      let event_date = new Date(event.properties.time)
      return (
        <div id='main'>
          <div id='main-column'>
            <Mapbox
              geojson={geojson}
              accessToken='pk.eyJ1IjoiZmVucmlzIiwiYSI6ImNpbTE1eXUyaTA4dHd1c2tzZnl5enRnd2kifQ.5_XdJHT5JAWMkY5LCYty_Q' //eslint-disable-line
              />
          </div>
          <div id='info-column'>
            <div id='event-details'>
              <a href={event.properties.url}><h2>{event.properties.title}</h2></a>
              <ul>
                <li>{event_date.toTimeString()}</li>
                <li>Magnitude: {event.properties.mag} {event.properties.magType}</li>
                <li>Depth: {event.geometry.coordinates[2]} km</li>
              </ul>
            </div>
            <EventStationList
              event={event}
              />
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div id='earthquake-flex'>
        {this.renderMain()}
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  event: state.event
})
const mapDispatchToProps = (dispatch) => {
  return {
    loadEvent: (event_id) => {
      dispatch(loadEvent(event_id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventView)
