import React, {PropTypes} from 'react'

type Props = {
  feature: PropTypes.object.isRequired
};
export class RecentListItem extends React.Component {
  props: Props;

  render () {
    return (
      <li>{this.props.feature.properties.title}</li>
    )
  }
}

export default RecentListItem
