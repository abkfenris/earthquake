import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Mapbox from 'components/Mapbox/Mapbox'
import RecentList from 'components/RecentList/RecentList'
import {loadGeojson} from 'redux/modules/geojson'

type Props = {
  geojson: PropTypes.object.isRequired,
  loadGeojson: PropTypes.func.isRequired
};

export class Recent extends React.Component {
  props: Props;

  componentWillMount () {
    // Load GeoJSON from USGS if we don't have anything yet
    if (this.props.geojson.type !== 'FeatureCollection') {
      this.props.loadGeojson()
    }
  }

  renderMain () {
    if (this.props.geojson.type === 'FeatureCollection') {
      let geojson = this.props.geojson
      return (
        <div id='main'>
          <div id='main-column'>
            <Mapbox
              geojson={geojson}
              accessToken='pk.eyJ1IjoiZmVucmlzIiwiYSI6ImNpbTE1eXUyaTA4dHd1c2tzZnl5enRnd2kifQ.5_XdJHT5JAWMkY5LCYty_Q' //eslint-disable-line
              />
          </div>
          <div id='info-column'>
            <RecentList
              geojson={geojson}
              />
          </div>
        </div>
      )
    } else {
      return (
        <div id='main'><h2>Loading...</h2></div>
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
  geojson: state.geojson
})
const mapDispatchToProps = (dispatch) => {
  return {
    loadGeojson: () => {
      dispatch(loadGeojson())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recent)
