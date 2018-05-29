import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'

import { MAPS_API } from '../../constants/keys'

import Map from './Map'

export class Container extends Component {
    render() {

      return (
        <div>
            <Map google={this.props.google}/>
        </div>
      )
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyBzHOYlM9RHefAZjvPgVuZf_Bil7_UOKCA'
  })(Container)