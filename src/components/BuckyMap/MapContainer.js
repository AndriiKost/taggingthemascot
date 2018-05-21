import React from 'react'
import BuckyMap from './BuckyMap'
// import SideMenu from './SideMenu'
// import DetailWindow  from './DetailWindow'
import Buckies from './mapLayers/Buckies'
// import { googleMapStyles, colors } from './styles'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobile: null,
      // sideMenuIsOpen: false,
      selectedBucky: null
    }

    // this.updateDimensions = this.updateDimensions.bind(this)
    this.panTo = this.panTo.bind(this)
    this.panTo = this.panTo.bind(this)
    this.selectBucky = this.selectBucky.bind(this)
    this.deselectBucky = this.deselectBucky.bind(this)
    this.onMapMounted = this.onMapMounted.bind(this)
    // this.onToggleSideMenu = this.onToggleSideMenu.bind(this)
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    let w = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
    let h = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

    // toogle isMobile
    // if (w > 768 && (true === this.state.isMobile || this.state.isMobile === null)) {
    //   this.setState({
    //     isMobile: false,
    //     sideMenuIsOpen: true
    //   })
    // } else if (w <= 768 && (false === this.state.isMobile || this.state.isMobile === null)) {
    //   this.setState({
    //     isMobile: true,
    //     sideMenuIsOpen: false
    //   })
    // }
  }

  panTo(coords) {
    this.MAP.panTo(coords)
  }

  selectBucky(b) {
    // pan to bucky
    let coords = b.geometry.coordinates
    let latLng = {lat: coords[1], lng: coords[0]}
    this.MAP.panTo(latLng)

    // toggle bucky selection
    this.setState({
      selectedBucky: b
    })
  }

  deselectBucky() {
    this.setState({
      selectedBucky: null
    })
  }

  onMapMounted(ref) {
    this.MAP = ref
  }

  // onToggleSideMenu(params) {
  //   let {bucky} = params || {}

  //   // if a bucky param is passed in, toggle side menu then select the bucky
  //   this.setState({
  //     sideMenuIsOpen: !this.state.sideMenuIsOpen
  //   }, () => (bucky) ? this.selectBucky(bucky) : null)
  // }

  render() {
    return(
      <div style={{width: '100%', height: '100%'}}>

        { /* bucky map */ }
        <div style={{width: '100%', height: '100%'}}>
          <BuckyMap
            deselectBucky={this.deselectBucky}
            onMapMounted={this.onMapMounted}
            isMarkerShown
            isBorderShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBzHOYlM9RHefAZjvPgVuZf_Bil7_UOKCA&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          >
            { /* bucky statues */ }
            <Buckies
              selectBucky={this.selectBucky}
              deselectBucky={this.deselectBucky}
              selectedBucky={this.state.selectedBucky}
            />

          </BuckyMap>
        </div>

        { /* side menu */ }
        <div
          style={(this.state.isMobile)
            ? {position: 'absolute', left: 0, width: '100%', height: '100%' /* bottom: handled by _sideMenu.scss */}
            : {position: 'absolute', top: 0, bottom: 0, width: '28%', height: '100%' /* left: handled by _sideMenu.scss */}
          }
          className={(this.state.isMobile)
            ? ['side-menu-wrap-mobile', this.state.sideMenuIsOpen && 'visible'].join(' ')
            : ['side-menu-wrap', this.state.sideMenuIsOpen && 'visible'].join(' ')
          }
        >
          {/* <SideMenu
            onToggleSideMenu={this.onToggleSideMenu}
            isMobile={this.state.isMobile}
            isOpen={this.state.sideMenuIsOpen}
            panTo={this.panTo}
            selectBucky={this.selectBucky}
            onToggleBycles={this.onToggleBycles}
          /> */}
        </div>

        { /* bucky detail window */
          (this.state.selectedBucky)
          ? <div
              style={(this.state.isMobile)
                ? {position: 'absolute', top: 0, right: 0, width: '100%'}
                : {position: 'absolute', top: 9, right: 80, width: 300}}
              >
              {/* <DetailWindow
                isMobile={this.state.isMobile}
                bucky={this.state.selectedBucky}
                onExit={this.deselectBucky}
              /> */}
            </div>
          : null
        }
      </div>
    )
  }
}

export default MapContainer;
