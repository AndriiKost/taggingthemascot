import React, { Component } from 'react';
import { db } from '../firebase';

// import MainMapComponent from './bucky-on-parade/containers/MainMapComponent'
// import MapComponent from './Map/MapComponent'
import InitialMap from './Map/InitialMap'

import CheckIn from './CheckIn';

class MapPage extends Component {
    render() {
        return (
            <div className='Map'>
                <CheckIn />
                {/* <MapComponent /> */}
                <InitialMap />
            </div>
        );
    }
}

export default MapPage;