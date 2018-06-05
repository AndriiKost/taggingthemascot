import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import InitialMap from './Map/InitialMap'
import CheckIn from './CheckIn';

import './MapPage.css';

class MapPage extends Component {
    render() {
        return (
            <div className='Map'>
                <InitialMap />
                <CheckIn />
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
  )(MapPage);