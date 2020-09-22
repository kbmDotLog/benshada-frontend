/* eslint-disable no-underscore-dangle */
// Module Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import CheckoutProductDisplay from './CheckoutProductDisplay.js';

export default class CheckoutProductList extends Component {
  static propTypes = {
    orders: PropTypes.array
  };

  render = () => this.props.orders.map((order, key) => (
      <CheckoutProductDisplay order={order} key={`checkout-product-list-${key}`} />
  ));
}
