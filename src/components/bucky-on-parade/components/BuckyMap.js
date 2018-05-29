import React, { Component } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps'
import { googleMapStyles } from '../styles'

class BuckyMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <GoogleMap
        ref={this.props.onMapMounted}
        onClick={this.props.deselectBucky}
        defaultZoom={15}
        defaultCenter={{lat: 43.0731, lng: -89.4012}}
        defaultOptions={{
          disableDefaultUI: false,
          styles: googleMapStyles
        }}
      >

        { this.props.children }

      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(BuckyMap))
