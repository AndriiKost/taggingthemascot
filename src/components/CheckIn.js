import React from 'react';
import {geolocated} from 'react-geolocated';
import { db } from '../firebase';
 
class CheckIn extends React.Component {
    state = {
        checkIn: false,
        distance: ''
    }
    
    componentDidMount = () => {
        this.setState({checkIn: false})
    } 

    measure = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        console.log(d * 1000)
        this.setState({distance: d * 1000}); // meters
    }

    initialCheckInHandler = () => {
        this.setState({checkIn: true})
        // db.updateScore();
        console.log(geolocated.getCurrentPosition)
        this.measure(this.props.coords.latitude,this.props.coords.longitude, 43.098782, -89.310372)
    }

  render() {
      const coordinates = !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <button onClick={this.initialCheckInHandler}>Check in</button>
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