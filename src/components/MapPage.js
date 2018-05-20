import React, { Component } from 'react';
import { db, auth } from '../firebase';

class MapPage extends Component {
    render() {
        return (
            <button onClick={db.updateScore}>Check in</button>
        );
    }
}

export default MapPage;