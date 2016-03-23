import React, {PropTypes} from 'react'

type Props = {
  feature: PropTypes.object.isRequired
};
export class RecentListItem extends React.Component {
  props: Props;

  render () {
    console.log(this.props)
    return (
      <li>{this.props.feature.properties.name}</li>
    )
  }
}

export default RecentListItem
