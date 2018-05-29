import React from 'react'
import { Marker } from 'react-google-maps'

class BuckyMarker extends React.Component {
  constructor(props) {
    super(props)

    this.iconPaths = {
      active: '../../../assets/images/icons/buckies/active.svg',
      inactive: '../../../assets/images/icons/buckies/inactive.svg'
    }
  }

  render() {
    let { bucky, onClick, aBuckyIsSelected, isSelected } = this.props
    let { properties, geometry } = bucky
    let { coordinates } = geometry
    let { id } = properties

    return(
      <Marker
        key={id || Math.random()}
        position={{lat: coordinates[1], lng: coordinates[0]}}
        onClick={onClick}
        zIndex={(isSelected) ? 1000 : 999}
        icon={this.iconPaths[(isSelected) ? "active" : (aBuckyIsSelected) ? "inactive" : "active"]}
      />
    )
  }
}

export default BuckyMarker
