/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Asset imports
import '../../../../../assets/css/notification.css';
import monthShortForms from '../../../../../assets/data/monthShortForms.json';
import '../../../../../assets/css/transaction.css';
import Image from '../../../../Image/Image.js';

// Start Component
class TransactionDisplay extends Component {
  static propTypes = { transaction: PropTypes.object };

  renderMonth = (monthNumber) => monthShortForms[monthNumber];

  render = () => {
    const { transaction } = this.props;
    const amount = transaction && transaction.amount;
    const type = transaction && transaction.type;
    const description = transaction && transaction.description;
    const trxnRef = transaction && transaction.trxnRef;
    const createdAt = transaction && transaction.createdAt;
    const createdAtDateObject = new Date(createdAt);

    return (
      <div className="transaction w-100 p-3 border-left border-primary-benshada mb-3 bg-white shadow-sm">
        <div className="d-flex d-lg-none align-items-center">
          <div className="date p-2 mr-2 text-center bg-light-benshada shadow-sm">
            <h5 className="mb-0">{createdAtDateObject.getDay()}</h5>
            <small className="text-uppercase">
              {this.renderMonth(createdAtDateObject.getMonth())}
            </small>
          </div>
          <div className="info flex-grow-1">
            <p className="name font-weight-bold">{description}</p>
            <small>Amen</small>
          </div>
          <div className="amount text-right">
            <h4 className="text-primary-benshada mb-0">&#x20A6;{amount}</h4>
          </div>
        </div>
        <div className="d-lg-flex d-none align-items-center">
          <div className="icon p-2 mr-2 text-center">
            <Image className="text-primary-benshada" type={type} />
          </div>
          <div className="info flex-grow-1">
            <p className="name font-weight-bold">{description}</p>
            <small className="text-capitalize">{`${createdAtDateObject.getDay()} ${this.renderMonth(createdAtDateObject.getMonth())}`}</small>
          </div>
          <div className="info flex-grow-1">
            <p>REF: {trxnRef}</p>
          </div>
          <div className="amount text-right">
            <h4 className="text-primary-benshada mb-0">&#x20A6;{amount}</h4>
          </div>
        </div>
      </div>
    );
  };
}
// End Component

export default TransactionDisplay;
