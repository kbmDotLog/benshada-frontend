/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component imports
import TransactionList from './TransactionList/TransactionList.js';

// Start Component
class Transactions extends Component {
  static propTypes = { transactions: PropTypes.array };

  render = () => <TransactionList transactions={this.props.transactions} />;
}
// End Component

const mapStateToProps = ({ transaction, user }) => ({
  transactions: transaction.all.filter((t) => t.user && t.user._id === user.selected._id)
});

// Export Component
export default connect(mapStateToProps)(Transactions);
