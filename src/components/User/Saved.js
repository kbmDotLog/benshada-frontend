import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../ProductList/ProductList.js';

export default class Saved extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render = () => {
    const { user } = this.props;
    return (
      <div><ProductList products={user && user.saved} action="saved" />
      </div>
    );
  }
}
