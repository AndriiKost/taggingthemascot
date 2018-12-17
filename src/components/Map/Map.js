import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { db } from '../../firebase/index'
import { ScaleLoader } from 'react-spinners';
import Modal from 'react-modal';

import buckyIcon from '../../assets/images/icons/buckies/active.svg'
import userMarker from '../../assets/images/icons/buckies/userMarker.png'
import CheckinAlt from './CheckinAlt';

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

openModal() { this.setState({modalIsOpen: true}) }

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

    buckies ? buckies.map(el => 
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
    ) : alert('having problems to get mascots')

    this.setState({ locations: dataArr })
    
    //this.loadMap(43.0991371, -89.3111176); // call loadMap function to load the google map
  }

  loadMap(defLong, defLat) {
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
    this.setState({loading: true})
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
    });
  };

  render() {
    const style = { width: '100%', height: '70vh' }

    return (
    <div>
      <div ref="map" style={style}>
        <div className='loading'><ScaleLoader color={'#fc0d1b'} loading={this.state.loading} /></div>
          
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
              <h3 className='ModalComponent mascot-address' ref={subtitle => this.subtitle = subtitle}>
                {this.state.currentBucky.addressString}
              </h3>
            </CopyToClipboard>
            {this.state.copied ? <span className='copyBox'>Copied.</span> : null}
          <h4 className='ModalComponent' ref={subtitle => this.subtitle = subtitle}><a href={this.state.currentBucky.link} target='blank' >More Info</a></h4>
          
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
        <CheckinAlt loading={this.state.loading} lat={this.state.latitude} lng={this.state.longitude} onClick={this.loadPosition}/>
      </div>
    )
  }
}