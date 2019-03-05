import React, { Component } from 'react';

import { db } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  banner: '',
  event_name: '',
  error: null,
};

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { banner, event_name } = this.state;

    db.addEvent(banner, event_name)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      banner, 
      event_name, 
      error,
    } = this.state;

    const isInvalid = banner === '' ||  event_name === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={event_name}
          onChange={event => this.setState(byPropKey('event_name', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={banner}
          onChange={event => this.setState(byPropKey('banner', event.target.value))}
          type="email"
          placeholder="Email"
        />
        <button disabled={isInvalid} type="submit">
          Add Teammate
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default Events;