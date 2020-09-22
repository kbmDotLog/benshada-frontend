/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import PackageList from '../User/Packages/PackageList.js';

export default class ProductDeliveryMethod extends Component {
  static propTypes = {
    deliveryPackages: PropTypes.array,
    onPackageSelect: PropTypes.func,
    products: PropTypes.array,
    checkoutOrder: PropTypes.array,
    stores: PropTypes.array,
    details: PropTypes.object
  };

  returnShopState = (shopID) => this.props.stores.filter(({ _id }) => _id === shopID).state;

  deliveries = (product) => this.props.deliveryPackages.filter(({
    method, pickupStation, to, from
  }) => (method === 'pickup'
    ? pickupStation && pickupStation.state === this.props.details.state
    : to === this.props.details.state && from === this.returnShopState(product.shop._id)));

  renderHelp = () => this.props.products.map((product, key) => (
      <div key={`product-checkout-${key}`}>
        <h5>{product.name}</h5>
        <PackageList
          checkoutOrder={this.props.checkoutOrder}
          product={product}
          packages={this.deliveries(product)}
          onPackageSelect={(dP) => this.props.onPackageSelect(dP, product._id)}
          count={4}
          title="Your Delivery Packages"
        />
      </div>
  ));

  render = () => (
    <div className="py-4 px-5">
      <p>
        How do you want your order delivered?
        <br />
        Select one for each product
      </p>
      {this.renderHelp()}
    </div>
  );
}
