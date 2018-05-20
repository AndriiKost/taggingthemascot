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
      <div>
          {/* <h4 className='accountInfo'>  Account: {authUser.email} </h4> */}
        <div className='eventAddSection'>
        <SignOutButton />
          <h2> Add your event </h2>
          <Events />
        </div>
        <div className="accountSettings">
          <div className='accountSection'>
            <h4>Reset Password</h4>
            <PasswordForgetForm />
          </div>
          <div className='accountSection'>
            <h4>Change Password</h4>
            <PasswordChangeForm />
          </div>
          <div className='accountSection'>
            <h4>Change Account Image</h4>
            <AccountImage />
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