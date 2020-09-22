/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PackageList from './PackageList.js';

class Packages extends Component {
  static propTypes = {
    deliveryPackages: PropTypes.array,
    deliveryCompany: PropTypes.object,
    user: PropTypes.object
  };

  render = () => {
    const { deliveryPackages, user } = this.props;

    const items = deliveryPackages.filter(
      ({ deliveryCompany }) => deliveryCompany && deliveryCompany.contactPerson === user._id
    ) || [];

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 py-3">
            <PackageList packages={items} title="Your Delivery Packages" />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ deliveryPackage }) => ({ deliveryPackages: deliveryPackage.all });

export default connect(mapStateToProps)(Packages);
