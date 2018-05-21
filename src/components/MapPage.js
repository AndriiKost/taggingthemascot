import React, { Component } from 'react';
import { db, auth } from '../firebase';

import MapContainer from './Map/MapComponent';

class MapPage extends Component {
    render() {
        return (
            <div className='Map'>
                <button onClick={db.updateScore}>Check in</button>
                {/* <MapContainer /> */}
            </div>
        );
    }
}

export default MapPage;