import React from 'react';
import { db } from '../../firebase';
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
 
class CheckinAlt extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
        checkIn: false,
        distance: '',
        buckyToRemove: '',
        buckyNameTagged: '',
        buckies: [],
        loadingForGeolocation: true,
        modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
      this.setState({ buckies: dataArr, loadingForGeolocation: false })
    }

    findClosestBucky = (lat1, lon1, lat2, lon2) => {  // generally used geo measurement function
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
      this.setState({loadingForGeolocation: true, distance: '', modalIsOpen: true})
      this.props.onClick().then(this.setState({checkIn: false, loadingForGeolocation: false}))

          const closest = (!Array.isArray(this.state.buckies) || !this.state.buckies.length) 
          ? null 
          : this.state.buckies.reduce((lowest, cur) => {
          // assign first element to the checkable object if it has lng and lat
          lowest.lat && lowest.lng ? cur = lowest : null;

          if (cur.lat !== undefined || cur.lng !== undefined) {
            const distanceFunc = this.findClosestBucky(this.props.lat,this.props.lng, cur.lat, cur.lng, cur.id);
            // manual coordinates for testing
            // const distanceFunc = this.findClosestBucky(43.074119262953495,-89.45224463939667, cur.lat, cur.lng, cur.id);

            // check if lowest is same as rendered
            if (distanceFunc > lowest) {
              return lowest
            }  else {
              this.setState({ buckyToRemove: parseInt(cur.id.slice(0, -1)) - 1, buckyNameTagged: cur.name })
              return distanceFunc
            }
          } else {
            return lowest
          }
        })
        closest ? closest < 45 ? ( db.updateScore(), db.removeBuckyFromTheUserList(this.state.buckyToRemove), this.setState({distance: 'Congratulations! You have tagged ' + this.state.buckyNameTagged + '!'}) ) : this.setState({distance: 'Can not find any Mascot near you. You are ' + closest + ' feet away'}) : null;
    }

    refreshLocation = () => {
      this.setState({loadingForGeolocation: true, distance: ''})
      this.props.onClick().then(this.setState({checkIn: false, loadingForGeolocation: false}))
    }

  render() {
    return (
      <div>
        
      {(!this.state.loadingForGeolocation && !this.props.loading) ?
        !this.state.checkIn ? <button className="CheckIn-btn" onClick={this.initialCheckInHandler}>Check in</button> : <button onClick={this.refreshLocation}> Get New Location </button>
      : <h5>Getting location</h5>}

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Success window modal"
        >
          <h3>{(!this.state.loadingForGeolocation && !this.props.loading) ? this.state.distance : 'Checking the closest Mascots'}</h3>
          <div className="modal-loading"><ScaleLoader color={'#fc0d1b'}  loading={this.props.loading} /></div>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      
      </div>
    )
  }
}
 
export default CheckinAlt;