import React, {PropTypes} from 'react'
import { Link } from 'react-router'

type Props = {
  feature: PropTypes.object.isRequired
};
export class RecentListItem extends React.Component {
  props: Props;

  render () {
    let event_id = this.props.feature.id
    return (
      <li><Link to={'/event/' + event_id}>{this.props.feature.properties.title}</Link></li>
    )
  }
}

export default RecentListItem
