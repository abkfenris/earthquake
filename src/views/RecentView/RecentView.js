import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Slider from 'rc-slider'
import buffer from 'turf-buffer'

// load CSS for slider
import 'rc-slider/assets/index.css'

import Mapbox from 'components/Mapbox/Mapbox'
import RecentList from 'components/RecentList/RecentList'
import {loadGeojson, filterGeojson} from 'redux/modules/geojson'

type Props = {
  geojson: PropTypes.object.isRequired,
  loadGeojson: PropTypes.func.isRequired,
  filterGeojson: PropTypes.func.isRequired
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
      // Filter down the geojson by a minimum magnitude
      let {min, max} = this.props.geojson
      let geojson = {
        ...this.props.geojson,
        // filter features by magnitude
        features: this.props.geojson.features.filter((feature) => {
          return max >= feature.properties.mag && feature.properties.mag >= min
        // then buffer points to polygons based on magnitude
        }).map((feature) => {
          return {
            ...feature,
            geometry: buffer(feature, Math.pow(2.5, feature.properties.mag), 'miles').geometry
          }
        })
      }

      return (
        <div id='main'>
          <div id='main-column'>
            <Mapbox
              geojson={geojson}
              accessToken='pk.eyJ1IjoiZmVucmlzIiwiYSI6ImNpbTE1eXUyaTA4dHd1c2tzZnl5enRnd2kifQ.5_XdJHT5JAWMkY5LCYty_Q' //eslint-disable-line
              />
          </div>
          <div id='info-column'>
            <Slider
              range
              defaultValue={[min, max]}
              max={10}
              step={0.1}
              onChange={(values) => { //eslint-disable-line
                this.props.filterGeojson(values[0], values[1])
              }}
              />
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
    },
    filterGeojson: (min, max) => {
      dispatch(filterGeojson(min, max))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recent)
