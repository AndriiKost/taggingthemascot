import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth, db } from '../firebase';

const SignUpPage = ({ history }) =>
  <div className='gradientSection'>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE , teamNames: [], teamNameExisting: false};
  }

  componentDidMount() {
    db.onceGetUsers().then( snapshot => {
      this.state.teamNames = Object.keys(snapshot.val()).map(key => snapshot.val()[key].username.toLowerCase())
      console.log(this.state.teamNames)
    }
   )
  }

  teamNameHandler = (event) => {
    this.setState(byPropKey('username', event.target.value))
    // Check if username exist
    if (this.state.teamNames.includes(event.target.value.toLowerCase()) === true) {
      this.setState({teamNameExisting: true}); 
    } else {
      this.setState({teamNameExisting: false})
    }
    console.log(this.state.teamNameExisting)
  }

  onSubmit = (event) => {
      const {
        username,
        email,
        passwordOne,
      } = this.state;

      const {
        history,
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            console.log(authUser)
            // Create a user in your own accessible Firebase Database too
            db.doCreateUser(authUser.user.uid, username, email)
        .then(() => {
            // use unmutable state
            this.setState(() => ({ ...INITIAL_STATE }));
            // redirect after signing up
            history.push(routes.MAP);
        })
        .catch(error => {
            this.setState(byPropKey('error', error));
        });
        })
        .catch(error => {
            this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
  }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' || this.state.teamNameExisting;

    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={this.teamNameHandler}
          type="text"
          placeholder="Team Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password (minimum of 6 characters)"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        { error && <p>{error.message}</p> }
      </form>
      {this.state.teamNameExisting ? <h3 className='messageBox'>Team Name Already exists, please try another one.</h3> : null}
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };