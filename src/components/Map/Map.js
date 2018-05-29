import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import { db } from '../../firebase//index'

import { buckies } from '../data/index'

export default class MapContainer extends Component {

  // ======================
  // ADD LOCATIONS TO STATE
  // ======================
  state = {
    locations: []
  }

  componentDidMount() {
    db.getBuckies().then( snapshot =>
    this.updateStateWithLocations(snapshot.val()))

    // buckies.buckies.features.map(bucky => {
    //     this.state.locations.push({
    //         name: bucky.properties.name,
    //         location : {lat: bucky.geometry.coordinates[1], lng: bucky.geometry.coordinates[0]}
    //     })
    // })

  }

  updateStateWithLocations = (buckies) => {
    console.log(buckies)
    
    let dataArr = []

    buckies.map(el => 
      // Update state with Firebase Data
      dataArr.push({name: el.properties.name,
      id: el.properties.id,
      address: el.properties.address,
    location: {
        lat: el.geometry.coordinates[1],
        lng: el.geometry.coordinates[0]
    }})
    )
    this.state.locations = dataArr
    
    console.log(this.state.locations)
    this.loadMap(); // call loadMap function to load the google map
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 43.0731, lng: -89.4012}, // sets center of google map to NYC.
        zoom: 13, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

  // ==================
  // ADD MARKERS TO MAP
  // ==================
      this.state.locations.forEach( location => { // iterate through locations saved in state
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
          map: this.map, // sets markers to appear on the map we just created on line 35
          title: location.name // the title of the marker is set to the name of the location
        });
      })

    }
  }

  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '100%', // 90vw basically means take up 90% of the width screen. px also works.
      height: '70vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}