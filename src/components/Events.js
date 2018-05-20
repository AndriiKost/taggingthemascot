import React, { Component } from 'react';

import { auth, db } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  banner: '',
  event_name: '',
  price: '',
  error: null,
};

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { banner, event_name, price } = this.state;

    db.addEvent(banner, event_name, price)
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
      price,
      error,
    } = this.state;

    const isInvalid = banner === '' ||  event_name === '' || price === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={banner}
          onChange={event => this.setState(byPropKey('banner', event.target.value))}
          type="url"
          placeholder="Image URL"
        />
        <input
          value={event_name}
          onChange={event => this.setState(byPropKey('event_name', event.target.value))}
          type="text"
          placeholder="Event Name"
        />
        <input
          value={price}
          onChange={event => this.setState(byPropKey('price', event.target.value))}
          type="text"
          placeholder="Event Price"
        />
        <button disabled={isInvalid} type="submit">
          Add Event
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default Events;