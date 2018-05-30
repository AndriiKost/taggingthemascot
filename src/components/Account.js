import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { db } from '../firebase';

import AccountImage from './AccountImage';
import Events from './Events';
import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import SignOutButton from './SignOut';

const AccountPage = ({ authUser }) => 
  <div className='gradientSection'>
    <SignOutButton />
      <h2>It's more <span className='funClass'>fun</span> to participate with your friend | {db.auth} </h2>
      <Events />
    {/* </div> */}
    <div className="accountSettings">
      <div className='accountSection'>
        <h4>Reset Password</h4>
        <PasswordForgetForm />
      </div>
      <div className='accountSection'>
        <h4>Change Password</h4>
        <PasswordChangeForm />
      </div>
      {/* <div className='accountSection'>
        <h4>Change Account Image</h4>
        <AccountImage />
      </div> */}
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