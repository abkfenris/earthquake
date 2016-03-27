import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {loadStations} from 'redux/modules/event'

type Props = {
  event: PropTypes.object.isRequired,
  loadStations: PropTypes.func.isRequired
};
export class EventStationList extends React.Component {
  props: Props;

  componentDidMount () {
    this.props.loadStations(this.props.event.id)
  }

  render () {
    return (
      <div>Event Stations</div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
  return {
    loadStations: (event_id) => {
      dispatch(loadStations(event_id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventStationList)
