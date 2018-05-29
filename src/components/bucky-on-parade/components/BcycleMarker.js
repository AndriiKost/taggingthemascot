import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { colors } from '../styles'

class BcycleMarker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      infoWindowIsVisible: false
    }

    this.iconPath = '../../../assets/images/icons/bcycle.svg'

    this.toggleInfoWindow = this.toggleInfoWindow.bind(this)
  }

  toggleInfoWindow() {
    this.setState({
      infoWindowIsVisible: !this.state.infoWindowIsVisible
    })
  }

  render() {
    let { infoWindowIsVisible } = this.state
    let { bcycle, onClick } = this.props
    let { properties, geometry } = bcycle
    let { coordinates } = geometry
    let { id } = properties

    return(
      <Marker
        key={id || Math.random()}
        position={{lat: coordinates[1], lng: coordinates[0]}}
        onClick={this.toggleInfoWindow}
        icon={this.iconPath}
      >
        { /* info window */
          (infoWindowIsVisible)
            ? <InfoWindow onCloseClick={this.toggleInfoWindow}>
                <div style={{maxWidth: 250}}>
                  <p style={{fontSize: '1.2rem'}}>
                    {"See Bucky by bike, with free rides on Madison BCycle! Use promo code "}
                    <span style={{fontSize: 'inherit', color: colors.badgerRed}}>{"267267"}</span>
                    {" at any station for a free 24-membership, good for unlimited free rides of up to 30-minutes. A credit card is required for use. Charges apply for trips longer than 30-minutes."}
                  </p>
                </div>
              </InfoWindow>
            : null
        }
      </Marker>
    )
  }
}

export default BcycleMarker
