import React, {PropTypes} from 'react'

import RecentListItem from 'components/RecentListItem/RecentListItem'

type Props = {
  geojson: PropTypes.object.isRequired
};
export class RecentList extends React.Component {
  props: Props;

  render () {
    return (
      <div id='recent-events'>
        <ul>
        {this.props.geojson.features.map((feature) => {
          return (<RecentListItem feature={feature} />)
        })}
        </ul>
      </div>
    )
  }
}

export default RecentList
