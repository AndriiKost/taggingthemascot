import React, { Component } from 'react';

import { auth, db } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  url: '',
  error: null,
};

class AccountImageForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { url } = this.state;

    db.updateImageURL(url)
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
      url,
      error,
    } = this.state;

    const isInvalid =
      url === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={url}
          onChange={event => this.setState(byPropKey('url', event.target.value))}
          type="url"
          placeholder="Image URL"
        />
        <button disabled={isInvalid} type="submit">
          Add Image
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default AccountImageForm;