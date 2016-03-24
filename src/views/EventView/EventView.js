import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

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
      console.log('undefined')
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
      return (
        <h2>Loaded: {event.properties.title}</h2>
      )
    }
  }

  render () {
    return (
      <div>
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
