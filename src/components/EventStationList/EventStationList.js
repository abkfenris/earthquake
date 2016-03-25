import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {loadStations} from 'redux/modules/event'

type Props = {
  event: PropTypes.object.isRequired
};
export class EventStationList extends React.Component {
  props: Props;

  render () {
    console.log(this.props)
    this.props.loadStations(this.props.event.id)
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
