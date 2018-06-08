import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { db } from '../../firebase/index'

import buckyIcon from '../../assets/images/icons/buckies/active.svg'
import userMarker from '../../assets/images/icons/buckies/userMarker.png'
import { buckies } from '../data/index'

import Checkin from '../CheckIn'
import CheckinAlt from './CheckinAlt';
import jsxToString from 'jsx-to-string';

import Modal from 'react-modal';
import { ScaleLoader } from 'react-spinners';
// Styles for modal window
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export default class MapContainer extends Component {

constructor() {
  super();
  this.state = {
    locations: [],
    modalIsOpen: false,
    currentBucky: '',
    loading: true,
    currentCoordinates: '',
    latitude: null,
    longitude: null,
    loadingForGeolocation: true,
    copied: false,
  }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}

openModal(marker) {
  this.setState({modalIsOpen: true});
  console.log('open modal -> ',marker)
}

afterOpenModal() {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = '#f00';
}

closeModal() {
  this.setState({modalIsOpen: false, copied: false});
}

  componentDidMount() {
    // this.getCoordinatesFromNavigator()
    if ("geolocation" in navigator) {
      this.loadPosition();
    }

    db.getBuckies().then( snapshot =>
    this.updateStateWithLocations(snapshot.val()));
  }

  updateStateWithLocations = ( buckies ) => {
    let dataArr = []

    buckies.map(el => 
      // Update state with Firebase Data
      dataArr.push({
      name: el.properties.name,
      id: el.properties.id,
      address: el.properties.address,
      imgFileName: el.properties.imgFileName,
      link: el.properties.link,
    location: {
        lat: el.geometry.coordinates[1],
        lng: el.geometry.coordinates[0]
    }})
    )
    //this.state.locations = dataArr

    this.setState({ locations: dataArr })
    
    //this.loadMap(43.0991371, -89.3111176); // call loadMap function to load the google map
  }

  loadMap(defLong, defLat) {
    this.setState({loading: true})
    console.log('loadMap()', this.state.longitude, this.state.latitude)
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      let point = new google.maps.LatLng(defLong, defLat)

      let mapConfig = Object.assign({}, {
        center: point,// {lat: 43.0731, lng: -89.4012}, // sets center of google map to NYC.
        zoom: 15, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
  
  // ================== ADD MARKERS TO MAP
      this.state.locations.forEach( location => { // iterate through locations saved in state
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
          map: this.map, // sets markers to appear on the map we just created on line 35
          title: location.name, // the title of the marker is set to the name of the location
          icon: buckyIcon,
          addressString: location.address,
          buckyID: location.id,
          imgFileName: location.imgFileName,
          link: location.link
        });
        marker.addListener('click', 
        () => { 
          this.setState({
            modalIsOpen: true,
            currentBucky: {
              title: marker.title,
              addressString: marker.addressString,
              buckyID: marker.buckyID,
              imgFileName: marker.imgFileName,
              link: marker.link
            }
          })
        }
      )

      const UserMarker = new google.maps.Marker({
        position: point,
        map: this.map,
        title: 'You are here',
        icon: userMarker
      })
      })
    } else { return }
  }

  loadPosition = async () => {
    console.log('loadPosition from Map component')
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude,
        longitude
      });
      this.loadMap(this.state.latitude, this.state.longitude);
      this.setState({loading: false})
    } catch (error) {
      console.log(error);
    }

  };

  getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
      //this.loadMap(this.state.latitude, this.state.longitude);
      
    });
    
  };

  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '100%', // 90vw basically means take up 90% of the width screen. px also works.
      height: '55vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
    <div>
      <div ref="map" style={style}>
        {/* <div className='loadingMap'>loading map...</div> */}
          <div className='loading'><ScaleLoader color={'#fc0d1b'}  loading={this.state.loading} /></div>
          
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className='ModalComponent' ref={subtitle => this.subtitle = subtitle}>{this.state.currentBucky.title}</h2>
            <CopyToClipboard text={this.state.currentBucky.addressString}
            onCopy={() => this.setState({copied: true})}>
              <h3 className='ModalComponent' ref={subtitle => this.subtitle = subtitle}>
                {this.state.currentBucky.addressString}
              </h3>
            </CopyToClipboard>
            {this.state.copied ? <span className='copyBox'>Copied.</span> : null}
          <h4 className='ModalComponent' ref={subtitle => this.subtitle = subtitle}><a href={this.state.currentBucky.link}>More Info</a></h4>
          <img className='ModalComponent'
              src={`https://deliandigital.com/wp-content/uploads/2018/06/${this.state.currentBucky.imgFileName}`} width="30%" height="auto"/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
        {/* <Checkin loading={this.state.loading} lat={this.state.latitude} lng={this.state.longitude} onClick={this.loadPosition}/> */}
        {/* <p>Latitude {this.state.latitude}</p> */}
        {/* <p>Longitude {this.state.longitude}</p> */}
        {/* <button onClick={this.loadPosition}>Get coords</button> */}
        <CheckinAlt loading={this.state.loading} lat={this.state.latitude} lng={this.state.longitude} onClick={this.loadPosition}/>
      </div>
    )
  }
}