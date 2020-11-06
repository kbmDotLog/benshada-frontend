/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  deliveryPackageUpdate
} from '../../../../redux/actions/deliveryPackages.js';
import Price from '../../../ProductList/ProductDisplay/Price.js';
import ButtonPackageOwner from './ButtonPackageOwner.js';

class PackageDisplay extends Component {
  static propTypes = {
    deliveryPackage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onPackageSelect: PropTypes.func,
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    deliveryPackageUpdate: PropTypes.func,
    selected: PropTypes.bool
  };

  renderDetails = (deliveryPackage) => {
    const method = deliveryPackage && deliveryPackage.method;
    const pickupStation = deliveryPackage && deliveryPackage.pickupStation;
    const to = deliveryPackage && deliveryPackage.to;
    const from = deliveryPackage && deliveryPackage.from;
    const duration = deliveryPackage && deliveryPackage.duration;

    if (method === 'pickup') {
      const { name, address, state } = pickupStation;
      return (
        <>
          @<br />
          <small className="d-block font-weight-bold" style={{ lineHeight: '16px' }}>
            {name}
          </small>
          <small className="d-block" style={{ lineHeight: '16px' }}>
            {address}, <br />
            {state}
          </small>
        </>
      );
    }
    return (
      <>
        <small className="d-block font-weight-bold" style={{ lineHeight: '16px' }}>
          {from} <FontAwesomeIcon icon={faArrowRight} /> {to}
        </small>
        <small className="d-block" style={{ lineHeight: '16px' }}>
          {duration} days
        </small>
      </>
    );
  };

  renderActionButtons = (deliveryPackage) => {
    const deliveryCompany = deliveryPackage && deliveryPackage.deliveryCompany;

    return deliveryCompany && deliveryCompany.contactPerson === this.props.user._id ? (
      <ButtonPackageOwner deliveryPackage={deliveryPackage} user={this.props.user} />
    ) : (
      ''
    );
  };

  render() {
    const { deliveryPackage, user, selected } = this.props;
    const cost = deliveryPackage && deliveryPackage.cost;
    const deliveryCompany = deliveryPackage && deliveryPackage.deliveryCompany;
    const method = deliveryPackage && deliveryPackage.method;

    return (
      <>
        <div
          className={`card mb-4 product rounded shadow-sm border-0 ${
            deliveryCompany && deliveryCompany.contactPerson === user._id ? '' : 'pointer'
          }  bg-${selected ? 'primary-benshada' : 'secondary'} text-white`}
          onClick={() => (deliveryCompany && deliveryCompany.contactPerson === user._id
            ? ''
            : this.props.onPackageSelect(deliveryPackage))
          }
        >
          <div className="card-body p-0">
            <div
              className={`d-flex align-items-center bg-white text-${
                method === 'pickup' ? 'dark' : 'secondary'
              } p-3`}
            >
              <h2 className="flex-grow-1 mb-0">
                <Price price={cost} />
              </h2>
              {this.renderActionButtons(deliveryPackage)}
             </div>

            <div className="p-3">
              <div>
                <small className="d-block text-uppercase" style={{ lineHeight: '16px' }}>
                  {method}
                </small>
                {this.renderDetails(deliveryPackage)}
              </div>

              {deliveryCompany && deliveryCompany.contactPerson === user._id ? (
                ''
              ) : (
                <div className="flex-grow-1 d-flex mt-3 flex-end">
                  <small>Provided by</small>
                  <div
                    style={{ width: '60px', height: '60px', overflow: 'hidden' }}
                    className="rounded-circle mr-1"
                  >
                    <img
                      src={deliveryCompany && deliveryCompany.image}
                      alt=""
                      className="img-fluid"
                      style={{ minHeight: '60px', minWidth: '60px' }}
                    />
                  </div>
                  <div className="flex-grow-1 d-flex flex-column justify-content-center">
                    <small
                      className="d-block font-weight-bold text-uppercase"
                      style={{ lineHeight: '16px' }}
                    >
                      {deliveryCompany && deliveryCompany.name}
                    </small>
                    <small className="d-block" style={{ lineHeight: '16px' }}>
                      {deliveryCompany && deliveryCompany.phone}
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.selected
});

export default connect(mapStateToProps, { deliveryPackageUpdate })(
  PackageDisplay
);
