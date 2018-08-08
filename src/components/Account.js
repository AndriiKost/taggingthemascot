import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Events from './Events';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import SignOutButton from './SignOut';

const AccountPage = ( ) => 
  <div className='gradientSection'>
    <SignOutButton />
      <h2>It's more <span className='funClass'>fun</span> to participate with your friend</h2>
      <Events />
    <div className="accountSettings">
      <div className='accountSection'>
        <h4>Reset Password</h4>
        <PasswordForgetForm />
      </div>
      <div className='accountSection'>
        <h4>Change Password</h4>
        <PasswordChangeForm />
      </div>
    </div>
  </div>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(AccountPage);