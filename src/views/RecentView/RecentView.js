import React from 'react'

import Mapbox from 'components/Mapbox/Mapbox'

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
            Info
          </div>
        </div>
      </div>
    )
  }
}

export default Recent
