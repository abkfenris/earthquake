import React from 'react'

import Mapbox from 'components/Mapbox/Mapbox'
import RecentList from 'components/RecentList/RecentList'

let testGeojson = {
  features: [
    {
      properties: {
        name: 'Feature A'
      }
    },
    {
      properties: {
        name: 'Feature B'
      }
    }
  ]
}

type Props = {

};

export class Recent extends React.Component {
  props: Props;

  render () {
    return (
      <div id='earthquake-flex'>
        <div id='main'>
          <div id='main-column'>
            <Mapbox
              accessToken='pk.eyJ1IjoiZmVucmlzIiwiYSI6ImNpbTE1eXUyaTA4dHd1c2tzZnl5enRnd2kifQ.5_XdJHT5JAWMkY5LCYty_Q' //eslint-disable-line
              />
          </div>
          <div id='info-column'>
            <RecentList
              geojson={testGeojson}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default Recent
