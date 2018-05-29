import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import { buckies } from '../data/';

const MapContainer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 43.0731, lng: -89.4012}}
  >
    {buckies.buckies.features.map(bucky => {
    <Marker
    key={ bucky.properties.id}
    position={{lat: bucky.geometry.coordinates[1], lng: bucky.geometry.coordinates[0]}}
    />
  })}
  </GoogleMap>
)

class MapComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    console.log(buckies)
  }

  buckyClick = () => {
    console.log('woohooo')
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
  }

  render() {
    return (
      <MapContainer
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MapComponent;