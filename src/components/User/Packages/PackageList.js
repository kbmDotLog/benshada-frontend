/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import PackageDisplay from './PackageDisplay/PackageDisplay.js';
import NotFound from '../../NotFound/NotFound.js';

// Start Component
export default class PackageList extends Component {
  static propTypes = {
    checkoutOrder: PropTypes.array,
    count: PropTypes.number,
    onPackageSelect: PropTypes.func,
    packages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    product: PropTypes.object
  };

  ifSelected = (deliveryPackageID) => {
    const { checkoutOrder, product } = this.props;

    return checkoutOrder.filter(
      (item) => item.deliveryPackage === deliveryPackageID && product._id === item.product._id
    ).length > 0;
  };

  renderPackageList = (packages) => (packages.length > 0 ? (
      <>
        <div className="cards packages">
          {packages.slice(0, this.props.count).map((deliveryPackage, key) => (
            <PackageDisplay
              key={`packageList${key}`}
              deliveryPackage={deliveryPackage}
              onPackageSelect={this.props.onPackageSelect}
              selected={this.ifSelected(deliveryPackage._id)}
            />
          ))}
        </div>
      </>
  ) : (
      <NotFound type="package" />
  ));

  render() {
    const { packages } = this.props;

    return <>{this.renderPackageList(packages)}</>;
  }
}
// End Component
