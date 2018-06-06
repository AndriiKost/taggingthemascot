import React from 'react';
import {geolocated} from 'react-geolocated';
import { db } from '../firebase';
import * as routes from '../constants/routes';
 
class CheckIn extends React.Component {
    state = {
        checkIn: false,
        distance: '',
        buckyToRemove: '',
        buckyNameTagged: '',
        buckies: []
    }

    componentDidMount() {
      db.getBuckies().then( snapshot =>
        this.updateStateWithBuckiesData(snapshot.val()))
    }
  
    updateStateWithBuckiesData = (buckies) => {
      let dataArr = []
  
      buckies.map(el => 
        // Update state with Firebase Data
        dataArr.push({name: el.properties.name,
        id: el.properties.id,
        address: el.properties.address,
        lat: el.geometry.coordinates[1],
        lng: el.geometry.coordinates[0]})
      )
      this.state.buckies = dataArr
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
        // console.log(this.state.buckies)
        // find closest bucky
        // const closest = this.state.buckies.reduce((lowest, cur) => {
          const closest = this.state.buckies ? this.state.buckies.reduce((lowest, cur) => {
          // assign first element to the checkable object if it has lng and lat
          lowest.lat && lowest.lng ? cur = lowest : null;

          if (cur.lat !== undefined || cur.lng !== undefined) {
            const distanceFunc = this.findClosestBucky(this.props.coords.latitude,this.props.coords.longitude, cur.lat, cur.lng, cur.id);
            // manual coordinates for testing
            // const distanceFunc = this.findClosestBucky(43.074119262953495,-89.45224463939667, cur.lat, cur.lng, cur.id);
            // check if lowest is same as rendered
            if (distanceFunc > lowest) {
              return lowest
            }  else {
              this.state.buckyToRemove = parseInt(cur.id.slice(0, -1)) - 1;
              this.state.buckyNameTagged = cur.name;
              return distanceFunc
            }
          } else {
            return lowest
          }
        }) : null
        // console.log('#######ALERT ===> ',this.state.buckyNameTagged)
        closest ? closest < 30 ? ( db.updateScore(), db.removeBuckyFromTheUserList(this.state.buckyToRemove), this.setState({distance: 'Congratulations! You have tagged ' + this.state.buckyNameTagged + '!'}) ) : this.setState({distance: 'Can not find any Bucky near you. You are ' + closest + ' feet away'}) : null
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
                <h5>{this.state.distance}</h5>
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