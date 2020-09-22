/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Component imports
import TransactionDisplay from './TransactionDisplay/TransactionDisplay.js';
import NotFound from '../../../NotFound/NotFound.js';

// Start && Export Component
export default class TransactionList extends Component {
  static propTypes = {
    transactions: PropTypes.array
  };

  renderTransactionList = (transactions) => (transactions.length > 0 ? (
      <div className="cards transactions" id="transactionTable">
        {_.orderBy(transactions, ['createdAt', ['asc']]).map((transaction, key) => (
          <TransactionDisplay key={`transactionList${key}`} transaction={transaction} />
        ))}
      </div>
  ) : (
      <NotFound type="transaction" />
  ));

  render = () => <>{this.renderTransactionList(this.props.transactions)}</>;
}
// End Component
