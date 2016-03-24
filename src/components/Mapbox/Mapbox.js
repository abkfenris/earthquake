import React, {PropTypes} from 'react'

type Props = {
  // layer: Proptypes.string.isRequired,
  geojson: PropTypes.object.isRequired,
  accessToken: PropTypes.string.isRequired
};
export class Mapbox extends React.Component {
  props: Props;

  setGeoJSON () {
    this.featureLayer.setGeoJSON(this.props.geojson)
  }

  componentDidMount () {
    L.mapbox.accessToken = this.props.accessToken // eslint-disable-line
    this.map = L.mapbox.map('map', 'mapbox.streets') // eslint-disable-line

    this.featureLayer = L.mapbox.featureLayer(null) //eslint-disable-line
    this.featureLayer.addTo(this.map)
    this.setGeoJSON()
  }

  componentDidUpdate () {
    this.setGeoJSON()
  }

  render () {
    return (
      <div id='map'></div>
    )
  }
}

export default Mapbox
