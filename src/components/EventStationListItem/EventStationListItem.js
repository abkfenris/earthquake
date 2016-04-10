import React from 'react'

type Props = {

};
export class EventStationListItem extends React.Component {
  props: Props;

  render () {
    let {station} = this.props
    return (
      <li className='seismic-station'>
        <div className='station_name'>{station.properties.name}</div>
        <ul>
          <li className='network_code'>Network: {station.properties.network_code}</li>
          <li className='distance'>Distance from event: {station.properties.distance}</li>
        </ul>
      </li>
    )
  }
}

export default EventStationListItem
