import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div className='Navigation'>
    { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </div>

const NavigationAuth = () =>
  <ul>
    {/* <li><SignOutButton /></li> */}
    <li><Link to={routes.CHECKLIST}>Checklist</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><Link to={routes.LEADERS}>Leaders</Link></li>
    <li><Link to={routes.MAP}>Map</Link></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    <li><Link to={routes.LANDING}>Home</Link></li>
    <li><Link to={routes.LEADERS}>Leaders</Link></li>
    <li><Link to={routes.RULES_PAGE}>Rules</Link></li>
  </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);