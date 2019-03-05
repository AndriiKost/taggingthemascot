import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import withAuthentication from '../containers/withAuthentication';

import Navigation from './Navigation/Navigation';
import LandingPage from './Landing/Landing';
import SignUpPage from './SignUp/SignUp';
import SignInPage from './SignIn/SignIn';
import PasswordForgetPage from './Account/PasswordForget';
import LeadersPage from './Leaderboard/LeadersPage';
import AccountPage from './Account/Account';
import MapPage from './Map/MapPage';
import BuckyHeader from './Header/Header';
import RulesPage from './Rules/RulesPage';
import Checklist from './Checklist/Checklist';

import * as routes from '../constants/routes';

const App = () =>
  <Router>
    <div>
    <BuckyHeader />
      <Navigation/>
      <Switch>
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        <Route exact path={routes.LEADERS} component={() => <LeadersPage />} />
        <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
        <Route exact path={routes.MAP} component={() => <MapPage />}  />
        <Route exact path={routes.RULES_PAGE} component={() => <RulesPage />} />
        <Route exact path={routes.CHECKLIST} component={() => <Checklist />} />
        <Route path={routes.LANDING} component={() => <LandingPage />}  />
      </Switch>
    </div>
  </Router>

export default withAuthentication(App);