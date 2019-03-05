import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { GoogleApiWrapper } from 'google-maps-react'
import { googleAPI } from '../../config/config'

import withAuthorization from '../../containers/withAuthorization';
import './MapPage.css';

import Map from './Map'

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
    apiKey: googleAPI
  })(MapPage));