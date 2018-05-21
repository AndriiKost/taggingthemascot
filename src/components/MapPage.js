import React, { Component } from 'react';
import { db } from '../firebase';

import MapContainer from './Map/MapComponent';
import CheckIn from './CheckIn';

class MapPage extends Component {
    render() {
        return (
            <div className='Map'>
                
                {/* <MapContainer /> */}
                <CheckIn />
            </div>
        );
    }
}

export default MapPage;