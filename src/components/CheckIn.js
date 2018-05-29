import React from 'react';
import {geolocated} from 'react-geolocated';
import { db } from '../firebase';
import * as routes from '../constants/routes';

import { buckies } from './data'
 
class CheckIn extends React.Component {
    state = {
        checkIn: false,
        distance: ''
    }

    measure = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
        let R = 6378.137; // Radius of earth in KM
        let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        console.log(d * 1000)
        d * 1000 > 6
        ? this.setState({distance: 'You are ' + Math.round((d * 1000 * 3.2808)) + ' feet away, move closer'}) // meters
        : this.setState({distance: 'Congratulations, You have successfully taged [BUCKY_NAME]'})
    }

    findClosestBucky = (lat1, lon1, lat2, lon2, buckyName) => {  // generally used geo measurement function
      let R = 6378.137; // Radius of earth in KM
      let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
      let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c;
      return Math.round((d * 1000 * 3.2808));
  }

    initialCheckInHandler = () => {
        this.setState({checkIn: true})
        // find closest bucky
        db.getCheckList().then( snapshot =>
          console.log(snapshot.val()))

        const closest = buckies.buckies.features.reduce((lowest, cur) => {
          if (cur.geometry.coordinates !== undefined) {
            const distanceFunc = this.findClosestBucky(this.props.coords.latitude,this.props.coords.longitude, cur.geometry.coordinates[1], cur.geometry.coordinates[0], cur.properties.name);
            // check if lowest is same as rendered
            console.log(lowest)
            return distanceFunc > lowest ? lowest : distanceFunc;
          } else {
            return lowest
          }
          
        })
        
        closest < 16 ? ( db.updateScore() ) : this.setState({distance: 'Can not find any Bucky near you. You are ' + closest + ' feet away'}) ;
    }

    refreshLocation = () => {
      window.location.reload();
    }

  render() {
      const coordinates = !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? !this.state.checkIn ? <button onClick={this.initialCheckInHandler}>Check in</button> : <button onClick={this.refreshLocation}> Get New Location </button>
          : <div>Getting the location data&hellip; </div>;

          return (
            <div>
                {coordinates}
                <h1>{this.state.distance}</h1>
            </div>
          )
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 10000,
})(CheckIn);