import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { GoogleApiWrapper } from 'google-maps-react'

import { MAPS_API } from '../constants/keys'

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import './MapPage.css';

import Map from './Map/Map'

class MapPage extends Component {

    render() {
        return (
            <div className='Map'>
                <Map google={this.props.google}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(GoogleApiWrapper({
    apiKey: 'AIzaSyBzHOYlM9RHefAZjvPgVuZf_Bil7_UOKCA'
  })(MapPage));