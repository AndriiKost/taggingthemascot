import React from 'react';
import {geolocated} from 'react-geolocated';
import { db } from '../firebase';
 
class CheckIn extends React.Component {
    state = {
        checkIn: false
    }
    
    componentDidMount = () => {
        this.setState({checkIn: false})
        console.log(this.state.checkIn)
    } 

    checkinHandler = () => {
        this.setState({checkIn: true})
        // db.updateScore();
        console.log('checkIn pressed; state ='+this.state.checkIn)
    }

  render() {
      const coordinates = !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>;

          return (
            <div>
                <button onClick={this.checkinHandler}>Check in</button>
                {this.state.checkIn ? coordinates : null}
            </div>
          )
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(CheckIn);