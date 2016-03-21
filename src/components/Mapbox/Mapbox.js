import React, {Proptypes} from 'react'

type Props = {
  // layer: Proptypes.string.isRequired,
  accessToken: Proptypes.string.isRequired
};
export class Mapbox extends React.Component {
  props: Props;

  componentDidMount () {
    console.log('mount')
    L.mapbox.accessToken = this.props.accessToken // eslint-disable-line
    this.map = L.mapbox.map('map', 'mapbox.streets') // eslint-disable-line
  }

  render () {
    console.log('render')
    return (
      <div id='map'></div>
    )
  }
}

export default Mapbox
