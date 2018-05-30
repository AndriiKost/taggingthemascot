import React from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom';

import withAuthentication from './withAuthentication';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import LeadersPage from './LeadersPage';
import AccountPage from './Account';
import MapPage from './MapPage';
import BuckyHeader from '../containers/Header';
import RulesPage from './RulesPage';
import Checklist from './Checklist';

import * as routes from '../constants/routes';

const App = () =>
  <Router>
    <div>
    <BuckyHeader />
      <Navigation/>

      <Route exact path={routes.LANDING} component={() => <LandingPage />}  />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.LEADERS} component={() => <LeadersPage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.MAP} component={() => <MapPage />}  />
      <Route exact path={routes.RULES_PAGE} component={() => <RulesPage />} />
      <Route exact path={routes.CHECKLIST} component={() => <Checklist />} />
      
    </div>
  </Router>

export default withAuthentication(App);